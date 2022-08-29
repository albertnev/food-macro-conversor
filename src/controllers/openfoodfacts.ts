import { NextApiRequest, NextApiResponse } from 'next';

import {
  normalizeFoodDetailsResponse,
  normalizeSearchResponse,
} from '../normalizers/openfoodfacts';
import { ApiControllerTd } from '../types/ApiControllerTd';

/* RETURN INNER METHODS */

const searchFood = async (searchText: string) => {
  const resp = await fetch(
    `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURI(
      searchText,
    )}&json=true`,
  );

  const parsedData = await resp.json();
  return normalizeSearchResponse(parsedData);
};

/* API METHODS */

const apiGetFoodDetails = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  const resp = await fetch(
    `https://world.openfoodfacts.org/api/v2/search?code=${encodeURI(
      req.query.id as string,
    )}&json=true`,
  );

  const parsedData = await resp.json();
  res.status(200).json(normalizeFoodDetailsResponse(parsedData));
};

const apiSearchFood = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  const normalizedData = await searchFood(req.query.text as string);
  res.status(200).json(normalizedData);
};

export default {
  api: {
    getFoodDetails: apiGetFoodDetails,
    searchFood: apiSearchFood,
  },
  searchFood,
} as ApiControllerTd;
