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
exports.updateFlightRequest = exports.createFlightRequest = exports.getFlightRequestById = exports.getAllFlightRequestsForUser = void 0;
const test_data_1 = require("../data/test-data");
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
const getAllFlightRequestsForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the userId from the query parameters
    // const { userId } = req.query;
    // create a fake array of flight requests
    const flightRequests = Array.from({ length: 10 }, () => (0, test_data_1.createTestFlightLegData)());
    // return the flight requests for the user
    res.status(200).send(flightRequests);
});
exports.getAllFlightRequestsForUser = getAllFlightRequestsForUser;
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
const getFlightRequestById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the flightRequestId from the query parameters
    // const { flightRequestId } = req.query;
    // create a fake flight request
    const flightRequest = (0, test_data_1.createTestFlightLegData)();
    // return the flight request
    res.status(200).send(flightRequest);
});
exports.getFlightRequestById = getFlightRequestById;
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
const createFlightRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the flight request data from the request body
    // const data = req.body;
    // use Joi to validate the request body
    // ...
    // create a fake flight request
    const flightRequest = (0, test_data_1.createTestFlightLegData)();
    // return the flight request
    res.status(200).send(flightRequest);
});
exports.createFlightRequest = createFlightRequest;
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
const updateFlightRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get the flightRequestId from the path parameters
    // const { flightRequestId } = req.params;
    // use Joi to validate the request body
    // ...
    // create a fake flight request that was "updated"
    const flightRequest = (0, test_data_1.createTestFlightLegData)();
    // return the flight request
    res.status(200).send(flightRequest);
});
exports.updateFlightRequest = updateFlightRequest;
