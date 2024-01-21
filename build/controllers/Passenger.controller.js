/* eslint-disable */ // temporary
"use strict";

import { openAsBlob } from "fs";

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
// Function to get all passengers for a specific user
const getAllPassengersForUser = async (req, res) => {
    // Extract userId from query parameters
    const { userId } = req.query;

    // Check if userId is provided, return 400 error if not
    if (!userId) {
        return res.status(400).send({ error: 'User ID is required' });
    }

    try {
        // Make an API call to fetch passengers using the userId
        const passengers = await getPassengersForUser(userId);

        // If no passengers are found for the user, return a 400 error
        if (passengers.length === 0) {
            return res.status(400).send({ error: 'No passengers found for the user' });
        }

        // Process the received passengers data to remove unnecessary fields
        const processedPassengers = passengers.map(passenger => {
            return {
                // Return only necessary fields, for example, id and name
                id: passenger.id,
                name: passenger.name,
                // Add any other relevant fields here
            };
        });

        // Send the processed passengers data in the response
        res.status(200).send(processedPassengers);
    } catch (error) {
        // Catch and handle any errors during the API call, return 500 error
        return res.status(500).send({ error: 'Failed to retrieve passengers' });
    }
};


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
// Function to get a passenger by their passengerId
const getPassengerById = async (req, res) => {
    // Extract passengerId from query parameters
    const { passengerId } = req.query;

    // Check if passengerId is provided, return 400 error if not
    if (!passengerId) {
        return res.status(400).send({ error: 'Passenger ID is required' });
    }

    try {
        // Make an API call to fetch the passenger using the passengerId
        const passenger = await getPassenger(passengerId);

        // If no passenger is found for the given passengerId, return a 400 error
        if (!passenger) {
            return res.status(400).send({ error: 'No passenger found with the given ID' });
        }

        // Process the received passenger data to remove unnecessary fields
        const processedPassenger = {
            // Return only necessary fields, for example, id and name
            id: passenger.id,
            name: passenger.name,
            // Add any other relevant fields here
        };

        // Send the processed passenger data in the response
        res.status(200).send(processedPassenger);
    } catch (error) {
        // Catch and handle any errors during the API call, return 500 error
        return res.status(500).send({ error: 'Failed to retrieve passenger' });
    }
};

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
    // Get the userId from the query parameters
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).send({ error: 'User ID is required' });
    }

    // Get the passenger data from the request body
    const passengerData = req.body;
    if (!passengerData) {
        return res.status(400).send({ error: 'Passenger data is required' });
    }

    try {
        // Make a call to AirTable to create the passenger
        const createdPassenger = yield createPassengerInAirTable(userId, passengerData);

        // Return the created passenger
        res.status(200).send(createdPassenger);
    } catch (error) {
        // Handle any errors during the API call, return 500 error
        return res.status(500).send({ error: 'Failed to create passenger' });
    }
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
    // Get the passengerId from the query parameters
    const { passengerId } = req.query;
    if (!passengerId) {
        return res.status(400).send({ error: 'Passenger ID is required' });
    }

    // Get the passenger data from the request body
    const passengerData = req.body;
    if (!passengerData) {
        return res.status(400).send({ error: 'Passenger data is required' });
    }

    try {
        // Make a call to AirTable to update the passenger
        const updatedPassenger = yield updatePassengerInAirTable(passengerId, passengerData);

        // If no passenger is found with the given ID, return a 400 error
        if (!updatedPassenger) {
            return res.status(400).send({ error: 'No passenger found with the given ID' });
        }

        // Return the updated passenger
        res.status(200).send(updatedPassenger);
    } catch (error) {
        // Handle any errors during the API call, return 500 error
        return res.status(500).send({ error: 'Failed to update passenger' });
    }
});

exports.updatePassenger = updatePassenger;
