export interface FlightRequestData {
  id: string;
  createdTime: string;
  fields: {
    'Submission ID': string;
    'Trip Type': string;
    'Departure Date': string;
    'Request Type': string;
    'Household Size': number;
    'Passenger 2 Approval Status': string;
    'How did you hear about us?': string;
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
    'Military Member': string;
    'Flight Legs': string[];
    Status: string;
    'Household Income': number;
    'Sources of Income': string;
    'Oxygen?': string;
    'Origin Airport': string;
    'Treatment Fax': string;
    Employment: string;
    'Martial Status': string;
    'Military Service': string;
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
    'Add a Flight Leg': {
      label: string;
      url: string;
    };
    'Existing Diagnoses': string[];
    'Total Nautical Miles': number;
    'Total PUR': number;
    'Total GIK': number;
    'Total Cost': number;
    '# of Legs': number;
    'Per Leg Total': {
      specialValue: string;
    };
    'Per Leg PUR': {
      specialValue: string;
    };
    'Per Leg GIK': {
      specialValue: string;
    };
    'Total # of PAX': number;
    'Total # of Legs': number;
    'Patient First Name': string[];
    'Patient Last Name': string[];
    'Patient Name': string;
    Airline: string[];
    'T-Minus Blacklane Email': {
      specialValue: string;
    };
    '48 Hours After Booked': {
      error: string;
    };
    'Request ID': string;
    Email: string[];
  };
  'Treatment Site Verification': string;
}
