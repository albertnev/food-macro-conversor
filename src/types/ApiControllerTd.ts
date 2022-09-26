import { NextApiRequest, NextApiResponse } from 'next';

import { FoodSearchResultTd } from './FoodSearchResultTd';

export interface ApiControllerTd {
  api: {
    getFoodDetails: (
      request: NextApiRequest,
      response: NextApiResponse<any>,
    ) => void;
    searchFood: (
      request: NextApiRequest,
      response: NextApiResponse<any>,
    ) => void;
  };
  searchFood: (
    searchText: string,
    userId?: string,
  ) => Promise<FoodSearchResultTd[]>;
}
