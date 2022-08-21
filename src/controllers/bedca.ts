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

const getFoodDetails = async (
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

const searchFood = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const xmlContents = readFileSync(
    path.resolve('./src/templates/bedca/requestSearch.xml'),
    { encoding: 'utf8' },
  );
  const xmlQuery = xmlContents
    .replace('{{searchTerm}}', req.query.text as string)
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
        res.status(200).json(normalizeSearchResponse(obj));
      } catch (err) {
        res.status(400).send(stdout);
      }
    } else {
      res.status(502).send(stderr);
    }
  });
};

export default { getFoodDetails, searchFood } as ApiControllerTd;
