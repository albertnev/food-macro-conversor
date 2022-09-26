import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import interleave from 'interleave';

import openfoodfacts from '../../../controllers/openfoodfacts';
import bedca from '../../../controllers/bedca';
import { ErrorResponse } from '../../../types/ErrorResponse';
import { databaseErrorCodes } from '../../../constants/databaseErrorCodes';
import database from '../../../controllers/database';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const searchText = req.query.text as string;
  const session = await getToken({ req });

  const searchResponses = await Promise.allSettled([
    bedca.searchFood(searchText),
    openfoodfacts.searchFood(searchText),
    database.searchFood(searchText, session?.email!),
  ]);

  const [bedcaResponse, openFoodResponse, databaseResponse] = searchResponses;
  let responseStatus = 200;

  // Set status depending on the responses
  if (searchResponses.every((resp) => resp.status === 'fulfilled')) {
    responseStatus = 200;
  } else if (searchResponses.every((resp) => resp.status === 'rejected')) {
    const error = { key: 'unavailableDatabases' } as ErrorResponse;
    res.status(510).json(error);
    return;
  } else if (bedcaResponse.status !== 'fulfilled') {
    responseStatus = databaseErrorCodes.bedca;
  } else if (openFoodResponse.status !== 'fulfilled') {
    responseStatus = databaseErrorCodes.openfoodfacts;
  } else if (databaseResponse.status !== 'fulfilled') {
    responseStatus = databaseErrorCodes.database;
  }

  const mixedResponses = interleave(
    (bedcaResponse.status === 'fulfilled' && bedcaResponse.value) || [],
    (openFoodResponse.status === 'fulfilled' && openFoodResponse.value) || [],
    (databaseResponse.status === 'fulfilled' && databaseResponse.value) || [],
  );

  res.status(responseStatus).json(mixedResponses);
};
