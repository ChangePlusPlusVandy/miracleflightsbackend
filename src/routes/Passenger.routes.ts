import {
  getAllPassengersForUser,
  getPassengerById,
  createPassenger,
  updatePassenger,
} from '../controllers/Passenger.controller';
import express from 'express';

const passengerRouter = express.Router();

/* Passenger Controller Routes */
passengerRouter.get('/', getAllPassengersForUser);
passengerRouter.get('/:id', getPassengerById);
passengerRouter.post('/', createPassenger);
passengerRouter.put('/:id', updatePassenger);

export = passengerRouter;
