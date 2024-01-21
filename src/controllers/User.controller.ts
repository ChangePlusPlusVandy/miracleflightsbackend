import Airtable from 'airtable';
import Joi from 'joi';
import type { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  // given a first name, last name, and birthdate, check if a user exists in the database
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthdate: Joi.date().required(),
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

  return res.status(200).send(passenger[0].fields);
};
