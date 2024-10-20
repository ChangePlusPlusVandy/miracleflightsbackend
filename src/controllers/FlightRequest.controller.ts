import logger from '../util/logger';
import { trimFlightLeg, trimRequest } from '../util/trim';
import { createTestFlightLegData } from '../data/test-data';
import Airtable from 'airtable';
import dotenv from 'dotenv';
import type { FlightLegData } from '../interfaces/legs/flight-leg.interface';
import type { Request, Response } from 'express';
import type { FlightRequestData } from '../interfaces/requests/flight-request.interface';
dotenv.config();

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY || '',
}).base(process.env.AIRTABLE_BASE_ID || '');

/**
 * Get all flight requests for a given user
 *
 * Steps to complete:
 * 1. Get the userId from the query parameters, if it doesn't exist return a 400
 * 2. Make a call to AirTable to get all flight requests for the user, if that fails return a 500 (hint, use try/catch)
 *    If there are no flight requests for the user return a 400. (hint: use the AirTable API, see TestControllers/retrievePassengers.ts for an example)
 *    Another hint - we will be filtering by the "Patient AirTable Record ID" field in the AirTable
 * 3. Remove any unnecessary data from the flight requests (there is a lot of data in the AirTable response we don't need)
 * 4. Return the flight requests for the user
 *
 * @param req - the request object
 * @param res - the response object
 */
export const getAllFlightRequestsForUser = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'Passenger ID missing' });
  }

  try {
    // Query Airtable for flight requests for the user ID
    const flightRequests = await base('Flight Requests (Trips)')
      .select({
        filterByFormula: `{Patient AirTable Record ID} = "${userId}"`,
      })
      .all();

    if (flightRequests.length === 0) {
      return res
        .status(400)
        .json({ error: 'No flight requests found for this user' });
    }

    // Trim unnecessary data from the flight requests
    const trimmedFlightRequests = flightRequests
      .map(request => request._rawJson)
      .map(request => trimRequest(request as unknown as FlightRequestData));

    // Get the flight leg IDs from the trimmed flight requests
    const flightLegIds =
      trimmedFlightRequests?.map(request => request['Flight Legs']) || [];

    // Query Airtable for the flight legs using the flight leg IDs
    const flightLegsData = await Promise.all(
      flightLegIds.map(async (idSection: string[]) =>
        idSection && idSection.length > 0
          ? await base('Flight Legs')
              .select({
                filterByFormula: `OR(${idSection
                  .map(id => `RECORD_ID() = "${id}"`)
                  .join(',')})`,
              })
              .all()
          : []
      )
    );

    const formattedFlightLegs = flightLegsData.map(leg =>
      leg?.map(l =>
        l?._rawJson ? trimFlightLeg(l?._rawJson as unknown as FlightLegData) : []
      )
    );

    // formatted flight legs is an array of arrays, so we need to match the flight leg IDs to the flight requests

    // Format the flight requests by replacing flight leg IDs with actual flight leg data
    const formattedFlightRequests = trimmedFlightRequests.map(request => ({
      ...request,
      'Flight Legs':
        formattedFlightLegs[trimmedFlightRequests.indexOf(request)] || [],
    }));

    return res.status(200).json(formattedFlightRequests);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching flight requests' });
  }
};

/**
 * Get a flight request by its ID
 *
 * @param req - the request object
 * @param res - the response object
 */
export const getFlightRequestById = async (req: Request, res: Response) => {
  // get the flightRequestId from the query parameters

  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Flight Request ID missing' });
  }

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base(process.env.AIRTABLE_BASE_ID || '');

  try {
    await base('Flight Requests (Trips)').find(
      id.toString(),
      function (err, record) {
        if (err) {
          return res.status(400).json({ error: 'No record found' });
        }

        return res.status(200).send(record);
      }
    );
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json({ error: 'Error fetching record' });
  }
};

/**
 * Get the flight legs for a given flight request ID
 *
 * @param req - the request object
 * @param res - the response object
 */
export const getFlightLegsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  let flightLegs;

  if (!id) {
    return res.status(400).json({ error: 'Flight Request ID missing' });
  }

  const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY || '',
  }).base(process.env.AIRTABLE_BASE_ID || '');

  try {
    flightLegs = await base('Flight Legs')
      .select({
        filterByFormula: `{Request AirTable Record ID} = "${id.toString()}"`,
      })
      .all();

    if (flightLegs.length === 0) {
      return res.status(400).json({ error: 'No record found' });
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json({ error: 'Error fetching record' });
  }

  return res.status(200).send(flightLegs);
};

/**
 * This function creates a flight request for a given user
 *
 * Steps to complete:
 * 1. Use Joi to validate the request body, if it doesn't exist or is invalid return a 400
 * 2. Create a fake flight request by making a call to JotForm. If that fails return a 500 (hint, use try/catch)
 * 3. Return the flight request that was created
 *
 * @param req - the request object
 * @param res - the response object
 */
export const createFlightRequest = async (req: Request, res: Response) => {
  // get the flight request data from the request body
  // const data = req.body;

  // if (!data) {
  //   return res.status(400).json({ error: 'Flight request data missing' });
  // }
  // use Joi to validate the request body
  // ...

  // create a fake flight request
  const flightRequest = createTestFlightLegData(); // return the flight request

  res.status(200).send(flightRequest);
};

/**
 * This function updates a flight request for a given flightRequestId
 *
 * Steps to complete:
 * 1. Get the flightRequestId from the path parameters, if it doesn't exist return a 400
 * 2. Use Joi to validate the request body, if it doesn't exist or is invalid return a 400
 * 3. Update the flight request by making a call to AirTable. If that fails return a 500 (hint, use try/catch)
 * 4. Return the entire flight request that was updated, once again removing any unnecessary data
 *
 * @param req - the request object
 * @param res - the response object
 */
export const updateFlightRequest = async (req: Request, res: Response) => {
  // get the flightRequestId from the path parameters
  // const { flightRequestId } = req.params;

  // use Joi to validate the request body
  // ...

  // create a fake flight request that was "updated"
  const flightRequest = createTestFlightLegData(); // return the flight request

  res.status(200).send(flightRequest);
};
