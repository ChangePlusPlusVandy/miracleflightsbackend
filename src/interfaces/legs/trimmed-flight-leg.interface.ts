export interface TrimmedFlightLeg {
  id: string;
  createdTime: string;
  Status: string;
  Airline: string;
  'Departure Date/Time': string;
  'Arrival Date/Time': string;
  'Nautical Miles': number;
  Passengers: string[];
  'Departure Airport': string;
  'Arrival Airport': string;
  'Leg ID': string;
  'Leg Type': string;
  'Total Miles': number;
  'Passenger Names': string | string[];
  'Total Cost': number;
  'AirTable Record ID': string;
  'Request AirTable Record ID': string[];
  'Passenger AirTable Record IDs': string | string[];
  'Log Airline Credit': {
    label: string;
    url: string;
  };
  'Patient Name': string[];
  'Patient Latest Trip': string[];
  'Is Latest Trip': string;
  'Treatment Site Verification': string;
}
