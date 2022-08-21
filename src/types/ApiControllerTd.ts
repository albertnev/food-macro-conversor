import { NextApiRequest, NextApiResponse } from 'next';

export interface ApiControllerTd {
  getFoodDetails: (
    request: NextApiRequest,
    response: NextApiResponse<any>,
  ) => void;
  searchFood: (request: NextApiRequest, response: NextApiResponse<any>) => void;
}
