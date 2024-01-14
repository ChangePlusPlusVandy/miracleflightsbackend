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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrievePassengers = void 0;
const airtable_1 = __importDefault(require("airtable"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Example endpoint that uses the AirTable API to retrieve all the passengers in the example db
// THIS IS A TEST ENDPOINT AND IT IS STILL A WORK IN PROGRESS
const retrievePassengers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.AIRTABLE_API_KEY);
    const base = new airtable_1.default({
        apiKey: process.env.AIRTABLE_API_KEY || '',
    }).base('appwPsfAb6U8CV3mf');
    base('Flight Requests (Trips)')
        .select({
        // Selecting the first 3 records in All Requests [MASTER]:
        maxRecords: 100,
        view: 'All Requests [MASTER]',
    })
        .firstPage(function (err, records) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                console.error(err);
                return;
            }
            if (records) {
                const flightLegs = records.map(record => record.fields['Flight Legs'] !== undefined
                    ? record.fields['Flight Legs']
                    : []);
                console.log('Retrieved Flight Leg IDs', flightLegs);
                try {
                    const trips = [];
                    const promises = flightLegs.map((trip) => __awaiter(this, void 0, void 0, function* () {
                        const flightLegsForTrip = [];
                        const tripPromises = trip.map((flightLegId) => __awaiter(this, void 0, void 0, function* () {
                            const flightLegRecord = yield base('Flight Legs').find((flightLegId === null || flightLegId === void 0 ? void 0 : flightLegId.toString()) || ''); // Replace with your actual table name
                            flightLegsForTrip.push(flightLegRecord);
                        }));
                        yield Promise.all(tripPromises);
                        trips.push(flightLegsForTrip);
                    }));
                    yield Promise.all(promises);
                    console.log('Retrieved trips of flight legs', trips);
                    // Send the response or do further processing
                    res.status(200).send(trips);
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    });
});
exports.retrievePassengers = retrievePassengers;
