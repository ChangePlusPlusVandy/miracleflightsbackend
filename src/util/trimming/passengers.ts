import type { PassengerData } from '../../interfaces/passenger/passenger.interface';
import type { TrimmedPassenger } from '../../interfaces/passenger/trimmed-passenger.interface';

export const trimPassenger = (passenger: PassengerData): TrimmedPassenger => {
  const { id, createdTime, fields } = passenger;

  const {
    Type,
    Gender,
    Street,
    City,
    Country,
    Email,
    Ethnicity,
    Diagnosis,
    Age,
  } = fields;

  const trimmedPassenger: TrimmedPassenger = {
    id: id,
    createdTime: createdTime,
    Type: Type,
    'First Name': fields['First Name'],
    'Last Name': fields['Last Name'],
    'Date of Birth': fields['Date of Birth'],
    Gender: Gender,
    Street: Street,
    City: City,
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
    'Passenger Names (from All Flight Legs)':
      fields['Passenger Names (from All Flight Legs)'],
    Age: Age,
    'Latest Trip': fields['Latest Trip'],
    'Cell Phone': fields['Cell Phone'],
    'Home Phone': fields['Home Phone'],
    Education: fields['Education'],
    'Marital Status': fields['Marital Status'],
    Employment: fields['Employment'],
  };

  return trimmedPassenger;
};
