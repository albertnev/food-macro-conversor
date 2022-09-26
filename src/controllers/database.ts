import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import { connectToDatabase } from '../lib/mongodb';
import { normalizeSearchResponse } from '../normalizers/database';
import { ApiControllerTd } from '../types/ApiControllerTd';

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

const apiGetFoodDetails = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  res.status(500).send('Not implemented');
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
  },
  searchFood,
} as ApiControllerTd;
