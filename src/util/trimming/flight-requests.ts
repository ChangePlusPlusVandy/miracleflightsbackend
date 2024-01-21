import type { FlightRequestData } from '../../interfaces/requests/flight-request.interface';
import type { TrimmedFlightRequest } from '../../interfaces/requests/trimmed-flight-request.interface';

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