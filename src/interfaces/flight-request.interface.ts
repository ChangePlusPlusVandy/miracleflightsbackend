//   "id": "recp5zrIaW8EZhJtu",
//   "createdTime": "2022-12-08T16:44:40.000Z",
//   "fields": {
//       "Submission ID": "5463268988412119074",
//       "Trip Type": "Roundtrip",
//       "Departure Date": "2022-12-31",
//       "Request Type": "Service Dog Retrieval/Training",
//       "Household Size": 4,
//       "Passenger 2 Approval Status": "Approved",
//       "How did you hear about us?": "Local Physician",
//       "Diagnosis": "Dx",
//       "Passenger 3": [
//           "recSH24ZWh4UUd8iT"
//       ],
//       "Patient Type": "Child Patient",
//       "Ethnicity": [
//           "American Indian/Alaskan Native",
//           "Black",
//           "White"
//       ],
//       "Treatment City": "New York",
//       "Education": "Less than high school degree",
//       "Treatment Phone": "(999) 999-9999",
//       "Submission Date": "2022-12-08",
//       "Alt Destination Airport": "JFK",
//       "Primary Treatment Doctor": "Dr. Helps a Lot",
//       "Wheelchair?": "Yes, bringing own",
//       "Flight Specialist": "Robert",
//       "Appt Date": "2023-01-01",
//       "Passenger 3 Approval Status": "Approved",
//       "First Request": "No",
//       "Type of Treatment": "Treatment",
//       "Passenger 3 Reason": "Has to get back to school",
//       "Military Member": "Mother",
//       "Flight Legs": [
//           "rec0uwOR2O7cvLbDA"
//           "rec0uwOR2O7cvLbDB"
//           "rec0uwOR2O7cvLbDC"
//           "rec0uwOR2O7cvLbDD"
//       ],
//       "Status": "In Progress",
//       "Household Income": 20000,
//       "Sources of Income": "Sources of income",
//       "Oxygen?": "No",
//       "Origin Airport": "SEA",
//       "Treatment Fax": "(999) 999-9999",
//       "Employment": "Employed, working 40+ hours per week",
//       "Martial Status": "Widowed",
//       "Military Service": "Veteran",
//       "Passenger 3 Different Return": "Yes",
//       "Patient": [
//           "recV1y3bJr9eb2U5W"
//       ],
//       "Passenger 2": [
//           "recjkNdBSRe5JsUI7"
//       ],
//       "Return Date": "2023-01-05",
//       "Treatment Site": "Treatment Site goes here",
//       "Treatment State": "New York",
//       "Passenger 3 Return Date": "2023-01-03",
//       "Patient Age": 8,
//       "Passenger 2 Different Return": "No",
//       "Destination Airport": "JFK",
//       "Alt. Origin Airport": "SEA",
//       "AirTable Record ID": "recp5zrIaW8EZhJtu",
//       "Patient AirTable Record ID": [
//           "recV1y3bJr9eb2U5W"
//       ],
//       "Passenger 2 AirTable Record ID": [
//           "recjkNdBSRe5JsUI7"
//       ],
//       "Passenger 3 AirTable Record ID": [
//           "recSH24ZWh4UUd8iT"
//       ],
//       "Passenger AirTable Record IDs": "recV1y3bJr9eb2U5W,recjkNdBSRe5JsUI7,recSH24ZWh4UUd8iT",
//       "Add a Flight Leg": {
//           "label": "Add a Flight Leg",
//           "url": "https://airtable.com/shreSWYWSha7bTIp8?prefill_Flight+Request=recp5zrIaW8EZhJtu&prefill_Passengers=recV1y3bJr9eb2U5W%2CrecjkNdBSRe5JsUI7%2CrecSH24ZWh4UUd8iT"
//       },
//       "Existing Diagnoses": [
//           "Heart Disease",
//           "CV - Cardiovascular",
//           "Lung Disorder"
//       ],
//       "Total Nautical Miles": 0,
//       "Total PUR": 0,
//       "Total GIK": 0,
//       "Total Cost": 0,
//       "# of Legs": 0,
//       "Per Leg Total": {
//           "specialValue": "NaN"
//       },
//       "Per Leg PUR": {
//           "specialValue": "NaN"
//       },
//       "Per Leg GIK": {
//           "specialValue": "NaN"
//       },
//       "Total # of PAX": 3,
//       "Total # of Legs": 0,
//       "Patient First Name": [
//           "Stormie "
//       ],
//       "Patient Last Name": [
//           "Gilchrist"
//       ],
//       "Patient Name": "Stormie  Gilchrist",
//       "Airline": [
//           "AA - American Airlines"
//       ],
//       "T-Minus Blacklane Email": {
//           "specialValue": "NaN"
//       },
//       "48 Hours After Booked": {
//           "error": "#ERROR"
//       },
//       "Request ID": "2022-12-08 | In Progress | Gilchrist, Stormie | 2014-06-21",
//       "Email": [
//           "jessie@sidekicksolutionsllc.com"
//       ]
//   }

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
    Diagnosis: string;
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
}
