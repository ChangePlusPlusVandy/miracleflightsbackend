import logger from '../../util/logger';
import Airtable from 'airtable';
import dotenv from 'dotenv';
import type { FieldSet, Record } from 'airtable';
import type { Request, Response } from 'express';
dotenv.config();

// Example endpoint that uses the AirTable API to retrieve all the passengers in the example db
// THIS IS A TEST ENDPOINT AND IT IS STILL A WORK IN PROGRESS
export const retrievePassengers = async (req: Request, res: Response) => {
  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base('appwPsfAb6U8CV3mf');

  base('Flight Requests (Trips)')
    .select({
      // Selecting the first 3 records in All Requests [MASTER]:
      maxRecords: 100,
      view: 'All Requests [MASTER]',
    })
    .firstPage(async function (err, records) {
      if (err) {
        logger.error(err);
        return;
      }
      if (records) {
        const flightLegs = records.map(record =>
          record.fields['Flight Legs'] !== undefined
            ? record.fields['Flight Legs']
            : []
        ) as string[][];

        try {
          const trips = [] as Record<FieldSet>[][];
          const promises = flightLegs.map(async trip => {
            const flightLegsForTrip = [] as Record<FieldSet>[];
            const tripPromises = trip.map(async flightLegId => {
              const flightLegRecord = await base('Flight Legs').find(
                flightLegId?.toString() || ''
              ); // Replace with your actual table name
              flightLegsForTrip.push(flightLegRecord);
            });
            await Promise.all(tripPromises);
            trips.push(flightLegsForTrip);
          });

          await Promise.all(promises);

          // Send the response or do further processing
          res.status(200).send(trips);
        } catch (err) {
          console.error(err);
        }
      }
    });
};
