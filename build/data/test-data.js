"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestFlightRequestData = exports.createTestFlightLegData = exports.createTestPassengerData = void 0;
const constants_1 = require("./constants");
const faker_1 = require("@faker-js/faker");
/**
 * Creates a test passenger data object with random data
 *
 * @param manualData - Optional data to override the random data
 * @returns A test passenger data object
 */
const createTestPassengerData = (manualData = {}) => {
    const firstName = faker_1.faker.person.firstName();
    const lastName = faker_1.faker.person.lastName();
    const birthday = faker_1.faker.date.past().toISOString();
    const getPreviousDay = (isoDate) => new Date(new Date(isoDate).getTime() - 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
    return Object.assign({ id: faker_1.faker.string.uuid(), createdTime: faker_1.faker.date.recent().toISOString(), fields: Object.assign({ Type: faker_1.faker.helpers.arrayElement([
                'Patient',
                'Accompanying Passenger',
                'Partner Organization',
            ]), 'First Name': firstName, 'Last Name': lastName, 'Date of Birth': birthday, Gender: faker_1.faker.helpers.arrayElement(['Female', 'Male']), Street: faker_1.faker.location.streetAddress(), Country: faker_1.faker.location.country(), Email: faker_1.faker.internet.email({
                firstName: firstName,
                lastName: lastName,
            }), 'Household Income': faker_1.faker.number.int({
                min: 5000,
                max: 400000,
            }), 'Household Size': faker_1.faker.number.int({
                min: 1,
                max: 8,
            }), Ethnicity: faker_1.faker.helpers.arrayElements([
                'American Indian or Alaska Native',
                'Asian',
                'Black or African American',
                'Hispanic or Latino',
                'Native Hawaiian or Other Pacific Islander',
                'White',
                'Other',
            ], faker_1.faker.number.int({
                min: 1,
                max: 5,
            })), 'Military Service': faker_1.faker.helpers.arrayElement([
                'Active',
                'Veteran',
                'Not Applicable',
            ]), 'Military Member': faker_1.faker.helpers.arrayElements(['Self', 'Spouse', 'Mother', 'Father', 'Other'], faker_1.faker.number.int({
                min: 0,
                max: 3,
            })), 'How did you hear about us': faker_1.faker.helpers.arrayElements(['Social Media', 'Internet Search', 'Friend or Family', 'Other'], faker_1.faker.number.int({
                min: 1,
                max: 1,
            })), 'BL - Account Number': faker_1.faker.finance.accountNumber(), 'All Flight Legs': faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
                min: 1,
                max: 3,
            })), Diagnosis: faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
                min: 1,
                max: 3,
            })), 'Treatment Site Totals 2': [], 'Passenger ID': faker_1.faker.string.uuid(), 'AirTable Record ID': faker_1.faker.string.uuid(), '# of Flight Legs': faker_1.faker.number.int({
                min: 1,
                max: 10,
            }), '# of Booked Flight Requests (Patient)': faker_1.faker.number.int({
                min: 1,
                max: 3,
            }), '# of Booked Flight Requests (Pass 2)': faker_1.faker.number.int({
                min: 1,
                max: 3,
            }), '# of Booked Flight Requests (Pass 3)': faker_1.faker.number.int({
                min: 1,
                max: 3,
            }), '# of Booked Flight Requests (Accompanying)': faker_1.faker.number.int({
                min: 1,
                max: 3,
            }), '# of Booked Flight Requests': faker_1.faker.number.int({
                min: 1,
                max: 10,
            }), 'Departure Date/Time (from All Flight Legs)': faker_1.faker.helpers.arrayElements([
                faker_1.faker.date.recent().toISOString(),
                faker_1.faker.date.recent().toISOString(),
                faker_1.faker.date.recent().toISOString(),
            ], faker_1.faker.number.int({
                min: 1,
                max: 3,
            })), 'Name (from Treatment Site Totals 2)': [], 'Name (from Treatment Site Totals 2) 2': [], 'PUR (from All Flight Legs)': faker_1.faker.helpers.arrayElements([
                faker_1.faker.number.int({
                    min: 1,
                    max: 10000,
                }),
                faker_1.faker.number.int({
                    min: 1,
                    max: 10000,
                }),
                faker_1.faker.number.int({
                    min: 1,
                    max: 10000,
                }),
            ], faker_1.faker.number.int({
                min: 1,
                max: 3,
            })), 'Birth Month': faker_1.faker.date.month(), 'Full Name': `${firstName} ${lastName}`, 'Passenger Names (from All Flight Legs)': faker_1.faker.helpers.arrayElements([
                `${faker_1.faker.person.firstName()} ${faker_1.faker.person.lastName()}`,
                `${faker_1.faker.person.firstName()} ${faker_1.faker.person.lastName()}`,
                `${faker_1.faker.person.firstName()} ${faker_1.faker.person.lastName()}`,
            ], faker_1.faker.number.int({
                min: 1,
                max: 3,
            })), '# of Accompanying Passengers': faker_1.faker.number.int({
                min: 1,
                max: 3,
            }), Age: faker_1.faker.number.int({
                min: 1,
                max: 80,
            }), Birthday: birthday, 'Day Before Birthday': getPreviousDay(birthday), 'BL - Site 1 (from All Flight Legs)': faker_1.faker.helpers.arrayElements([faker_1.faker.company.name(), faker_1.faker.company.name(), faker_1.faker.company.name()], faker_1.faker.number.int({
                min: 1,
                max: 3,
            })), Created: faker_1.faker.date.recent().toISOString(), 'Latest Trip': faker_1.faker.date.recent().toISOString(), 'TS City, State (from Treatment Site Totals 2)': [] }, manualData.fields) }, manualData);
};
exports.createTestPassengerData = createTestPassengerData;
/**
 * Creates a test flight leg data object with random data
 *
 * @param manualData - Optional data to override the random data
 * @returns A test flight leg data object
 */
