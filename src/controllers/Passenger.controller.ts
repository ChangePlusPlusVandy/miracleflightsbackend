/* eslint-disable */
import logger from '../util/logger';
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
}).base(process.env.AIRTABLE_BASE_ID || '');

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
  }).base(process.env.AIRTABLE_BASE_ID || '');

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
          const accompPassengersPromise = [] as Promise<Record<FieldSet>>[];

          record._rawJson.fields['Related Accompanying Passenger(s)']?.map(
            async (id: string) => {
              // map through the related passengers and get the passenger information for each one
              const passenger = base('Passengers').find(id.toString());
              accompPassengersPromise.push(passenger);
            }
          );

          // Remove any unnecessary data from the passengers
          const passengers = await Promise.all(accompPassengersPromise);

          const trimmedPassengers =
            passengers?.map((passenger: Record<FieldSet>) =>
              trimPassenger(passenger._rawJson as unknown as PassengerData)
            ) || [];

          // return the passengers for the user
          return res.send(trimmedPassengers);
        }
      }
    );
  } catch (err: any) {
    // if that fails return a 500
    logger.error(err);
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
  const { id: userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'Passenger ID missing' });
  }

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base(process.env.AIRTABLE_BASE_ID || '');

  try {
    await base('Passengers').find(
      userId.toString(),
      async (err: any, record: any | undefined) => {
        if (err) {
          return res.status(400).send({ error: 'No passenger found' });
        } else {
          // remove any unnecessary data from the passenger
          const trimmedPassenger = trimPassenger(
            record._rawJson as unknown as PassengerData
          );

          // return the passenger
          return res.send(trimmedPassenger);
        }
      }
    );
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json({ error: 'Error fetching record' });
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
  const { id } = req.params;
  const passengerData = req.body;

  if (!id) {
    return res.status(400).send({ error: 'User ID is required' });
  }
  if (!passengerData) {
    return res.status(400).send({ error: 'Passenger data is required' });
  }

  const schema = Joi.object({
    Street: Joi.string().optional(),
    Relationship: Joi.string().optional().allow(''),
    City: Joi.string().optional(),
    State: Joi.string().optional(),
    Country: Joi.string().optional(),
    Email: Joi.string().email().optional(),
    'Cell Phone': Joi.string().optional(),
    'Home Phone': Joi.string().optional(),
    Education: Joi.string().optional(),
    'Household Income': Joi.number().optional(),
    'Household Size': Joi.number().optional(),
    'Marital Status': Joi.string().optional(),
    Employment: Joi.string().optional(),
    'Military Service': Joi.string().optional(),
    'Military Member': Joi.array().optional(),
    Gender: Joi.string().optional(),
    'Date of Birth': Joi.string().optional(),
  });

  const { error } = schema.validate(passengerData.records[0].fields);

  if (error) {
    console.error('Validation error:', JSON.stringify(error, null, 2));
    return res
      .status(400)
      .send({ error: 'Invalid passenger data', details: error.details });
  }

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base(process.env.AIRTABLE_BASE_ID || '');

  try {
    await base('Passengers').update(
      passengerData.records,
      async (err, records) => {
        if (err) {
          console.error('Airtable update error:', err);
          return res.status(500).json({ error: 'Error updating passenger data' });
        }
        res.status(200).send(records);
      }
    );
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected error while updating' });
  }
};

/**
 * This function deletes a passenger for a given ID.
 *
 * Steps to complete:
 * 1. Get the passengerId from the query parameters, if it doesn't exist return a 400.
 * 2. Make a call to AirTable to delete the passenger, if that fails return a 500 (hint, use try/catch).
 * 3. Return a success message with a 204 No Content status.
 *
 * @param req - the request object
 * @param res - the response object
 */
export const deletePassenger = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: 'Passenger ID is required' });
  }

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base(process.env.AIRTABLE_BASE_ID || '');

  try {
    await base('Passengers').destroy([id], (err, deletedRecords) => {
      if (err) {
        console.error('Airtable delete error:', err);
        return res.status(500).json({ error: 'Error deleting passenger' });
      }
      if (deletedRecords && deletedRecords.length > 0) {
        console.log(`Successfully deleted passenger with ID: ${id}`);
        return res.status(204).send(); // 204 No Content for successful deletion
      } else {
        // This case might happen if the ID wasn't found by Airtable (though destroy usually doesn't error)
        console.warn(`Passenger with ID: ${id} not found or not deleted.`);
        return res.status(404).json({ error: 'Passenger not found' });
      }
    });
  } catch (err: any) {
    console.error('Unexpected error during deletion:', err);
    return res
      .status(500)
      .json({ error: 'Unexpected error while deleting passenger' });
  }
};
