export interface FlightLegData {
    id: string;
    createdTime: string;
    fields: {
      Status: string;
      Airline: string;
      "BL - Departure Airport": string;
      "Departure Date/Time": string;
      "BL - Arrival Airport": string;
      "Arrival Date/Time": string;
      "Nautical Miles": number;
      PUR: number;
      "BL - # of PAX": number;
      "BL - Treatment Type": string;
      "BL - Site 1": string;
      Passengers: string[];
      "Departure Airport": string;
      "Arrival Airport": string;
      "BL - Site 1 Links": string[];
      "Leg ID": string;
      "Leg Type": string;
      "# of Linked PAX": number;
      "# of PAX": number;
      "Total Miles": number;
      "Passenger Names": string | string[];
      "Total Cost": number;
      "Cost per PAX": number;
      "AirTable Record ID": string;
      "Request AirTable Record ID": string[];
      "Passenger AirTable Record IDs": string | string[];
      "Log Airline Credit": {
        label: string;
        url: string;
      };
      "Creation Date": string;
      "Patient Name": string[];
      "State (from Passengers)": string[];
      "State (from Departure Airport)": string[];
      "State (from Arrival Airport)": string[];
      "State (from Passengers) 2": string[];
      "State (from Departure Airport) 2": string[];
      "Date of Birth (from Passengers)": string[];
      "Patient Latest Trip": string[];
      "Is Latest Trip": string;
      "Home Phone (from Passengers)": string[];
      "Street (from Passengers)": string[];
      City: string[];
      "State (from Passengers) 3": string[];
      "Zip (from Passengers)": string[];
      "Diagnosis (from Passengers)": string[];
      "Date of Birth (from Passengers) 2": string[];
      "TS City, State (from Treatment Site Totals 2) (from Passengers)": string[];
      "48 Hours After Flight": string;
    };
  }
  