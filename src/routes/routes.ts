import {
  getAllPassengersForUser,
  getPassengerById,
  createPassenger,
  updatePassenger,
} from '../controllers/Passenger.controller';
import {
  createUser,
  linkUserToAirtableRecord,
} from '../controllers/User.controller';
import { getDashboardStats } from '../controllers/Dashboard.controller';
import validateAuth from '../middleware/validateAuth';
import {
  getAllFlightRequestsForUser,
  getFlightRequestById,
  getFlightLegsById,
  createFlightRequest,
  updateFlightRequest,
} from '../controllers/FlightRequest.controller';
import express from 'express';
import type { Request, Response } from 'express';
import type { LooseAuthProp } from '@clerk/clerk-sdk-node';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

// Protected routes (require authentication)
const router = express.Router();

// healthcheck
router.get('/healthcheck', (_: Request, res: Response) => res.sendStatus(200));

/* User Controller */
router.post('/user/', validateAuth, createUser);
router.post('/user/link', validateAuth, linkUserToAirtableRecord);

/* Passenger Controller Routes */
router.get('/passenger/accompanying', validateAuth, getAllPassengersForUser);
router.get('/passenger/:id', validateAuth, getPassengerById);
router.post('/passenger/:id', validateAuth, createPassenger);
router.put('/passenger/:id', validateAuth, updatePassenger);

/* Dashboard Controller Routes */
router.get('/dashboard/', getDashboardStats);

/* Flight Request Controller Routes */
router.get('/requests', validateAuth, getAllFlightRequestsForUser);
router.get('/requests/:id', validateAuth, getFlightRequestById);
router.get('/requests/:id/legs', validateAuth, getFlightLegsById);
router.post('/requests/', validateAuth, createFlightRequest);
router.put('/requests/:id', validateAuth, updateFlightRequest);

export default router;
