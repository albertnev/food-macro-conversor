import { NextApiRequest, NextApiResponse } from 'next';

import {
  normalizeFoodDetailsResponse,
  normalizeSearchResponse,
} from '../normalizers/openfoodfacts';
import { ApiControllerTd } from '../types/ApiControllerTd';

const getFoodDetails = async (
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

const searchFood = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const resp = await fetch(
    `https://es.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURI(
      req.query.text as string,
    )}&json=true`,
  );

  const parsedData = await resp.json();
  res.status(200).json(normalizeSearchResponse(parsedData));
};

export default { getFoodDetails, searchFood } as ApiControllerTd;
