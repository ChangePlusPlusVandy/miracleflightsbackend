import {
  getAllPassengersForUser,
  getPassengerById,
  createPassenger,
  updatePassenger,
} from '../controllers/Passenger.controller';
import {
  getAllFlightRequestsForUser,
  getFlightRequestById,
  createFlightRequest,
  updateFlightRequest,
  getFlightLegsById,
} from '../controllers/FlightRequest.controller';
import { queryParameterExample } from '../controllers/TestControllers/queryParameterExample';
import { pathParameterExample } from '../controllers/TestControllers/pathParameterExample';
import { bodyParameterExample } from '../controllers/TestControllers/bodyParameterExample';
import { retrievePassengers } from '../controllers/TestControllers/retrievePassengers';
import { createUser } from '../controllers/User.controller';
import type { Express, Request, Response } from 'express';

const routes = (app: Express) => {
  // healthcheck
  app.get('/healthcheck', (_: Request, res: Response) => res.sendStatus(200));

  /* User Controller */
  app.post('/user/', createUser);

  /* Test Controller */
  app.get('/test/query', queryParameterExample);
  app.get('/test/path/:value', pathParameterExample);
  app.get('/test/body', bodyParameterExample);
  app.get('/test/retrievePassengers', retrievePassengers);

  /* Passenger Controller Routes */
  app.get('/passenger/', getAllPassengersForUser);
  app.get('/passenger/:id', getPassengerById);
  app.post('/passenger/', createPassenger);
  app.put('/passenger/:id', updatePassenger);

  /* Flight Request Controller Routes */
  app.get('/requests/', getAllFlightRequestsForUser);
  app.get('/requests/:id', getFlightRequestById);
  app.get('/requests/:id/legs', getFlightLegsById);
  app.post('/requests/', createFlightRequest);
  app.put('/requests/:id', updateFlightRequest);

  // 404
  app.use((_: Request, res: Response) => {
    res.status(404).send('404: Page not found');
  });

  return app;
};

export default routes;
