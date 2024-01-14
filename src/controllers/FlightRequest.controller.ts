import { createTestFlightLegData } from '../data/test-data';
import type { Request, Response } from 'express';

/**
 * This function returns all flight requests for a given user
 *
 * Steps to complete:
 * 1. Get the userId from the query parameters, if it doesn't exist return a 400
 * 2. Make a call to AirTable to get all flight requests for the user, if that fails return a 500 (hint, use try/catch)
 *    If there are no flight requests for the user return a 400. (hint: use the AirTable API, see TestControllers/retrievePassengers.ts for an example)
 *    Another hint - we will be filtering by the "Passenger ID" field in the AirTable
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
  // get the userId from the query parameters
  // const { userId } = req.query;

  // create a fake array of flight requests
  const flightRequests = Array.from({ length: 10 }, () =>
    createTestFlightLegData()
  );

  // return the flight requests for the user
  res.status(200).send(flightRequests);
};

/**
 * This function returns a flight request for a given flightRequestId
 *
 * Steps to complete:
 * 1. Get the flightRequestId from the query parameters, if it doesn't exist return a 400
 * 2. Make a call to AirTable to get the flight request, if that fails return a 500 (hint, use try/catch)
 *   If there is no flight request for the flightRequestId return a 400. (hint: use the AirTable API, see TestControllers/retrievePassengers.ts for an example)
 * 3. Remove any unnecessary data from the flight requests (there is a lot of data in the AirTable response we don't need)
 * 4. Return the flight request
 *
 * @param req - the request object
 * @param res - the response object
 */
export const getFlightRequestById = async (req: Request, res: Response) => {
  // get the flightRequestId from the query parameters
  // const { flightRequestId } = req.query;

  // create a fake flight request
  const flightRequest = createTestFlightLegData();

  // return the flight request
  res.status(200).send(flightRequest);
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
  // use Joi to validate the request body
  // ...

  // create a fake flight request
  const flightRequest = createTestFlightLegData();

  // return the flight request
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
  const flightRequest = createTestFlightLegData();

  // return the flight request
  res.status(200).send(flightRequest);
};
