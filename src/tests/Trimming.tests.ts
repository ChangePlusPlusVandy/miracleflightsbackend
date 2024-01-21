import {
  createTestFlightLegData,
  createTestFlightRequestData,
  createTestPassengerData,
} from '../data/test-data';
import { trimRequest, trimFlightLeg, trimPassenger } from '../util/trim';
import chai, { expect } from 'chai';
import type { FlightLegData } from '../interfaces/legs/flight-leg.interface';
import type { FlightRequestData } from '../interfaces/requests/flight-request.interface';
import type { PassengerData } from '../interfaces/passenger/passenger.interface';
import type { TrimmedFlightLeg } from '../interfaces/legs/trimmed-flight-leg.interface';
import type { TrimmedFlightRequest } from '../interfaces/requests/trimmed-flight-request.interface';
import type { TrimmedPassenger } from '../interfaces/passenger/trimmed-passenger.interface';
chai.should();

describe('Trimming', () => {
  it('should properly trim request', () => {
    const requestData: FlightRequestData = createTestFlightRequestData();
    const trimmedRequest: TrimmedFlightRequest = trimRequest(requestData);
    expect(requestData.id).to.equal(trimmedRequest.id);
    expect(requestData.createdTime).to.equal(trimmedRequest.createdTime);
    expect(requestData.fields['Submission ID']).to.equal(
      trimmedRequest['Submission ID']
    );
    expect(requestData.fields['Trip Type']).to.equal(trimmedRequest['Trip Type']);
    expect(requestData.fields['Departure Date']).to.equal(
      trimmedRequest['Departure Date']
    );
    expect(requestData.fields['Request Type']).to.equal(
      trimmedRequest['Request Type']
    );
    expect(requestData.fields['Household Size']).to.equal(
      trimmedRequest['Household Size']
    );
    expect(requestData.fields['Passenger 2 Approval Status']).to.equal(
      trimmedRequest['Passenger 2 Approval Status']
    );
    expect(requestData.fields['Diagnosis']).to.equal(trimmedRequest['Diagnosis']);
    expect(requestData.fields['Passenger 3']).to.equal(
      trimmedRequest['Passenger 3']
    );
    expect(requestData.fields['Patient Type']).to.equal(
      trimmedRequest['Patient Type']
    );
    expect(requestData.fields.Ethnicity).to.equal(trimmedRequest.Ethnicity);
    expect(requestData.fields['Treatment City']).to.equal(
      trimmedRequest['Treatment City']
    );
    expect(requestData.fields.Education).to.equal(trimmedRequest.Education);
    expect(requestData.fields['Treatment Phone']).to.equal(
      trimmedRequest['Treatment Phone']
    );
    expect(requestData.fields['Submission Date']).to.equal(
      trimmedRequest['Submission Date']
    );
    expect(requestData.fields['Alt Destination Airport']).to.equal(
      trimmedRequest['Alt Destination Airport']
    );
    expect(requestData.fields['Primary Treatment Doctor']).to.equal(
      trimmedRequest['Primary Treatment Doctor']
    );
    expect(requestData.fields['Wheelchair?']).to.equal(
      trimmedRequest['Wheelchair?']
    );
    expect(requestData.fields['Flight Specialist']).to.equal(
      trimmedRequest['Flight Specialist']
    );
    expect(requestData.fields['Appt Date']).to.equal(trimmedRequest['Appt Date']);
    expect(requestData.fields['Passenger 3 Approval Status']).to.equal(
      trimmedRequest['Passenger 3 Approval Status']
    );
    expect(requestData.fields['First Request']).to.equal(
      trimmedRequest['First Request']
    );
    expect(requestData.fields['Type of Treatment']).to.equal(
      trimmedRequest['Type of Treatment']
    );
    expect(requestData.fields['Passenger 3 Reason']).to.equal(
      trimmedRequest['Passenger 3 Reason']
    );
    expect(requestData.fields['Flight Legs']).to.equal(
      trimmedRequest['Flight Legs']
    );
    expect(requestData.fields.Status).to.equal(trimmedRequest.Status);
    expect(requestData.fields['Oxygen?']).to.equal(trimmedRequest['Oxygen?']);
    expect(requestData.fields['Origin Airport']).to.equal(
      trimmedRequest['Origin Airport']
    );
    expect(requestData.fields['Treatment Fax']).to.equal(
      trimmedRequest['Treatment Fax']
    );
    expect(requestData.fields['Passenger 3 Different Return']).to.equal(
      trimmedRequest['Passenger 3 Different Return']
    );
    expect(requestData.fields.Patient).to.equal(trimmedRequest.Patient);
    expect(requestData.fields['Passenger 2']).to.equal(
      trimmedRequest['Passenger 2']
    );
    expect(requestData.fields['Return Date']).to.equal(
      trimmedRequest['Return Date']
    );
    expect(requestData.fields['Treatment Site']).to.equal(
      trimmedRequest['Treatment Site']
    );
    expect(requestData.fields['Treatment State']).to.equal(
      trimmedRequest['Treatment State']
    );
    expect(requestData.fields['Passenger 3 Return Date']).to.equal(
      trimmedRequest['Passenger 3 Return Date']
    );
    expect(requestData.fields['Patient Age']).to.equal(
      trimmedRequest['Patient Age']
    );
    expect(requestData.fields['Passenger 2 Different Return']).to.equal(
      trimmedRequest['Passenger 2 Different Return']
    );
    expect(requestData.fields['Destination Airport']).to.equal(
      trimmedRequest['Destination Airport']
    );
    expect(requestData.fields['Alt. Origin Airport']).to.equal(
      trimmedRequest['Alt. Origin Airport']
    );
    expect(requestData.fields['AirTable Record ID']).to.equal(
      trimmedRequest['AirTable Record ID']
    );
    expect(requestData.fields['Patient AirTable Record ID']).to.equal(
      trimmedRequest['Patient AirTable Record ID']
    );
    expect(requestData.fields['Passenger 2 AirTable Record ID']).to.equal(
      trimmedRequest['Passenger 2 AirTable Record ID']
    );
    expect(requestData.fields['Passenger 3 AirTable Record ID']).to.equal(
      trimmedRequest['Passenger 3 AirTable Record ID']
    );
    expect(requestData.fields['Passenger AirTable Record IDs']).to.equal(
      trimmedRequest['Passenger AirTable Record IDs']
    );
    expect(requestData.fields['Existing Diagnoses']).to.equal(
      trimmedRequest['Existing Diagnoses']
    );
    expect(requestData.fields['Total Nautical Miles']).to.equal(
      trimmedRequest['Total Nautical Miles']
    );
    expect(requestData.fields['# of Legs']).to.equal(trimmedRequest['# of Legs']);
    expect(requestData.fields['Total # of Legs']).to.equal(
      trimmedRequest['Total # of Legs']
    );
    expect(requestData.fields['Request ID']).to.equal(
      trimmedRequest['Request ID']
    );
  });

  it('should properly trim flight leg', () => {
    const legData: FlightLegData = createTestFlightLegData();
    const trimmedLeg: TrimmedFlightLeg = trimFlightLeg(legData);
    expect(legData.id).to.equal(trimmedLeg.id);
    expect(legData.createdTime).to.equal(trimmedLeg.createdTime);
    expect(legData.fields.Status).to.equal(trimmedLeg.Status);
    expect(legData.fields.Airline).to.equal(trimmedLeg.Airline);
    expect(legData.fields['Departure Date/Time']).to.equal(
      trimmedLeg['Departure Date/Time']
    );
    expect(legData.fields['Arrival Date/Time']).to.equal(
      trimmedLeg['Arrival Date/Time']
    );
    expect(legData.fields['Nautical Miles']).to.equal(
      trimmedLeg['Nautical Miles']
    );
    expect(legData.fields.Passengers).to.equal(trimmedLeg.Passengers);
    expect(legData.fields['Departure Airport']).to.equal(
      trimmedLeg['Departure Airport']
    );
    expect(legData.fields['Arrival Airport']).to.equal(
      trimmedLeg['Arrival Airport']
    );
    expect(legData.fields['Leg ID']).to.equal(trimmedLeg['Leg ID']);
    expect(legData.fields['Leg Type']).to.equal(trimmedLeg['Leg Type']);
    expect(legData.fields['Total Miles']).to.equal(trimmedLeg['Total Miles']);
    expect(legData.fields['Passenger Names']).to.equal(
      trimmedLeg['Passenger Names']
    );
    expect(legData.fields['Total Cost']).to.equal(trimmedLeg['Total Cost']);
    expect(legData.fields['AirTable Record ID']).to.equal(
      trimmedLeg['AirTable Record ID']
    );
    expect(legData.fields['Request AirTable Record ID']).to.equal(
      trimmedLeg['Request AirTable Record ID']
    );
    expect(legData.fields['Passenger AirTable Record IDs']).to.equal(
      trimmedLeg['Passenger AirTable Record IDs']
    );
    expect(legData.fields['Log Airline Credit'].label).to.equal(
      trimmedLeg['Log Airline Credit'].label
    );
    expect(legData.fields['Log Airline Credit'].url).to.equal(
      trimmedLeg['Log Airline Credit'].url
    );
    expect(legData.fields['Patient Name']).to.equal(trimmedLeg['Patient Name']);
    expect(legData.fields['Patient Latest Trip']).to.equal(
      trimmedLeg['Patient Latest Trip']
    );
    expect(legData.fields['Is Latest Trip']).to.equal(
      trimmedLeg['Is Latest Trip']
    );
  });

  it('should properly trim passenger', () => {
    const passengerData: PassengerData = createTestPassengerData();
    const trimmedPassenger: TrimmedPassenger = trimPassenger(passengerData);
    expect(passengerData.id).to.equal(trimmedPassenger.id);
    expect(passengerData.createdTime).to.equal(trimmedPassenger.createdTime);
    expect(passengerData.fields.Type).to.equal(trimmedPassenger.Type);
    expect(passengerData.fields['First Name']).to.equal(
      trimmedPassenger['First Name']
    );
    expect(passengerData.fields['Last Name']).to.equal(
      trimmedPassenger['Last Name']
    );
    expect(passengerData.fields['Date of Birth']).to.equal(
      trimmedPassenger['Date of Birth']
    );
    expect(passengerData.fields.Gender).to.equal(trimmedPassenger.Gender);
    expect(passengerData.fields.Street).to.equal(trimmedPassenger.Street);
    expect(passengerData.fields.Country).to.equal(trimmedPassenger.Country);
    expect(passengerData.fields.Email).to.equal(trimmedPassenger.Email);
    expect(passengerData.fields['Household Income']).to.equal(
      trimmedPassenger['Household Income']
    );
    expect(passengerData.fields['Household Size']).to.equal(
      trimmedPassenger['Household Size']
    );
    expect(passengerData.fields.Ethnicity).to.equal(trimmedPassenger.Ethnicity);
    expect(passengerData.fields['Military Service']).to.equal(
      trimmedPassenger['Military Service']
    );
    expect(passengerData.fields['Military Member']).to.equal(
      trimmedPassenger['Military Member']
    );
    expect(passengerData.fields['How did you hear about us']).to.equal(
      trimmedPassenger['How did you hear about us']
    );
    expect(passengerData.fields['All Flight Legs']).to.equal(
      trimmedPassenger['All Flight Legs']
    );
    expect(passengerData.fields.Diagnosis).to.equal(trimmedPassenger.Diagnosis);
    expect(passengerData.fields['AirTable Record ID']).to.equal(
      trimmedPassenger['AirTable Record ID']
    );
    expect(passengerData.fields['# of Flight Legs']).to.equal(
      trimmedPassenger['# of Flight Legs']
    );
    expect(passengerData.fields['# of Booked Flight Requests']).to.equal(
      trimmedPassenger['# of Booked Flight Requests']
    );
    expect(passengerData.fields['Birth Month']).to.equal(
      trimmedPassenger['Birth Month']
    );
    expect(passengerData.fields['Full Name']).to.equal(
      trimmedPassenger['Full Name']
    );
    expect(passengerData.fields.Age).to.equal(trimmedPassenger.Age);
    expect(passengerData.fields['Latest Trip']).to.equal(
      trimmedPassenger['Latest Trip']
    );
  });
});
