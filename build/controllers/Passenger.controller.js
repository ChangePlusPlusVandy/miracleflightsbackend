"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassenger = exports.createPassenger = exports.getPassengerById = exports.getAllPassengersForUser = void 0;
const test_data_1 = require("../data/test-data");
/**
 * This function returns all passengers connected to a user
 *
 * Steps to complete:
 * 1. Get the userId from the query parameters, if it doesn't exist return a 400
 * 2. Make a call to AirTable to get all passengers for the user, if that fails return a 500 (hint, use try/catch)
 *   If there are no passengers for the user return a 400. (hint: use the AirTable API, see TestControllers/retrievePassengers.ts for an example)
 *  Another hint - we will be filtering by the "Passenger ID" field in the AirTable
 * 3. Remove any unnecessary data from the passengers (there is a lot of data in the AirTable response we don't need)
 * 4. Return the passengers for the user
 *
 * @param req - the request object
 * @param res - the response object
 */
const getAllPassengersForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the userId from the query parameters
    // const { userId } = req.query;
    // create a fake array of passengers
    const passengers = Array.from({ length: 10 }, () => (0, test_data_1.createTestPassengerData)());
    // return the passengers for the user
    res.status(200).send(passengers);
});
exports.getAllPassengersForUser = getAllPassengersForUser;
/**
 * This function returns a passenger for a given passengerId
 *
 * Steps to complete:
 * 1. Get the passengerId from the query parameters, if it doesn't exist return a 400
 * 2. Make a call to AirTable to get the passenger, if that fails return a 500 (hint, use try/catch)
 *   If there is no passenger for the passengerId return a 400. (hint: use the AirTable API, see TestControllers/retrievePassengers.ts for an example)
 * 3. Remove any unnecessary data from the passenger (there is a lot of data in the AirTable response we don't need)
 * 4. Return the passenger
 *
 * @param req - the request object
 * @param res - the response object
 */
const getPassengerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the passengerId from the query parameters
    // const { passengerId } = req.query;
    // create a fake passenger
    const passenger = (0, test_data_1.createTestPassengerData)();
    // return the passenger
    res.status(200).send(passenger);
});
exports.getPassengerById = getPassengerById;
/**
 * This function creates a passenger for a given user
 *
 * Steps to complete:
 * 1. Get the userId from the query parameters, if it doesn't exist return a 400
 * 2. Get the passenger data from the request body, if it doesn't exist return a 400
 * 3. Make a call to AirTable to create the passenger, if that fails return a 500 (hint, use try/catch)
 * 4. Return the created passenger
 *
 * @param req - the request object
 * @param res - the response object
 */
const createPassenger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the userId from the query parameters
    // const { userId } = req.query;
    // get the passenger data from the request body
    // const data = req.body;
    // validate the passenger data using Joi
    // ...
    // create a fake passenger
    const passenger = (0, test_data_1.createTestPassengerData)();
    // return the created passenger
    res.status(200).send(passenger);
});
exports.createPassenger = createPassenger;
/**
 * This function updates a passenger for a given user
 *
 * Steps to complete:
 * 1. Get the passengerId from the query parameters, if it doesn't exist return a 400
 * 2. Get the passenger data from the request body, if it doesn't exist return a 400
 * 3. Make a call to AirTable to update the passenger, if that fails return a 500 (hint, use try/catch)
 * 4. Return the updated passenger
 *
 * @param req - the request object
 * @param res - the response object
 */
const updatePassenger = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the passengerId from the query parameters
    // const { passengerId } = req.query;
    // get the passenger data from the request body
    // const data = req.body;
    // validate the passenger data using Joi
    // ...
    // create a fake passenger
    const passenger = (0, test_data_1.createTestPassengerData)();
    // return the updated passenger
    res.status(200).send(passenger);
});
exports.updatePassenger = updatePassenger;