const createTestFlightLegData = (manualData = {}) => (Object.assign({ id: faker_1.faker.string.uuid(), createdTime: faker_1.faker.date.recent().toISOString(), fields: Object.assign({ Status: faker_1.faker.helpers.arrayElement([
            'Pending',
            'Booked',
            'Rescheduled',
            'Rebooked',
            'Canceled',
            'Did Not Fly',
        ]), Airline: faker_1.faker.helpers.arrayElement(constants_1.AIRLINES), 'BL - Departure Airport': faker_1.faker.location.city(), 'Departure Date/Time': faker_1.faker.date.anytime().toString(), 'BL - Arrival Airport': faker_1.faker.location.city(), 'Arrival Date/Time': faker_1.faker.date.recent().toISOString(), 'Nautical Miles': faker_1.faker.number.int({
            min: 200,
            max: 10000,
        }), PUR: faker_1.faker.number.int({
            min: 1,
            max: 10000,
        }), 'BL - # of PAX': faker_1.faker.number.int({
            min: 1,
            max: 100,
        }), 'BL - Treatment Type': faker_1.faker.helpers.arrayElement([
            'Chemotherapy',
            'Radiation',
            'Surgery',
            'Clinical Trial',
            'Other',
        ]), 'BL - Site 1': faker_1.faker.company.name(), Passengers: faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Departure Airport': faker_1.faker.string.alpha(3).toLocaleUpperCase(), 'Arrival Airport': faker_1.faker.string.alpha(3).toLocaleUpperCase(), 'BL - Site 1 Links': faker_1.faker.helpers.arrayElements([faker_1.faker.internet.url(), faker_1.faker.internet.url(), faker_1.faker.internet.url()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Leg ID': faker_1.faker.string.uuid(), '# of Linked PAX': faker_1.faker.number.int({
            min: 1,
            max: 3,
        }), 'Leg Type': faker_1.faker.helpers.arrayElement(['Departure', 'Connecting', 'Return']), '# of PAX': faker_1.faker.number.int({
            min: 1,
            max: 3,
        }), 'Total Miles': faker_1.faker.number.int({
            min: 200,
            max: 10000,
        }), 'Passenger Names': faker_1.faker.helpers.arrayElements([
            `${faker_1.faker.person.firstName()} ${faker_1.faker.person.lastName()}`,
            `${faker_1.faker.person.firstName()} ${faker_1.faker.person.lastName()}`,
            `${faker_1.faker.person.firstName()} ${faker_1.faker.person.lastName()}`,
        ], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Total Cost': faker_1.faker.number.int({
            min: 100,
            max: 2000,
        }), 'Cost per PAX': faker_1.faker.number.int({
            min: 1,
            max: 10000,
        }), 'AirTable Record ID': faker_1.faker.string.uuid(), 'Request AirTable Record ID': faker_1.faker.helpers.arrayElements(['request1', 'request2', 'request3', 'request4', 'request5'], faker_1.faker.number.int({
            min: 1,
            max: 1,
        })), 'Passenger AirTable Record IDs': faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Log Airline Credit': {
            label: faker_1.faker.company.name(),
            url: faker_1.faker.internet.url(),
        }, 'Creation Date': faker_1.faker.date.recent().toISOString(), 'Patient Name': faker_1.faker.helpers.arrayElements([
            `${faker_1.faker.person.firstName()} ${faker_1.faker.person.lastName()}`,
            `${faker_1.faker.person.firstName()} ${faker_1.faker.person.lastName()}`,
            `${faker_1.faker.person.firstName()} ${faker_1.faker.person.lastName()}`,
        ], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'State (from Passengers)': faker_1.faker.helpers.arrayElements([faker_1.faker.location.state(), faker_1.faker.location.state(), faker_1.faker.location.state()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'State (from Departure Airport)': faker_1.faker.helpers.arrayElements([faker_1.faker.location.state(), faker_1.faker.location.state(), faker_1.faker.location.state()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'State (from Arrival Airport)': faker_1.faker.helpers.arrayElements([faker_1.faker.location.state(), faker_1.faker.location.state(), faker_1.faker.location.state()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'State (from Passengers) 2': faker_1.faker.helpers.arrayElements([faker_1.faker.location.state(), faker_1.faker.location.state(), faker_1.faker.location.state()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'State (from Departure Airport) 2': faker_1.faker.helpers.arrayElements([faker_1.faker.location.state(), faker_1.faker.location.state(), faker_1.faker.location.state()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Date of Birth (from Passengers)': faker_1.faker.helpers.arrayElements([
            faker_1.faker.date.past().toISOString(),
            faker_1.faker.date.past().toISOString(),
            faker_1.faker.date.past().toISOString(),
        ], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Patient Latest Trip': faker_1.faker.helpers.arrayElements([
            faker_1.faker.date.past().toISOString(),
            faker_1.faker.date.past().toISOString(),
            faker_1.faker.date.past().toISOString(),
        ], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Is Latest Trip': faker_1.faker.helpers.arrayElement(['Yes', 'No']), 'Home Phone (from Passengers)': faker_1.faker.helpers.arrayElements([faker_1.faker.phone.number(), faker_1.faker.phone.number(), faker_1.faker.phone.number()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Street (from Passengers)': faker_1.faker.helpers.arrayElements([
            faker_1.faker.location.streetAddress(),
            faker_1.faker.location.streetAddress(),
            faker_1.faker.location.streetAddress(),
        ], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), City: faker_1.faker.helpers.arrayElements([faker_1.faker.location.city(), faker_1.faker.location.city(), faker_1.faker.location.city()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'State (from Passengers) 3': faker_1.faker.helpers.arrayElements([faker_1.faker.location.state(), faker_1.faker.location.state(), faker_1.faker.location.state()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Zip (from Passengers)': faker_1.faker.helpers.arrayElements([
            faker_1.faker.location.zipCode(),
            faker_1.faker.location.zipCode(),
            faker_1.faker.location.zipCode(),
        ], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Diagnosis (from Passengers)': faker_1.faker.helpers.arrayElements([faker_1.faker.lorem.sentence(), faker_1.faker.lorem.sentence(), faker_1.faker.lorem.sentence()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Date of Birth (from Passengers) 2': faker_1.faker.helpers.arrayElements([
            faker_1.faker.date.past().toISOString(),
            faker_1.faker.date.past().toISOString(),
            faker_1.faker.date.past().toISOString(),
        ], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'TS City, State (from Treatment Site Totals 2) (from Passengers)': faker_1.faker.helpers.arrayElements([faker_1.faker.location.city(), faker_1.faker.location.city(), faker_1.faker.location.city()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), '48 Hours After Flight': faker_1.faker.helpers.arrayElement(['Yes', 'No']) }, manualData.fields) }, manualData));
exports.createTestFlightLegData = createTestFlightLegData;
/**
 * Creates a test flight request data object with random data
 *
 * @param manualData - Optional data to override the random data
 * @returns A test flight request data object
 */
const createTestFlightRequestData = (manualData = {}) => (Object.assign({ id: faker_1.faker.string.uuid(), createdTime: faker_1.faker.date.recent().toISOString(), fields: Object.assign({ 'Submission ID': faker_1.faker.string.uuid(), 'Trip Type': faker_1.faker.helpers.arrayElement(['One Way', 'Roundtrip']), 'Departure Date': faker_1.faker.date.future().toISOString().split('T')[0], 'Request Type': faker_1.faker.helpers.arrayElement([
            'Service Dog',
            'Service Dog Retrieval/Training',
            'Treatment',
            'Treatment - Clinical Trial',
            'Treatment - Surgery',
            'Treatment - Radiation',
            'Treatment - Chemotherapy',
            'Treatment - Other',
        ]), 'Household Size': faker_1.faker.number.int({
            min: 1,
            max: 8,
        }), 'Passenger 2 Approval Status': faker_1.faker.helpers.arrayElement([
            'Approved',
            'Denied',
            'Pending',
        ]), 'How did you hear about us?': faker_1.faker.helpers.arrayElement([
            'Local Physician',
            'Social Media',
            'Internet Search',
            'Friend or Family',
            'Other',
        ]), Diagnosis: faker_1.faker.lorem.sentence(), 'Passenger 3': faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Patient Type': faker_1.faker.helpers.arrayElement([
            'Patient',
            'Accompanying Passenger',
            'Partner Organization',
        ]), Ethnicity: faker_1.faker.helpers.arrayElements([
            'American Indian/Alaskan Native',
            'Asian',
            'Black',
            'Hispanic/Latino',
            'Native Hawaiian/Pacific Islander',
            'White',
            'Other',
        ], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Treatment City': faker_1.faker.location.city(), Education: faker_1.faker.helpers.arrayElement([
            'Less than high school degree',
            'High school degree or equivalent',
            'Some college, no degree',
            'Associate degree',
            "Bachelor's degree",
            'Graduate or professional degree',
        ]), 'Treatment Phone': faker_1.faker.phone.number(), 'Submission Date': faker_1.faker.date.recent().toISOString().split('T')[0], 'Alt Destination Airport': faker_1.faker.string.alpha(3).toLocaleUpperCase(), 'Primary Treatment Doctor': faker_1.faker.person.fullName(), 'Wheelchair?': faker_1.faker.helpers.arrayElement([
            'Yes, bringing own',
            'Yes, need to borrow',
            'No',
        ]), 'Flight Specialist': faker_1.faker.person.fullName(), 'Appt Date': faker_1.faker.date.future().toISOString().split('T')[0], 'Passenger 3 Approval Status': faker_1.faker.helpers.arrayElement([
            'Approved',
            'Denied',
            'Pending',
        ]), 'First Request': faker_1.faker.helpers.arrayElement(['Yes', 'No']), 'Type of Treatment': faker_1.faker.helpers.arrayElement([
            'Treatment',
            'Treatment - Clinical Trial',
            'Treatment - Surgery',
            'Treatment - Radiation',
            'Treatment - Chemotherapy',
            'Treatment - Other',
        ]), 'Passenger 3 Reason': faker_1.faker.lorem.sentence(), 'Military Member': faker_1.faker.helpers.arrayElement([
            'Self',
            'Spouse',
            'Mother',
            'Father',
            'Other',
        ]), 'Flight Legs': faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), Status: faker_1.faker.helpers.arrayElement([
            'Pending',
            'Booked',
            'Rescheduled',
            'Rebooked',
            'Canceled',
            'Did Not Fly',
        ]), 'Household Income': faker_1.faker.number.int({
            min: 5000,
            max: 400000,
        }), 'Sources of Income': faker_1.faker.lorem.sentence(), 'Oxygen?': faker_1.faker.helpers.arrayElement(['Yes', 'No']), 'Origin Airport': faker_1.faker.string.alpha(3).toLocaleUpperCase(), 'Treatment Fax': faker_1.faker.phone.number(), Employment: faker_1.faker.helpers.arrayElement([
            'Employed, working 40+ hours per week',
            'Employed, working 1-39 hours per week',
            'Unemployed, looking for work',
            'Unemployed, not looking for work',
            'Retired',
            'Student',
            'Homemaker',
            'Unable to work',
            'Other',
        ]), 'Martial Status': faker_1.faker.helpers.arrayElement([
            'Single',
            'Married',
            'Divorced',
            'Widowed',
        ]), 'Military Service': faker_1.faker.helpers.arrayElement([
            'Active',
            'Veteran',
            'Not Applicable',
        ]), 'Passenger 3 Different Return': faker_1.faker.helpers.arrayElement(['Yes', 'No']), Patient: faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Passenger 2': faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Return Date': faker_1.faker.date.future().toISOString().split('T')[0], 'Treatment Site': faker_1.faker.company.name(), 'Treatment State': faker_1.faker.location.streetAddress(), 'Passenger 3 Return Date': faker_1.faker.date.future().toISOString().split('T')[0], 'Patient Age': faker_1.faker.number.int({
            min: 1,
            max: 80,
        }), 'Passenger 2 Different Return': faker_1.faker.helpers.arrayElement(['Yes', 'No']), 'Destination Airport': faker_1.faker.string.alpha(3).toLocaleUpperCase(), 'Alt. Origin Airport': faker_1.faker.string.alpha(3).toLocaleUpperCase(), 'AirTable Record ID': faker_1.faker.string.uuid(), 'Patient AirTable Record ID': faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Passenger 2 AirTable Record ID': faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Passenger 3 AirTable Record ID': faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Passenger AirTable Record IDs': faker_1.faker.helpers.arrayElements([faker_1.faker.string.uuid(), faker_1.faker.string.uuid(), faker_1.faker.string.uuid()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Add a Flight Leg': {
            label: faker_1.faker.company.name(),
            url: faker_1.faker.internet.url(),
        }, 'Existing Diagnoses': faker_1.faker.helpers.arrayElements([faker_1.faker.lorem.sentence(), faker_1.faker.lorem.sentence(), faker_1.faker.lorem.sentence()], faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'Total Nautical Miles': faker_1.faker.number.int({
            min: 200,
            max: 10000,
        }), 'Total PUR': faker_1.faker.number.int({
            min: 1,
            max: 10000,
        }), 'Total GIK': faker_1.faker.number.int({
            min: 1,
            max: 10000,
        }), 'Total Cost': faker_1.faker.number.int({
            min: 1,
            max: 10000,
        }), '# of Legs': faker_1.faker.number.int({
            min: 1,
            max: 10,
        }), 'Per Leg Total': faker_1.faker.number.int({
            min: 1,
            max: 10000,
        }), 'Per Leg PUR': faker_1.faker.number.int({
            min: 1,
            max: 10000,
        }), 'Per Leg GIK': faker_1.faker.number.int({
            min: 1,
            max: 10000,
        }), 'Total # of PAX': faker_1.faker.number.int({
            min: 1,
            max: 10,
        }), 'Total # of Legs': faker_1.faker.number.int({
            min: 1,
            max: 10,
        }), 'Patient First Name': faker_1.faker.person.firstName(), 'Patient Last Name': faker_1.faker.person.lastName(), 'Patient Name': faker_1.faker.person.fullName(), Airline: faker_1.faker.helpers.arrayElements(constants_1.AIRLINES, faker_1.faker.number.int({
            min: 1,
            max: 3,
        })), 'T-Minus Blacklane Email': faker_1.faker.date.future().toISOString().split('T')[0], '48 Hours After Booked': faker_1.faker.date.future().toISOString().split('T')[0], 'Request ID': faker_1.faker.string.uuid(), Email: faker_1.faker.internet.email() }, manualData.fields) }, manualData));
exports.createTestFlightRequestData = createTestFlightRequestData;
