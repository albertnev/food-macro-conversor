import { NextApiRequest, NextApiResponse } from 'next';

import database from '../../../controllers/database';

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  database.api.listCustomFoods(req, res);
};
