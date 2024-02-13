/* eslint-disable */
import logger from '../util/logger';
import { createTestPassengerData } from '../data/test-data';
import { trimPassenger } from '../util/trim';
import type { PassengerData } from '../interfaces/passenger/passenger.interface';
import type { Request, Response } from 'express';
import Airtable from 'airtable';
import dotenv from 'dotenv';
import type { FieldSet, Record } from 'airtable';
dotenv.config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY || '',
}).base('appwPsfAb6U8CV3mf');

/**
 * Get all of the related passengers for a user (people they have flown with in the past)
 *
 * @param req - the request object
 * @param res - the response object
 */
export const getAllPassengersForUser = async (req: Request, res: Response) => {
  // get the userId from the query parameters
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Passenger ID missing' });
  }

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base('appwPsfAb6U8CV3mf');

  try {
    // make a call to AirTable to get all passengers for the user
    await base('Passengers').find(
      id.toString(),
      async (err: any, record: any | undefined) => {
        if (err) {
          logger.error(err);
          return;
        } else {
          // get related passengers information
          const accompPassengers = [] as Record<FieldSet>[];
          const accompanyingPassengersPromise = record._rawJson.fields[
            'Related Accompanying Passenger(s)'
          ].map(async (id: string) => {
            // map through the related passengers and get the passenger information for each one
            const passenger = await base('Passengers').find(id.toString());
            accompPassengers.push(passenger);
          });

          // Remove any unnecessary data from the passengers
          await Promise.all(accompanyingPassengersPromise);
          const trimmedPassengers = accompPassengers.map(
            (passenger: Record<FieldSet>) =>
              trimPassenger(passenger._rawJson as unknown as PassengerData)
          );

          // return the passengers for the user
          return res.send(trimmedPassengers);
        }
      }
    );
  } catch (err: any) {
    // if that fails return a 500
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
  const { passengerId } = req.query;

  if (!passengerId) {
    return res.status(400).send({ error: 'Passenger ID is required' });
  }

  try {
    const record = await base('Passengers').find(passengerId.toString());

    if (!record) {
      return res.status(404).send({ error: 'Passenger not found' });
    }

    // Return the entire record
    res.status(200).send(record._rawJson);
  } catch (error) {
    logger.info(error);
    // if (error.message.includes('NOT_FOUND')) {
    //   return res.status(404).send({ error: 'Passenger not found' });
    // }
    res.status(500).send({ error: 'Server error' });
  }
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
  const userId = req.query.userId;
  const passengerData = req.body;

  if (!userId) {
    return res.status(400).send({ error: 'User ID is required' });
  }
  if (!passengerData) {
    return res.status(400).send({ error: 'Passenger data is required' });
  }
  const newRecord = {
    fields: {
      'First Name': passengerData.firstName,
      'Middle Name': passengerData.middleName || '',
      'Last Name': passengerData.lastName,
      Email: passengerData.email,
      Type: passengerData.type,
      '# of Booked Flight Requests': passengerData.numBookedFlightRequests,
      'Multi-patient family?': passengerData.multiPatientFamily,
      Relationship: passengerData.relationship,
      Birthday: passengerData.birthday,
      'Day Before Birthday': passengerData.dayBeforeBirthday,
      'Day After Birthday': passengerData.dayAfterBirthday,

      UserId: userId,
    },
    typecast: true,
  };

  try {
    // const createdRecords = await base('Passengers').create([newRecord]);
    // const createdPassenger = createdRecords[0];
    // res.status(200).send({ createdPassenger });
  } catch (error) {
    logger.info(error);
    res.status(500).send({ error: 'Failed to create passenger' });
  }
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
