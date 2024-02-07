import { createTestPassengerData } from '../data/test-data';
import logger from '../util/logger';
import { trimPassenger } from '../util/trim';
import Airtable from 'airtable';
import type { FieldSet, Record } from 'airtable';
import type { PassengerData } from '../interfaces/passenger/passenger.interface';
import type { Request, Response } from 'express';

/**
 * This function returns all passengers connected to a user
 *
 * Steps to complete:
 * 1. Get the userId from the query parameters, if it doesn't exist return a 400
 * 2. Make a call to AirTable to get all passengers for the user, if that fails return a 500 (hint, use try/catch)
 *   If there are no passengers for the user return a 400. (hint: use the AirTable API, see TestControllers/retrievePassengers.ts for an example)
 *  Another hint - we will be filtering by the "Passenger ID" field in the AirTable
 * 3. Remove any unnecessary data from the passengers (there is a lot of data in the AirTable response we don't need)
 * 4. Return the passengers for the user
 *
 * @param req - the request object
 * @param res - the response object
 */
export const getAllPassengersForUser = async (req: Request, res: Response) => {
  // get the userId from the query parameters
  // const { userId } = req.query;

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Passenger ID missing' });
  }

  logger.info(id);

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base('appwPsfAb6U8CV3mf');

  try {
    await base('Passengers').find(
      id.toString(),
      async function (err: any, record: any | undefined) {
        if (err) {
          logger.error(err);
          return;
        } else {
          const accompPassengers = [] as Record<FieldSet>[];
          const accompanyingPassengersPromise = record._rawJson.fields[
            'Related Accompanying Passenger(s)'
          ].map(async (id: string) => {
            const passenger = await base('Passengers').find(id.toString());
            accompPassengers.push(passenger);
          });
          await Promise.all(accompanyingPassengersPromise);
          const trimmedPassengers = accompPassengers.map(
            (passenger: Record<FieldSet>) =>
              trimPassenger(passenger._rawJson as unknown as PassengerData)
          );
          res.send(trimmedPassengers);
        }
      }
    );
  } catch (err: any) {
    // if that fails return a 500 (hint, use try/catch)
    console.error(err);
    return res.status(500).json({ error: 'Error fetching record' });
  }
};

/**
 * This function returns a passenger for a given passengerId
 *
 * Steps to complete:
 * 1. Get the passengerId from the query parameters, if it doesn't exist return a 400
 * 2. Make a call to AirTable to get the passenger, if that fails return a 500 (hint, use try/catch)
 *   If there is no passenger for the passengerId return a 400. (hint: use the AirTable API, see TestControllers/retrievePassengers.ts for an example)
 * 3. Remove any unnecessary data from the passenger (there is a lot of data in the AirTable response we don't need)
 * 4. Return the passenger
 *
 * @param req - the request object
 * @param res - the response object
 */
export const getPassengerById = async (req: Request, res: Response) => {
  // get the passengerId from the query parameters
  // const { passengerId } = req.query;

  // create a fake passenger
  const passenger = createTestPassengerData();

  // return the passenger
  res.status(200).send(passenger);
};

/**
 * This function creates a passenger for a given user
 *
 * Steps to complete:
 * 1. Get the userId from the query parameters, if it doesn't exist return a 400
 * 2. Get the passenger data from the request body, if it doesn't exist return a 400
 * 3. Make a call to AirTable to create the passenger, if that fails return a 500 (hint, use try/catch)
 * 4. Return the created passenger
 *
 * @param req - the request object
 * @param res - the response object
 */
export const createPassenger = async (req: Request, res: Response) => {
  // get the userId from the query parameters
  // const { userId } = req.query;

  // get the passenger data from the request body
  // const data = req.body;

  // validate the passenger data using Joi
  // ...

  // create a fake passenger
  const passenger = createTestPassengerData();

  // return the created passenger
  res.status(200).send(passenger);
};

/**
 * This function updates a passenger for a given user
 *
 * Steps to complete:
 * 1. Get the passengerId from the query parameters, if it doesn't exist return a 400
 * 2. Get the passenger data from the request body, if it doesn't exist return a 400
 * 3. Make a call to AirTable to update the passenger, if that fails return a 500 (hint, use try/catch)
 * 4. Return the updated passenger
 *
 * @param req - the request object
 * @param res - the response object
 */
export const updatePassenger = async (req: Request, res: Response) => {
  // get the passengerId from the query parameters
  // const { passengerId } = req.query;

  // get the passenger data from the request body
  // const data = req.body;

  // validate the passenger data using Joi
  // ...

  // create a fake passenger
  const passenger = createTestPassengerData();

  // return the updated passenger
  res.status(200).send(passenger);
};
