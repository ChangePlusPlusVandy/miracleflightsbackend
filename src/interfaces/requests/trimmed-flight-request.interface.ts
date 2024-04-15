export interface TrimmedFlightRequest {
  id: string;
  createdTime: string;
  'Submission ID': string;
  'Trip Type': string;
  'Departure Date': string;
  'Request Type': string;
  'Household Size': number;
  'Passenger 2 Approval Status': string;
  Diagnoses: string;
  'Passenger 3': string[];
  'Patient Type': string;
  Ethnicity: string[];
  'Treatment City': string;
  Education: string;
  'Treatment Phone': string;
  'Submission Date': string;
  'Alt Destination Airport': string;
  'Primary Treatment Doctor': string;
  'Wheelchair?': string;
  'Flight Specialist': string;
  'Appt Date': string;
  'Passenger 3 Approval Status': string;
  'First Request': string;
  'Type of Treatment': string;
  'Passenger 3 Reason': string;
  'Flight Legs': string[];
  Status: string;
  'Oxygen?': string;
  'Origin Airport': string;
  'Treatment Fax': string;
  'Passenger 3 Different Return': string;
  Patient: string[];
  'Passenger 2': string[];
  'Return Date': string;
  'Treatment Site': string;
  'Treatment State': string;
  'Passenger 3 Return Date': string;
  'Patient Age': number;
  'Passenger 2 Different Return': string;

  'Destination Airport': string;
  'Alt. Origin Airport': string;
  'AirTable Record ID': string;
  'Patient AirTable Record ID': string[];
  'Passenger 2 AirTable Record ID': string[];

  'Passenger 3 AirTable Record ID': string[];
  'Passenger AirTable Record IDs': string;

  'Existing Diagnoses': string[];
  'Total Nautical Miles': number;
  '# of Legs': number;
  'Total # of Legs': number;
  'Request ID': string;
}
