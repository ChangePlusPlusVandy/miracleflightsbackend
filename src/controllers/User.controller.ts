import { trimPassenger } from '../util/trim';
import Airtable from 'airtable';
import Joi from 'joi';
import type { Request, Response } from 'express';
import type { PassengerData } from '../interfaces/passenger/passenger.interface';

/**
 * This function returns all passengers connected to a user
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
export const createUser = async (req: Request, res: Response) => {
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

  // Format it like this: Cardenas, Jessica | 1989-11-10, birthday is a javascript date object
  const formattedUserId = `${req.body.lastName}, ${req.body.firstName} | ${
    req.body.birthdate.split('T')[0]
  }`;

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base('appwPsfAb6U8CV3mf');

  const passenger = await base('Passengers')
    .select({
      filterByFormula: `{Passenger ID} = "${formattedUserId}"`,
    })
    .all();

  if (passenger.length === 0) {
    // return a message saying that the user does not exist
    return res.status(400).send('User does not exist');
  }

  return res
    .status(200)
    .send(trimPassenger(passenger[0] as unknown as PassengerData));
};
