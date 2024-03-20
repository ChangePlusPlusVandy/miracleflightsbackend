/* eslint-disable */
import logger from '../util/logger';
import { createTestPassengerData } from '../data/test-data';
import { trimPassenger } from '../util/trim';
import type { PassengerData } from '../interfaces/passenger/passenger.interface';
import type { Request, Response } from 'express';
import Airtable from 'airtable';
import dotenv from 'dotenv';
import type { FieldSet, Record } from 'airtable';
import Joi from 'joi';
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
  // const { userId } = req.query;
};

/**
 * This function creates a passenger for a given user
 *
 * Steps to complete:
 * 1. Get the userId from the query parameters, if it doesn't exist return a 400
 * 2. Get the passenger data from the request body, if it doesn't exist return a 400
 * 3. Make a call to AirTable to create the passenger, if that fails return a 500 (hint, use try/catch)
 * 4. Return the created passenger
 * 5. add the passenger to the accompanying passengers of the user (req.params) sending the request
 *
 * @param req - the request object
 * @param res - the response object
 */

export const createPassenger = async (req: Request, res: Response) => {
  //gets userId and passengerData from parameters
  const { id } = req.params;
  const passengerData = req.body;

  if (!id) {
    return res.status(400).send('AirTable Record ID is required');
  }

  if (!passengerData) {
    return res.status(400).send('Passenger data is required.');
  }
  try {
    const passenger = await base('Passengers').find(id);
  } catch (err: any) {
    return res.status(400).send('User does not exist');
  }

  //joi stuff to validate whether the passengerData is of the right format

  const passengerSchema = Joi.object({
    fields: Joi.object({
      Relationship: Joi.string()
        .valid(
          'Mother',
          'Father',
          'Step-mother',
          'Step-father',
          'Legal Guardian',
          'Spouse',
          'Family Member',
          'Other Caregiver'
        )
        .required(),
      'First Name': Joi.string().required(),
      'Last Name': Joi.string().required(),
      'Date of Birth': Joi.date().required(),
      Diagnoses: Joi.array().items(Joi.string()),
      Gender: Joi.string().valid('Male', 'Female', 'Other').required(),
      Street: Joi.string().required(),
      City: Joi.string().required(),
      State: Joi.string().required(),
      Zip: Joi.string().required(),
      Country: Joi.string().required(),
      'Cell Phone': Joi.string()
        .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required(),
      Email: Joi.string().email().required(),
      Waiver: Joi.boolean().required(),
    }).required(),
  });

  const { error, value } = passengerSchema.validate(passengerData);

  if (error) {
    return res.status(400).json(error.details);
  }
  //if validation is successful try to create the passenger
  try {
    await base('Passengers').create(
      [
        {
          fields: {
            Type: 'Accompanying Passenger',
            Relationship: passengerData.fields.Relationship,
            'First Name': passengerData.fields['First Name'],
            'Last Name': passengerData.fields['Last Name'],
            'Date of Birth': passengerData.fields['Date of Birth'],
            Diagnoses: passengerData.fields.Diagnoses || [],
            Gender: passengerData.fields.Gender,
            Street: passengerData.fields.Street,
            City: passengerData.fields.City,
            State: passengerData.fields.State,
            Zip: passengerData.fields.Zip,
            Country: passengerData.fields.Country,
            'Cell Phone': passengerData.fields['Cell Phone'],
            Email: passengerData.fields.Email,
            Waiver: passengerData.fields.Waiver,
            'All Flight Requests (Pass 2)': [],
            'All Flight Legs': [],
            'Related Patient(s)': [],
          },
        },
      ],
      async (err, records) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Error creating passenger' });
        }

        //passenger was created successfully, we need to add them to the relatedPassenger of the user
        try {
          let relatedPassengers = [] as string[];

          //find the current related passengers of the user id
          base('Passengers').find(id, async (err, record) => {
            if (err) {
              console.error(err);
              return;
            }

            relatedPassengers = record?.fields[
              'Related Accompanying Passenger(s)'
            ] as string[];

            //add the passenger we just created to the user's previous related passengers
            const newRelatedPassengers = [
              ...(relatedPassengers || []),
              records?.[0].id,
            ];

            // Update the user record with the new list of related passengers
            await base('Passengers').update(id, {
              'Related Accompanying Passenger(s)': newRelatedPassengers,
            });

            return res.status(200).send(trimPassenger(records?.[0]._rawJson));
          });
        } catch (err2: any) {
          console.error(err2);
          return res.status(500).json({ error: 'Error updating user' });
        }
      }
    );
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating passenger' });
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
