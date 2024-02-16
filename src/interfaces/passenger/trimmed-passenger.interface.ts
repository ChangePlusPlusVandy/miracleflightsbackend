export interface TrimmedPassenger {
  id: string;
  createdTime: string;
  Type: string;
  'First Name': string;
  'Last Name': string;
  'Date of Birth': string;
  Gender: string;
  Relationship?: string;
  Street: string;
  City: string;
  Country: string;
  Email: string;
  'Household Income': number;
  'Household Size': number;
  Ethnicity: string[];
  'Military Service': string;
  'Military Member': string[];
  'How did you hear about us': string[];
  'All Flight Legs': string[];
  Diagnosis: string[];
  'AirTable Record ID': string;
  '# of Flight Legs': number;
  '# of Booked Flight Requests': number;
  'Birth Month': string;
  'Full Name': string;
  Age: number;
  'Latest Trip': string;
}
