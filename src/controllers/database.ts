/* eslint-disable no-underscore-dangle */
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { connectToDatabase } from '../lib/mongodb';
import {
  normalizeFoodDetailsResponse,
  normalizeFoodForDatabase,
  normalizeSearchResponse,
} from '../normalizers/database';
import { ApiControllerTd } from '../types/ApiControllerTd';
import { ErrorResponse } from '../types/ErrorResponse';

const MAX_FOODS_PER_USER = process.env.MAX_FOODS_PER_USER || 10;

/* RETURN INNER METHODS */

const searchFood = async (searchText: string, userId: string) => {
  if (!userId) return [];

  const { db } = await connectToDatabase();
  const foods = await db
    .collection('foods')
    .find({
      name: new RegExp(searchText, 'i'),
      user: userId,
    })
    .toArray();

  return normalizeSearchResponse(foods);
};

/* API METHODS */

const apiUpdateFood = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  const sessionInfo = await getToken({ req });
  if (sessionInfo?.email) {
    const { db } = await connectToDatabase();
    const userFoods = await db.collection('foods').find().toArray();
    const food = JSON.parse(req.body);

    // If user has reached max_foods, only let update if the food already exists
    if (
      userFoods.length < MAX_FOODS_PER_USER ||
      userFoods.find((f) => f._id === food.id)
    ) {
      const foodId = food.id || new ObjectId();
      const result = await db
        .collection('foods')
        .replaceOne(
          { _id: foodId },
          { ...normalizeFoodForDatabase(food), user: sessionInfo.email },
          { upsert: true },
        );

      // DB operation succeeded
      if (result.acknowledged) {
        return res.status(200).json({ ...food, id: foodId });
      }

      // DB operation error
      return res.status(500).send('Operation failed');
    }

    // Food limit reached
    const error = { key: 'foodLimitReached' } as ErrorResponse;
    return res.status(420).json(error);
  }

  return res.status(401).send('Not authorized. Session invalid or expired.');
};

const apiGetFoodDetails = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  const sessionInfo = await getToken({ req });
  if (sessionInfo?.email && req.query.id) {
    const { db } = await connectToDatabase();
    const food = await db
      .collection('foods')
      .findOne({
        _id: new ObjectId(req.query.id as string),
        user: sessionInfo.email,
      });

    if (food) {
      return res.status(200).json(normalizeFoodDetailsResponse(food));
    }

    return res.status(404).send(
      `Food not found in database for filter ${JSON.stringify({
        _id: req.query.id,
        user: sessionInfo.email,
      })}`,
    );
  }

  return res.status(401).send('Not authorized. Session invalid or expired.');
};

const apiSearchFood = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  try {
    const sessionInfo = await getToken({ req });
    if (sessionInfo?.email) {
      const searchResults = await searchFood(
        req.query.text as string,
        sessionInfo.email,
      );
      res.status(200).json(searchResults);
    } else {
      res.status(401).send('Not authorized. Session invalid or expired.');
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export default {
  api: {
    getFoodDetails: apiGetFoodDetails,
    searchFood: apiSearchFood,
    updateFood: apiUpdateFood,
  },
  searchFood,
} as {
  api: {
    updateFood: (
      request: NextApiRequest,
      response: NextApiResponse<any>,
    ) => void;
  };
} & ApiControllerTd;
