import { NextApiRequest, NextApiResponse } from 'next';
import openfoodfacts from '../../../controllers/openfoodfacts';
import bedca from '../../../controllers/bedca';
import { foodDataSources } from '../../../constants/foodDataSources';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const source = req.headers.datasource || 'openfoodfacts';

  if (source === foodDataSources.bedca) {
    bedca.searchFood(req, res);
  } else {
    openfoodfacts.searchFood(req, res);
  }
};
