"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimPassenger = void 0;
const trimPassenger = (passenger) => {
    const { id, createdTime, fields } = passenger;
    const { Type, Gender, Street, Country, Email, Ethnicity, Diagnosis, Age } = fields;
    const trimmedPassenger = {
        id: id,
        createdTime: createdTime,
        Type: Type,
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
    };
    return trimmedPassenger;
};
exports.trimPassenger = trimPassenger;
