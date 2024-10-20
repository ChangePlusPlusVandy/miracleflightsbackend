import { trimPassenger } from '../util/trim';
import Airtable from 'airtable';
import Joi from 'joi';
import clerkClient from '@clerk/clerk-sdk-node';
import type { WithAuthProp } from '@clerk/clerk-sdk-node';
import type { Request, Response } from 'express';
import type { PassengerData } from '../interfaces/passenger/passenger.interface';

/**
 * This function returns user data if it exists in the database
 *
 * Steps to complete:
 * 1. Get the first name, last name, and birthdate from the request body, if it doesn't exist return a 400
 * 2. Make a call to AirTable to check if the user exists, if that fails return a 500 (hint, use try/catch)
 *    Another hint - we will be filtering by the "Passenger ID" field in the AirTable
 * 3. Remove any unnecessary data from the passenger (there is a lot of data in the AirTable response we don't need)
 * 4. Return the passengers for the user
 *
 * @param req - the request object
 * @param res - the response object
 */
export const createUser = async (req: WithAuthProp<Request>, res: Response) => {
  // given a first name, last name, and birthdate, check if a user exists in the database
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthdate: Joi.string().required(),
  });

  // validate the request body
  const { error } = schema.validate(req.body);

  // if the request body is invalid, send a 400 response
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // birthdate is formatted MM-DD-YYYY, change it to YYYY-MM-DD
  const newBirthdateParts = req.body.birthdate.split('-');
  const newBirthdate = `${newBirthdateParts[2]}-${newBirthdateParts[0]}-${newBirthdateParts[1]}`;

  // Format it like this: Cardenas, Jessica | 1989-11-10,
  const formattedUserId = `${req.body.lastName}, ${req.body.firstName} | ${newBirthdate}`;

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base(process.env.AIRTABLE_BASE_ID || '');

  const passenger = await base('Passengers')
    .select({
      filterByFormula: `{Passenger ID} = "${formattedUserId}"`,
    })
    .all();

  if (passenger.length === 0) {
    // return a message saying that the user does not exist
    return res.status(400).send('User does not exist');
  }

  if (process.env.ENVIRONMENT !== 'test') {
    try {
      await clerkClient.users.updateUserMetadata(req.auth.userId || '', {
        publicMetadata: {
          onboardComplete: false,
        },
      });
    } catch (error) {
      return res.status(500).send('Error updating user metadata');
    }
  }

  return res
    .status(200)
    .send(trimPassenger(passenger[0] as unknown as PassengerData));
};

/**
 * Links a user to an Airtable record.
 *
 * @param req - The request object containing the user's authentication information.
 * @param res - The response object used to send the result of the operation.
 * @returns A response indicating whether the user was successfully linked to the Airtable record.
 */
export const linkUserToAirtableRecord = async (
  req: WithAuthProp<Request>,
  res: Response
) => {
  const { airtableRecordId } = req.body;

  if (!airtableRecordId) {
    return res.status(400).send('Airtable ID is required');
  }

  if (process.env.ENVIRONMENT !== 'test') {
    try {
      await clerkClient.users.updateUserMetadata(req.auth.userId || '', {
        publicMetadata: {
          airtableRecordId,
          onboardComplete: true,
        },
      });
    } catch (error) {
      return res.status(500).send('Error updating user metadata');
    }
  }

  return res.status(200).send('User linked to Airtable record');
};
