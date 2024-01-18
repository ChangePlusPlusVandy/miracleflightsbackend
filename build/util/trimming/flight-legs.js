"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimRequest = void 0;
const trimRequest = (request) => {
    const { id, createdTime, fields } = request;
    const { Status, Airline, Passengers } = fields;
    const trimmedLeg = {
        id: id,
        createdTime: createdTime,
        Status: Status,
        Airline: Airline,
        'Departure Date/Time': fields['Departure Date/Time'],
        'Arrival Date/Time': fields['Arrival Date/Time'],
        'Nautical Miles': fields['Nautical Miles'],
        Passengers: Passengers,
        'Departure Airport': fields['Departure Airport'],
        'Arrival Airport': fields['Arrival Airport'],
        'Leg ID': fields['Leg ID'],
        'Leg Type': fields['Leg Type'],
        'Total Miles': fields['Total Miles'],
        'Passenger Names': fields['Passenger Names'],
        'Total Cost': fields['Total Cost'],
        'AirTable Record ID': fields['AirTable Record ID'],
        'Request AirTable Record ID': fields['Request AirTable Record ID'],
        'Passenger AirTable Record IDs': fields['Passenger AirTable Record IDs'],
        'Log Airline Credit': {
            label: fields['Log Airline Credit'].label,
            url: fields['Log Airline Credit'].url,
        },
        'Patient Name': fields['Patient Name'],
        'Patient Latest Trip': fields['Patient Latest Trip'],
        'Is Latest Trip': fields['Is Latest Trip'],
    };
    return trimmedLeg;
};
exports.trimRequest = trimRequest;
