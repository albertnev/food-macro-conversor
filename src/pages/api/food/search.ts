import { NextApiRequest, NextApiResponse } from 'next';

import openfoodfacts from '../../../controllers/openfoodfacts';
import bedca from '../../../controllers/bedca';
import { interleaveArrays } from '../../../utils/interleaveArrays';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const searchText = req.query.text as string;
  const [bedcaResponse, openFoodResponse] = await Promise.allSettled([
    bedca.searchFood(searchText),
    openfoodfacts.searchFood(searchText),
  ]);

  if (
    bedcaResponse.status === 'fulfilled' &&
    openFoodResponse.status === 'fulfilled'
  ) {
    const mixedResponses = interleaveArrays(
      bedcaResponse.value,
      openFoodResponse.value,
    );
    res.status(200).json(mixedResponses);
  } else if (bedcaResponse.status === 'fulfilled') {
    res.status(220).json(bedcaResponse.value);
  } else if (openFoodResponse.status === 'fulfilled') {
    res.status(221).json(openFoodResponse.value);
  }
};
