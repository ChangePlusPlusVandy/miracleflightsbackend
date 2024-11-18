import logger from '../util/logger';
import Airtable from 'airtable';
import type { Request, Response } from 'express';

/**
 * This function gets all stats from Airtable Data table 'Data Table'
 *
 * @param req - the request object
 * @param res - the response object
 */
export const getDashboardStats = async (req: Request, res: Response) => {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY || '' }).base(
    process.env.AIRTABLE_BASE_ID || ''
  );

  try {
    await base('Data Table')
      .select({
        view: 'Grid view',
      })
      .firstPage(function (err, records) {
        if (err) {
          return res.status(400).json({ error: 'No record found' });
        }
        let data = {};
        records?.forEach(function (record) {
          data = {
            ...data,
            [(record.get('Name') as string) || 'Unknown']: record.get(
              'Count'
            ) as number,
          };
        });

        res.status(200).send(data);
      });
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json({ error: 'Error fetching record' });
  }
};
