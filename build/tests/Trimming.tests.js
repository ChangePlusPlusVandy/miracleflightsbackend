"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const flight_requests_1 = require("../util/trimming/flight-requests");
const flight_legs_1 = require("../util/trimming/flight-legs");
const passengers_1 = require("../util/trimming/passengers");
const test_data_1 = require("../data/test-data");
const chai_1 = __importStar(require("chai"));
chai_1.default.should();
describe('Trimming', () => {
    it('should properly trim request', () => {
        const requestData = (0, test_data_1.createTestFlightRequestData)();
        const trimmedRequest = (0, flight_requests_1.trimRequest)(requestData);
        (0, chai_1.expect)(requestData.id).to.equal(trimmedRequest.id);
        (0, chai_1.expect)(requestData.createdTime).to.equal(trimmedRequest.createdTime);
        (0, chai_1.expect)(requestData.fields['Submission ID']).to.equal(trimmedRequest['Submission ID']);
        (0, chai_1.expect)(requestData.fields['Trip Type']).to.equal(trimmedRequest['Trip Type']);
        (0, chai_1.expect)(requestData.fields['Departure Date']).to.equal(trimmedRequest['Departure Date']);
        (0, chai_1.expect)(requestData.fields['Request Type']).to.equal(trimmedRequest['Request Type']);
        (0, chai_1.expect)(requestData.fields['Household Size']).to.equal(trimmedRequest['Household Size']);
        (0, chai_1.expect)(requestData.fields['Passenger 2 Approval Status']).to.equal(trimmedRequest['Passenger 2 Approval Status']);
        (0, chai_1.expect)(requestData.fields['Diagnosis']).to.equal(trimmedRequest['Diagnosis']);
        (0, chai_1.expect)(requestData.fields['Passenger 3']).to.equal(trimmedRequest['Passenger 3']);
        (0, chai_1.expect)(requestData.fields['Patient Type']).to.equal(trimmedRequest['Patient Type']);
        (0, chai_1.expect)(requestData.fields.Ethnicity).to.equal(trimmedRequest.Ethnicity);
        (0, chai_1.expect)(requestData.fields['Treatment City']).to.equal(trimmedRequest['Treatment City']);
        (0, chai_1.expect)(requestData.fields.Education).to.equal(trimmedRequest.Education);
        (0, chai_1.expect)(requestData.fields['Treatment Phone']).to.equal(trimmedRequest['Treatment Phone']);
        (0, chai_1.expect)(requestData.fields['Submission Date']).to.equal(trimmedRequest['Submission Date']);
        (0, chai_1.expect)(requestData.fields['Alt Destination Airport']).to.equal(trimmedRequest['Alt Destination Airport']);
        (0, chai_1.expect)(requestData.fields['Primary Treatment Doctor']).to.equal(trimmedRequest['Primary Treatment Doctor']);
        (0, chai_1.expect)(requestData.fields['Wheelchair?']).to.equal(trimmedRequest['Wheelchair?']);
        (0, chai_1.expect)(requestData.fields['Flight Specialist']).to.equal(trimmedRequest['Flight Specialist']);
        (0, chai_1.expect)(requestData.fields['Appt Date']).to.equal(trimmedRequest['Appt Date']);
        (0, chai_1.expect)(requestData.fields['Passenger 3 Approval Status']).to.equal(trimmedRequest['Passenger 3 Approval Status']);
        (0, chai_1.expect)(requestData.fields['First Request']).to.equal(trimmedRequest['First Request']);
        (0, chai_1.expect)(requestData.fields['Type of Treatment']).to.equal(trimmedRequest['Type of Treatment']);
        (0, chai_1.expect)(requestData.fields['Passenger 3 Reason']).to.equal(trimmedRequest['Passenger 3 Reason']);
        (0, chai_1.expect)(requestData.fields['Flight Legs']).to.equal(trimmedRequest['Flight Legs']);
        (0, chai_1.expect)(requestData.fields.Status).to.equal(trimmedRequest.Status);
        (0, chai_1.expect)(requestData.fields['Oxygen?']).to.equal(trimmedRequest['Oxygen?']);
        (0, chai_1.expect)(requestData.fields['Origin Airport']).to.equal(trimmedRequest['Origin Airport']);
        (0, chai_1.expect)(requestData.fields['Treatment Fax']).to.equal(trimmedRequest['Treatment Fax']);
        (0, chai_1.expect)(requestData.fields['Passenger 3 Different Return']).to.equal(trimmedRequest['Passenger 3 Different Return']);
        (0, chai_1.expect)(requestData.fields.Patient).to.equal(trimmedRequest.Patient);
        (0, chai_1.expect)(requestData.fields['Passenger 2']).to.equal(trimmedRequest['Passenger 2']);
        (0, chai_1.expect)(requestData.fields['Return Date']).to.equal(trimmedRequest['Return Date']);
        (0, chai_1.expect)(requestData.fields['Treatment Site']).to.equal(trimmedRequest['Treatment Site']);
        (0, chai_1.expect)(requestData.fields['Treatment State']).to.equal(trimmedRequest['Treatment State']);
        (0, chai_1.expect)(requestData.fields['Passenger 3 Return Date']).to.equal(trimmedRequest['Passenger 3 Return Date']);
        (0, chai_1.expect)(requestData.fields['Patient Age']).to.equal(trimmedRequest['Patient Age']);
        (0, chai_1.expect)(requestData.fields['Passenger 2 Different Return']).to.equal(trimmedRequest['Passenger 2 Different Return']);
        (0, chai_1.expect)(requestData.fields['Destination Airport']).to.equal(trimmedRequest['Destination Airport']);
        (0, chai_1.expect)(requestData.fields['Alt. Origin Airport']).to.equal(trimmedRequest['Alt. Origin Airport']);
        (0, chai_1.expect)(requestData.fields['AirTable Record ID']).to.equal(trimmedRequest['AirTable Record ID']);
        (0, chai_1.expect)(requestData.fields['Patient AirTable Record ID']).to.equal(trimmedRequest['Patient AirTable Record ID']);
        (0, chai_1.expect)(requestData.fields['Passenger 2 AirTable Record ID']).to.equal(trimmedRequest['Passenger 2 AirTable Record ID']);
        (0, chai_1.expect)(requestData.fields['Passenger 3 AirTable Record ID']).to.equal(trimmedRequest['Passenger 3 AirTable Record ID']);
        (0, chai_1.expect)(requestData.fields['Passenger AirTable Record IDs']).to.equal(trimmedRequest['Passenger AirTable Record IDs']);
        (0, chai_1.expect)(requestData.fields['Existing Diagnoses']).to.equal(trimmedRequest['Existing Diagnoses']);
        (0, chai_1.expect)(requestData.fields['Total Nautical Miles']).to.equal(trimmedRequest['Total Nautical Miles']);
        (0, chai_1.expect)(requestData.fields['# of Legs']).to.equal(trimmedRequest['# of Legs']);
        (0, chai_1.expect)(requestData.fields['Total # of Legs']).to.equal(trimmedRequest['Total # of Legs']);
        (0, chai_1.expect)(requestData.fields['Request ID']).to.equal(trimmedRequest['Request ID']);
    });
    it('should properly trim flight leg', () => {
        const legData = (0, test_data_1.createTestFlightLegData)();
        const trimmedLeg = (0, flight_legs_1.trimFlightLeg)(legData);
        (0, chai_1.expect)(legData.id).to.equal(trimmedLeg.id);
        (0, chai_1.expect)(legData.createdTime).to.equal(trimmedLeg.createdTime);
        (0, chai_1.expect)(legData.fields.Status).to.equal(trimmedLeg.Status);
        (0, chai_1.expect)(legData.fields.Airline).to.equal(trimmedLeg.Airline);
        (0, chai_1.expect)(legData.fields['Departure Date/Time']).to.equal(trimmedLeg['Departure Date/Time']);
        (0, chai_1.expect)(legData.fields['Arrival Date/Time']).to.equal(trimmedLeg['Arrival Date/Time']);
        (0, chai_1.expect)(legData.fields['Nautical Miles']).to.equal(trimmedLeg['Nautical Miles']);
        (0, chai_1.expect)(legData.fields.Passengers).to.equal(trimmedLeg.Passengers);
        (0, chai_1.expect)(legData.fields['Departure Airport']).to.equal(trimmedLeg['Departure Airport']);
        (0, chai_1.expect)(legData.fields['Arrival Airport']).to.equal(trimmedLeg['Arrival Airport']);
        (0, chai_1.expect)(legData.fields['Leg ID']).to.equal(trimmedLeg['Leg ID']);
        (0, chai_1.expect)(legData.fields['Leg Type']).to.equal(trimmedLeg['Leg Type']);
        (0, chai_1.expect)(legData.fields['Total Miles']).to.equal(trimmedLeg['Total Miles']);
        (0, chai_1.expect)(legData.fields['Passenger Names']).to.equal(trimmedLeg['Passenger Names']);
        (0, chai_1.expect)(legData.fields['Total Cost']).to.equal(trimmedLeg['Total Cost']);
        (0, chai_1.expect)(legData.fields['AirTable Record ID']).to.equal(trimmedLeg['AirTable Record ID']);
        (0, chai_1.expect)(legData.fields['Request AirTable Record ID']).to.equal(trimmedLeg['Request AirTable Record ID']);
        (0, chai_1.expect)(legData.fields['Passenger AirTable Record IDs']).to.equal(trimmedLeg['Passenger AirTable Record IDs']);
        (0, chai_1.expect)(legData.fields['Log Airline Credit'].label).to.equal(trimmedLeg['Log Airline Credit'].label);
        (0, chai_1.expect)(legData.fields['Log Airline Credit'].url).to.equal(trimmedLeg['Log Airline Credit'].url);
        (0, chai_1.expect)(legData.fields['Patient Name']).to.equal(trimmedLeg['Patient Name']);
        (0, chai_1.expect)(legData.fields['Patient Latest Trip']).to.equal(trimmedLeg['Patient Latest Trip']);
        (0, chai_1.expect)(legData.fields['Is Latest Trip']).to.equal(trimmedLeg['Is Latest Trip']);
    });
    it('should properly trim passenger', () => {
        const passengerData = (0, test_data_1.createTestPassengerData)();
        const trimmedPassenger = (0, passengers_1.trimPassenger)(passengerData);
        (0, chai_1.expect)(passengerData.id).to.equal(trimmedPassenger.id);
        (0, chai_1.expect)(passengerData.createdTime).to.equal(trimmedPassenger.createdTime);
        (0, chai_1.expect)(passengerData.fields.Type).to.equal(trimmedPassenger.Type);
        (0, chai_1.expect)(passengerData.fields['First Name']).to.equal(trimmedPassenger['First Name']);
        (0, chai_1.expect)(passengerData.fields['Last Name']).to.equal(trimmedPassenger['Last Name']);
        (0, chai_1.expect)(passengerData.fields['Date of Birth']).to.equal(trimmedPassenger['Date of Birth']);
        (0, chai_1.expect)(passengerData.fields.Gender).to.equal(trimmedPassenger.Gender);
        (0, chai_1.expect)(passengerData.fields.Street).to.equal(trimmedPassenger.Street);
        (0, chai_1.expect)(passengerData.fields.Country).to.equal(trimmedPassenger.Country);
        (0, chai_1.expect)(passengerData.fields.Email).to.equal(trimmedPassenger.Email);
        (0, chai_1.expect)(passengerData.fields['Household Income']).to.equal(trimmedPassenger['Household Income']);
        (0, chai_1.expect)(passengerData.fields['Household Size']).to.equal(trimmedPassenger['Household Size']);
        (0, chai_1.expect)(passengerData.fields.Ethnicity).to.equal(trimmedPassenger.Ethnicity);
        (0, chai_1.expect)(passengerData.fields['Military Service']).to.equal(trimmedPassenger['Military Service']);
        (0, chai_1.expect)(passengerData.fields['Military Member']).to.equal(trimmedPassenger['Military Member']);
        (0, chai_1.expect)(passengerData.fields['How did you hear about us']).to.equal(trimmedPassenger['How did you hear about us']);
        (0, chai_1.expect)(passengerData.fields['All Flight Legs']).to.equal(trimmedPassenger['All Flight Legs']);
        (0, chai_1.expect)(passengerData.fields.Diagnosis).to.equal(trimmedPassenger.Diagnosis);
        (0, chai_1.expect)(passengerData.fields['AirTable Record ID']).to.equal(trimmedPassenger['AirTable Record ID']);
        (0, chai_1.expect)(passengerData.fields['# of Flight Legs']).to.equal(trimmedPassenger['# of Flight Legs']);
        (0, chai_1.expect)(passengerData.fields['# of Booked Flight Requests']).to.equal(trimmedPassenger['# of Booked Flight Requests']);
        (0, chai_1.expect)(passengerData.fields['Birth Month']).to.equal(trimmedPassenger['Birth Month']);
        (0, chai_1.expect)(passengerData.fields['Full Name']).to.equal(trimmedPassenger['Full Name']);
        (0, chai_1.expect)(passengerData.fields.Age).to.equal(trimmedPassenger.Age);
        (0, chai_1.expect)(passengerData.fields['Latest Trip']).to.equal(trimmedPassenger['Latest Trip']);
    });
});
