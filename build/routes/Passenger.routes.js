"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Passenger_controller_1 = require("../controllers/Passenger.controller");
const express_1 = __importDefault(require("express"));
const passengerRouter = express_1.default.Router();
/* Passenger Controller Routes */
passengerRouter.get('/', Passenger_controller_1.getAllPassengersForUser);
passengerRouter.get('/:id', Passenger_controller_1.getPassengerById);
passengerRouter.post('/', Passenger_controller_1.createPassenger);
passengerRouter.put('/:id', Passenger_controller_1.updatePassenger);
module.exports = passengerRouter;
