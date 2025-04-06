import Airtable from 'airtable';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';

dotenv.config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY || '',
}).base(process.env.AIRTABLE_BASE_ID || '');

/**
 * Fetches airport data from Airtable.
 *
 * @returns A list of all airports.
 */
export const getAirports = async (_req: Request, res: Response) => {
  try {
    const records = await base('All Airports').select().all();

    const airports = records.map(record => ({
      id: record.id,
      city: record.fields['City'],
      code: record.fields['Airport Code'],
    }));
    res.json(airports);
  } catch (error) {
    console.error('Error fetching airport data', error);
    throw new Error('Failed to fetch airport data');
  }
};
