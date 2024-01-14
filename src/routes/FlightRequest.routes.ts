import {
  getAllFlightRequestsForUser,
  getFlightRequestById,
  createFlightRequest,
  updateFlightRequest,
} from '../controllers/FlightRequest.controller';
import express from 'express';

const flightRequestRouter = express.Router();

/* Flight Request Controller Routes */
flightRequestRouter.get('/', getAllFlightRequestsForUser);
flightRequestRouter.get('/:id', getFlightRequestById);
flightRequestRouter.post('/', createFlightRequest);
flightRequestRouter.put('/:id', updateFlightRequest);

export = flightRequestRouter;
