import { exec } from 'child_process';
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

  const args = [
    '-X POST',
    'https://www.bedca.net/bdpub/procquery.php',
    `-d "${xmlQuery.replaceAll('"', '\\"')}"`,
    '-H "Content-Type: text/xml; charset=UTF-8"',
    '-H "Origin: https://www.bedca.net"',
    '-H "Accept: application/xml"',
  ];

  return new Promise((resolve, reject) => {
    exec(`curl ${args.join(' ')}`, (error: any, stdout: any, stderr: any) => {
      // eslint-disable-next-line no-console
      if (stderr || error) console.log('BEDCA error:', stdout, stderr, error);

      if (stdout) {
        try {
          const obj = parser.toJson(stdout, { object: true });
          const normalizedResponse = normalizeSearchResponse(obj);
          resolve(normalizedResponse);
        } catch (err) {
          reject(err);
        }
      } else {
        reject(stderr);
      }
    });
  });
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

  const args = [
    '-X POST',
    'https://www.bedca.net/bdpub/procquery.php',
    `-d "${xmlQuery.replaceAll('"', '\\"')}"`,
    '-H "Content-Type: text/xml; charset=UTF-8"',
    '-H "Origin: https://www.bedca.net"',
    '-H "Accept: application/xml"',
  ];

  exec(`curl ${args.join(' ')}`, (error: any, stdout: any, stderr: any) => {
    if (stdout) {
      try {
        const obj = parser.toJson(stdout, { object: true });
        res.status(200).json(normalizeFoodDetailsResponse(obj));
      } catch (err) {
        res.status(400).send(stdout);
      }
    } else {
      res.status(502).send(stderr);
    }
  });
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
