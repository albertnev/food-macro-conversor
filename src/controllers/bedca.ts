import parser from 'xml2json';
import { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import path from 'path';

import {
  normalizeFoodDetailsResponse,
  normalizeSearchResponse,
} from '../normalizers/bedca';
import { ApiControllerTd } from '../types/ApiControllerTd';

/* INNER METHODS */

const searchFood = async (searchText: string) => {
  const xmlContents = readFileSync(
    path.resolve('./src/templates/bedca/requestSearch.xml'),
    { encoding: 'utf8' },
  );
  const xmlQuery = xmlContents
    .replace('{{searchTerm}}', searchText)
    .replace(/(\r\n|\n|\r)/gm, '');

  const response = await fetch('https://www.bedca.net/bdpub/procquery.php', {
    body: xmlQuery,
    headers: {
      Accept: 'application/xml',
      'Content-Type': 'text/xml; charset=UTF-8',
    },
    method: 'POST',
  });

  const responseText = await response.text();
  const parsedData = parser.toJson(responseText, { object: true });
  return normalizeSearchResponse(parsedData);
};

/* API METHODS */

const apiGetFoodDetails = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  const xmlContents = readFileSync(
    path.resolve('./src/templates/bedca/requestFoodDetails.xml'),
    { encoding: 'utf8' },
  );
  const xmlQuery = xmlContents
    .replace('{{foodId}}', req.query.id as string)
    .replace(/(\r\n|\n|\r)/gm, '');

  try {
    const response = await fetch('https://www.bedca.net/bdpub/procquery.php', {
      body: xmlQuery,
      headers: {
        Accept: 'application/xml',
        'Content-Type': 'text/xml; charset=UTF-8',
      },
      method: 'POST',
    });

    const responseText = await response.text();
    const parsedData = parser.toJson(responseText, { object: true });
    res.status(200).json(normalizeFoodDetailsResponse(parsedData));
  } catch (err) {
    res.status(425).send(err);
  }
};

const apiSearchFood = async (
  req: NextApiRequest,
  res: NextApiResponse<any>,
) => {
  try {
    const searchResults = await searchFood(req.query.text as string);
    res.status(200).json(searchResults);
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
