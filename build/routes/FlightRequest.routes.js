"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const FlightRequest_controller_1 = require("../controllers/FlightRequest.controller");
const express_1 = __importDefault(require("express"));
const flightRequestRouter = express_1.default.Router();
/* Flight Request Controller Routes */
flightRequestRouter.get('/', FlightRequest_controller_1.getAllFlightRequestsForUser);
flightRequestRouter.get('/:id', FlightRequest_controller_1.getFlightRequestById);
flightRequestRouter.post('/', FlightRequest_controller_1.createFlightRequest);
flightRequestRouter.put('/:id', FlightRequest_controller_1.updateFlightRequest);
module.exports = flightRequestRouter;
