import { NextApiRequest, NextApiResponse } from 'next';

import { foodDataSources } from '../../../constants/foodDataSources';
import openfoodfacts from '../../../controllers/openfoodfacts';
import bedca from '../../../controllers/bedca';
import database from '../../../controllers/database';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const source = req.headers.datasource || 'openfoodfacts';

  if (source === foodDataSources.bedca) {
    bedca.api.getFoodDetails(req, res);
  } else if (source === foodDataSources.openfoodfacts) {
    openfoodfacts.api.getFoodDetails(req, res);
  } else {
    database.api.getFoodDetails(req, res);
  }
};
