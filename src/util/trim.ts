import type { FlightLegData } from '../interfaces/legs/flight-leg.interface';
import type { TrimmedFlightLeg } from '../interfaces/legs/trimmed-flight-leg.interface';
import type { PassengerData } from '../interfaces/passenger/passenger.interface';
import type { TrimmedPassenger } from '../interfaces/passenger/trimmed-passenger.interface';
import type { FlightRequestData } from '../interfaces/requests/flight-request.interface';
import type { TrimmedFlightRequest } from '../interfaces/requests/trimmed-flight-request.interface';

export const trimPassenger = (passenger: PassengerData): TrimmedPassenger => {
  const { id, createdTime, fields } = passenger;

  const { Type, Gender, Street, Country, Email, Ethnicity, Diagnosis, Age } =
    fields;

  const trimmedPassenger: TrimmedPassenger = {
    id: id,
    createdTime: createdTime,
    Type: Type,
    Relationship: fields['Relationship'],
    'First Name': fields['First Name'],
    'Last Name': fields['Last Name'],
    'Date of Birth': fields['Date of Birth'],
    Gender: Gender,
    Street: Street,
    Country: Country,
    Email: Email,
    'Household Income': fields['Household Income'],
    'Household Size': fields['Household Size'],
    Ethnicity: Ethnicity,
    'Military Service': fields['Military Service'],
    'Military Member': fields['Military Member'],
    'How did you hear about us': fields['How did you hear about us'],
    'All Flight Legs': fields['All Flight Legs'],
    Diagnosis: Diagnosis,
    'AirTable Record ID': fields['AirTable Record ID'],
    '# of Flight Legs': fields['# of Flight Legs'],
    '# of Booked Flight Requests': fields['# of Booked Flight Requests'],
    'Birth Month': fields['Birth Month'],
    'Full Name': fields['Full Name'],
    Age: Age,
    'Latest Trip': fields['Latest Trip'],
    string: undefined,
  };

  return trimmedPassenger;
};

export const trimRequest = (request: FlightRequestData): TrimmedFlightRequest => {
  const { id, createdTime, fields } = request;

  const { Diagnosis, Ethnicity, Education, Status, Patient } = fields;

  const trimmedRequest: TrimmedFlightRequest = {
    id: id,
    createdTime: createdTime,
    'Submission ID': fields['Submission ID'],
    'Trip Type': fields['Trip Type'],
    'Departure Date': fields['Departure Date'],
    'Request Type': fields['Request Type'],
    'Household Size': fields['Household Size'],
    'Passenger 2 Approval Status': fields['Passenger 2 Approval Status'],
    Diagnosis: Diagnosis,
    'Passenger 3': fields['Passenger 3'],
    'Patient Type': fields['Patient Type'],
    Ethnicity: Ethnicity,
    'Treatment City': fields['Treatment City'],
    Education: Education,
    'Treatment Phone': fields['Treatment Phone'],
    'Submission Date': fields['Submission Date'],
    'Alt Destination Airport': fields['Alt Destination Airport'],
    'Primary Treatment Doctor': fields['Primary Treatment Doctor'],
    'Wheelchair?': fields['Wheelchair?'],
    'Flight Specialist': fields['Flight Specialist'],
    'Appt Date': fields['Appt Date'],
    'Passenger 3 Approval Status': fields['Passenger 3 Approval Status'],
    'First Request': fields['First Request'],
    'Type of Treatment': fields['Type of Treatment'],
    'Passenger 3 Reason': fields['Passenger 3 Reason'],
    'Flight Legs': fields['Flight Legs'],
    Status: Status,
    'Oxygen?': fields['Oxygen?'],
    'Origin Airport': fields['Origin Airport'],
    'Treatment Fax': fields['Treatment Fax'],
    'Passenger 3 Different Return': fields['Passenger 3 Different Return'],
    Patient: Patient,
    'Passenger 2': fields['Passenger 2'],
    'Return Date': fields['Return Date'],
    'Treatment Site': fields['Treatment Site'],
    'Treatment State': fields['Treatment State'],
    'Passenger 3 Return Date': fields['Passenger 3 Return Date'],
    'Patient Age': fields['Patient Age'],
    'Passenger 2 Different Return': fields['Passenger 2 Different Return'],
    'Destination Airport': fields['Destination Airport'],
    'Alt. Origin Airport': fields['Alt. Origin Airport'],
    'AirTable Record ID': fields['AirTable Record ID'],
    'Patient AirTable Record ID': fields['Patient AirTable Record ID'],
    'Passenger 2 AirTable Record ID': fields['Passenger 2 AirTable Record ID'],
    'Passenger 3 AirTable Record ID': fields['Passenger 3 AirTable Record ID'],
    'Passenger AirTable Record IDs': fields['Passenger AirTable Record IDs'],
    'Existing Diagnoses': fields['Existing Diagnoses'],
    'Total Nautical Miles': fields['Total Nautical Miles'],
    '# of Legs': fields['# of Legs'],
    'Total # of Legs': fields['Total # of Legs'],
    'Request ID': fields['Request ID'],
  };

  return trimmedRequest;
};

export const trimFlightLeg = (request: FlightLegData): TrimmedFlightLeg => {
  const { id, createdTime, fields } = request;

  const { Status, Airline, Passengers } = fields;

  const trimmedLeg: TrimmedFlightLeg = {
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
