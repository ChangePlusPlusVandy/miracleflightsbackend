export interface PassengerData {
    id: string;
    createdTime: string;
    fields: {
      Type: string;
      "First Name": string;
      "Last Name": string;
      "Date of Birth": string;
      Gender: string;
      Street: string;
      Country: string;
      Email: string;
      "Household Income": number;
      "Household Size": number;
      Ethnicity: string[];
      "Military Service": string;
      "Military Member": string[];
      "How did you hear about us": string[];
      "BL - Account Number": string;
      "All Flight Legs": string[];
      Diagnosis: string[];
      "Treatment Site Totals 2": string[];
      "Passenger ID": string;
      "AirTable Record ID": string;
      "# of Flight Legs": number;
      "# of Booked Flight Requests (Patient)": number;
      "# of Booked Flight Requests (Pass 2)": number;
      "# of Booked Flight Requests (Pass 3)": number;
      "# of Booked Flight Requests (Accompanying)": number;
      "# of Booked Flight Requests": number;
      "Departure Date/Time (from All Flight Legs)": string[];
      "Name (from Treatment Site Totals 2)": string[];
      "Name (from Treatment Site Totals 2) 2": string[];
      "PUR (from All Flight Legs)": number[];
      "Birth Month": string;
      "Full Name": string;
      "Passenger Names (from All Flight Legs)": string[];
      "# of Accompanying Passengers": number;
      Age: number;
      Birthday: string;
      "Day Before Birthday": string;
      "BL - Site 1 (from All Flight Legs)": string[];
      Created: string;
      "Latest Trip": string;
      "TS City, State (from Treatment Site Totals 2)": string[];
    };
  }
  