import { AIRLINES } from './constants';
import { faker } from '@faker-js/faker';
import type { FlightRequestData } from '../interfaces/requests/flight-request.interface';
import type { PassengerData } from '../interfaces/passenger/passenger.interface';
import type { FlightLegData } from '../interfaces/legs/flight-leg.interface';

/**
 * Creates a test passenger data object with random data
 *
 * @param manualData - Optional data to override the random data
 * @returns A test passenger data object
 */
export const createTestPassengerData = (
  manualData: Partial<PassengerData> = {}
): PassengerData => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const birthday = faker.date.past().toISOString();
  const getPreviousDay = (isoDate: string) =>
    new Date(new Date(isoDate).getTime() - 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

  return {
    id: faker.string.uuid(),
    createdTime: faker.date.recent().toISOString(),
    fields: {
      Type: faker.helpers.arrayElement([
        'Patient',
        'Accompanying Passenger',
        'Partner Organization',
      ]),
      'First Name': firstName,
      'Last Name': lastName,
      'Date of Birth': birthday,
      Gender: faker.helpers.arrayElement(['Female', 'Male']),
      Street: faker.location.streetAddress(),
      City: faker.location.city(),
      Country: faker.location.country(),
      Email: faker.internet.email({
        firstName: firstName,
        lastName: lastName,
      }),
      'Household Income': faker.number.int({
        min: 5000,
        max: 400000,
      }),
      'Household Size': faker.number.int({
        min: 1,
        max: 8,
      }),
      Ethnicity: faker.helpers.arrayElements(
        [
          'American Indian or Alaska Native',
          'Asian',
          'Black or African American',
          'Hispanic or Latino',
          'Native Hawaiian or Other Pacific Islander',
          'White',
          'Other',
        ],
        faker.number.int({
          min: 1,
          max: 5,
        })
      ),
      'Military Service': faker.helpers.arrayElement([
        'Active',
        'Veteran',
        'Not Applicable',
      ]),
      'Military Member': faker.helpers.arrayElements(
        ['Self', 'Spouse', 'Mother', 'Father', 'Other'],
        faker.number.int({
          min: 0,
          max: 3,
        })
      ),
      'How did you hear about us': faker.helpers.arrayElements(
        ['Social Media', 'Internet Search', 'Friend or Family', 'Other'],
        faker.number.int({
          min: 1,
          max: 1,
        })
      ),
      'BL - Account Number': faker.finance.accountNumber(),
      'All Flight Legs': faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      Diagnosis: faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Treatment Site Totals 2': [],
      'Passenger ID': faker.string.uuid(),
      'AirTable Record ID': faker.string.uuid(),
      '# of Flight Legs': faker.number.int({
        min: 1,
        max: 10,
      }),
      '# of Booked Flight Requests (Patient)': faker.number.int({
        min: 1,
        max: 3,
      }),
      '# of Booked Flight Requests (Pass 2)': faker.number.int({
        min: 1,
        max: 3,
      }),
      '# of Booked Flight Requests (Pass 3)': faker.number.int({
        min: 1,
        max: 3,
      }),
      '# of Booked Flight Requests (Accompanying)': faker.number.int({
        min: 1,
        max: 3,
      }),
      '# of Booked Flight Requests': faker.number.int({
        min: 1,
        max: 10,
      }),
      'Departure Date/Time (from All Flight Legs)': faker.helpers.arrayElements(
        [
          faker.date.recent().toISOString(),
          faker.date.recent().toISOString(),
          faker.date.recent().toISOString(),
        ],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Name (from Treatment Site Totals 2)': [],
      'Name (from Treatment Site Totals 2) 2': [],
      'PUR (from All Flight Legs)': faker.helpers.arrayElements<number>(
        [
          faker.number.int({
            min: 1,
            max: 10000,
          }),
          faker.number.int({
            min: 1,
            max: 10000,
          }),
          faker.number.int({
            min: 1,
            max: 10000,
          }),
        ],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Birth Month': faker.date.month(),
      'Full Name': `${firstName} ${lastName}`,
      'Passenger Names (from All Flight Legs)': faker.helpers.arrayElements(
        [
          `${faker.person.firstName()} ${faker.person.lastName()}`,
          `${faker.person.firstName()} ${faker.person.lastName()}`,
          `${faker.person.firstName()} ${faker.person.lastName()}`,
        ],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      '# of Accompanying Passengers': faker.number.int({
        min: 1,
        max: 3,
      }),
      Age: faker.number.int({
        min: 1,
        max: 80,
      }),
      Birthday: birthday,
      'Day Before Birthday': getPreviousDay(birthday),
      'BL - Site 1 (from All Flight Legs)': faker.helpers.arrayElements(
        [faker.company.name(), faker.company.name(), faker.company.name()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      Created: faker.date.recent().toISOString(),
      'Latest Trip': faker.date.recent().toISOString(),
      'TS City, State (from Treatment Site Totals 2)': [],
      ...manualData.fields,
    },
    ...manualData,
  };
};

/**
 * Creates a test flight leg data object with random data
 *
 * @param manualData - Optional data to override the random data
 * @returns A test flight leg data object
 */
export const createTestFlightLegData = (
  manualData: Partial<FlightLegData> = {}
) => ({
  id: faker.string.uuid(),
  createdTime: faker.date.recent().toISOString(),
  fields: {
    Status: faker.helpers.arrayElement([
      'Pending',
      'Booked',
      'Rescheduled',
      'Rebooked',
      'Canceled',
      'Did Not Fly',
    ]),
    Airline: faker.helpers.arrayElement(AIRLINES),
    'BL - Departure Airport': faker.location.city(),
    'Departure Date/Time': faker.date.anytime().toString(),
    'BL - Arrival Airport': faker.location.city(),
    'Arrival Date/Time': faker.date.recent().toISOString(),
    'Nautical Miles': faker.number.int({
      min: 200,
      max: 10000,
    }),
    PUR: faker.number.int({
      min: 1,
      max: 10000,
    }),
    'BL - # of PAX': faker.number.int({
      min: 1,
      max: 100,
    }),
    'BL - Treatment Type': faker.helpers.arrayElement([
      'Chemotherapy',
      'Radiation',
      'Surgery',
      'Clinical Trial',
      'Other',
    ]),
    'BL - Site 1': faker.company.name(),
    Passengers: faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Departure Airport': faker.string.alpha(3).toLocaleUpperCase(),
    'Arrival Airport': faker.string.alpha(3).toLocaleUpperCase(),
    'BL - Site 1 Links': faker.helpers.arrayElements(
      [faker.internet.url(), faker.internet.url(), faker.internet.url()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Leg ID': faker.string.uuid(),
    '# of Linked PAX': faker.number.int({
      min: 1,
      max: 3,
    }),
    'Leg Type': faker.helpers.arrayElement(['Departure', 'Connecting', 'Return']),
    '# of PAX': faker.number.int({
      min: 1,
      max: 3,
    }),
    'Total Miles': faker.number.int({
      min: 200,
      max: 10000,
    }),
    'Passenger Names': faker.helpers.arrayElements(
      [
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
      ],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Total Cost': faker.number.int({
      min: 100,
      max: 2000,
    }),
    'Cost per PAX': faker.number.int({
      min: 1,
      max: 10000,
    }),
    'AirTable Record ID': faker.string.uuid(),
    'Request AirTable Record ID': faker.helpers.arrayElements(
      ['request1', 'request2', 'request3', 'request4', 'request5'],
      faker.number.int({
        min: 1,
        max: 1,
      })
    ),
    'Passenger AirTable Record IDs': faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Log Airline Credit': {
      label: faker.company.name(),
      url: faker.internet.url(),
    },
    'Creation Date': faker.date.recent().toISOString(),
    'Patient Name': faker.helpers.arrayElements(
      [
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
        `${faker.person.firstName()} ${faker.person.lastName()}`,
      ],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'State (from Passengers)': faker.helpers.arrayElements(
      [faker.location.state(), faker.location.state(), faker.location.state()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'State (from Departure Airport)': faker.helpers.arrayElements(
      [faker.location.state(), faker.location.state(), faker.location.state()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'State (from Arrival Airport)': faker.helpers.arrayElements(
      [faker.location.state(), faker.location.state(), faker.location.state()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'State (from Passengers) 2': faker.helpers.arrayElements(
      [faker.location.state(), faker.location.state(), faker.location.state()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'State (from Departure Airport) 2': faker.helpers.arrayElements(
      [faker.location.state(), faker.location.state(), faker.location.state()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Date of Birth (from Passengers)': faker.helpers.arrayElements(
      [
        faker.date.past().toISOString(),
        faker.date.past().toISOString(),
        faker.date.past().toISOString(),
      ],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Patient Latest Trip': faker.helpers.arrayElements(
      [
        faker.date.past().toISOString(),
        faker.date.past().toISOString(),
        faker.date.past().toISOString(),
      ],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Is Latest Trip': faker.helpers.arrayElement(['Yes', 'No']),
    'Home Phone (from Passengers)': faker.helpers.arrayElements(
      [faker.phone.number(), faker.phone.number(), faker.phone.number()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Street (from Passengers)': faker.helpers.arrayElements(
      [
        faker.location.streetAddress(),
        faker.location.streetAddress(),
        faker.location.streetAddress(),
      ],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    City: faker.helpers.arrayElements(
      [faker.location.city(), faker.location.city(), faker.location.city()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'State (from Passengers) 3': faker.helpers.arrayElements(
      [faker.location.state(), faker.location.state(), faker.location.state()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Zip (from Passengers)': faker.helpers.arrayElements(
      [
        faker.location.zipCode(),
        faker.location.zipCode(),
        faker.location.zipCode(),
      ],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Diagnosis (from Passengers)': faker.helpers.arrayElements(
      [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'Date of Birth (from Passengers) 2': faker.helpers.arrayElements(
      [
        faker.date.past().toISOString(),
        faker.date.past().toISOString(),
        faker.date.past().toISOString(),
      ],
      faker.number.int({
        min: 1,
        max: 3,
      })
    ),
    'TS City, State (from Treatment Site Totals 2) (from Passengers)':
      faker.helpers.arrayElements(
        [faker.location.city(), faker.location.city(), faker.location.city()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
    '48 Hours After Flight': faker.helpers.arrayElement(['Yes', 'No']),
    ...manualData.fields,
  },
  ...manualData,
});

/**
 * Creates a test flight request data object with random data
 *
 * @param manualData - Optional data to override the random data
 * @returns A test flight request data object
 */
export const createTestFlightRequestData = (
  manualData: Partial<FlightRequestData> = {}
) =>
  ({
    id: faker.string.uuid(),
    createdTime: faker.date.recent().toISOString(),
    fields: {
      'Submission ID': faker.string.uuid(),
      'Trip Type': faker.helpers.arrayElement(['One Way', 'Roundtrip']),
      'Departure Date': faker.date.future().toISOString().split('T')[0],
      'Request Type': faker.helpers.arrayElement([
        'Service Dog',
        'Service Dog Retrieval/Training',
        'Treatment',
        'Treatment - Clinical Trial',
        'Treatment - Surgery',
        'Treatment - Radiation',
        'Treatment - Chemotherapy',
        'Treatment - Other',
      ]),
      'Household Size': faker.number.int({
        min: 1,
        max: 8,
      }),
      'Passenger 2 Approval Status': faker.helpers.arrayElement([
        'Approved',
        'Denied',
        'Pending',
      ]),
      'How did you hear about us?': faker.helpers.arrayElement([
        'Local Physician',
        'Social Media',
        'Internet Search',
        'Friend or Family',
        'Other',
      ]),
      Diagnosis: faker.lorem.sentence(),
      'Passenger 3': faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Patient Type': faker.helpers.arrayElement([
        'Patient',
        'Accompanying Passenger',
        'Partner Organization',
      ]),
      Ethnicity: faker.helpers.arrayElements(
        [
          'American Indian/Alaskan Native',
          'Asian',
          'Black',
          'Hispanic/Latino',
          'Native Hawaiian/Pacific Islander',
          'White',
          'Other',
        ],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Treatment City': faker.location.city(),
      Education: faker.helpers.arrayElement([
        'Less than high school degree',
        'High school degree or equivalent',
        'Some college, no degree',
        'Associate degree',
        "Bachelor's degree",
        'Graduate or professional degree',
      ]),
      'Treatment Phone': faker.phone.number(),
      'Submission Date': faker.date.recent().toISOString().split('T')[0],
      'Alt Destination Airport': faker.string.alpha(3).toLocaleUpperCase(),
      'Primary Treatment Doctor': faker.person.fullName(),
      'Wheelchair?': faker.helpers.arrayElement([
        'Yes, bringing own',
        'Yes, need to borrow',
        'No',
      ]),
      'Flight Specialist': faker.person.fullName(),
      'Appt Date': faker.date.future().toISOString().split('T')[0],
      'Passenger 3 Approval Status': faker.helpers.arrayElement([
        'Approved',
        'Denied',
        'Pending',
      ]),
      'First Request': faker.helpers.arrayElement(['Yes', 'No']),
      'Type of Treatment': faker.helpers.arrayElement([
        'Treatment',
        'Treatment - Clinical Trial',
        'Treatment - Surgery',
        'Treatment - Radiation',
        'Treatment - Chemotherapy',
        'Treatment - Other',
      ]),
      'Passenger 3 Reason': faker.lorem.sentence(),
      'Military Member': faker.helpers.arrayElement([
        'Self',
        'Spouse',
        'Mother',
        'Father',
        'Other',
      ]),
      'Flight Legs': faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      Status: faker.helpers.arrayElement([
        'Pending',
        'Booked',
        'Rescheduled',
        'Rebooked',
        'Canceled',
        'Did Not Fly',
      ]),
      'Household Income': faker.number.int({
        min: 5000,
        max: 400000,
      }),
      'Sources of Income': faker.lorem.sentence(),
      'Oxygen?': faker.helpers.arrayElement(['Yes', 'No']),
      'Origin Airport': faker.string.alpha(3).toLocaleUpperCase(),
      'Treatment Fax': faker.phone.number(),
      Employment: faker.helpers.arrayElement([
        'Employed, working 40+ hours per week',
        'Employed, working 1-39 hours per week',
        'Unemployed, looking for work',
        'Unemployed, not looking for work',
        'Retired',
        'Student',
        'Homemaker',
        'Unable to work',
        'Other',
      ]),
      'Martial Status': faker.helpers.arrayElement([
        'Single',
        'Married',
        'Divorced',
        'Widowed',
      ]),
      'Military Service': faker.helpers.arrayElement([
        'Active',
        'Veteran',
        'Not Applicable',
      ]),
      'Passenger 3 Different Return': faker.helpers.arrayElement(['Yes', 'No']),
      Patient: faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Passenger 2': faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Return Date': faker.date.future().toISOString().split('T')[0],
      'Treatment Site': faker.company.name(),
      'Treatment State': faker.location.streetAddress(),
      'Passenger 3 Return Date': faker.date.future().toISOString().split('T')[0],
      'Patient Age': faker.number.int({
        min: 1,
        max: 80,
      }),
      'Passenger 2 Different Return': faker.helpers.arrayElement(['Yes', 'No']),
      'Destination Airport': faker.string.alpha(3).toLocaleUpperCase(),
      'Alt. Origin Airport': faker.string.alpha(3).toLocaleUpperCase(),
      'AirTable Record ID': faker.string.uuid(),
      'Patient AirTable Record ID': faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Passenger 2 AirTable Record ID': faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Passenger 3 AirTable Record ID': faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Passenger AirTable Record IDs': faker.helpers.arrayElements(
        [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Add a Flight Leg': {
        label: faker.company.name(),
        url: faker.internet.url(),
      },
      'Existing Diagnoses': faker.helpers.arrayElements(
        [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'Total Nautical Miles': faker.number.int({
        min: 200,
        max: 10000,
      }),
      'Total PUR': faker.number.int({
        min: 1,
        max: 10000,
      }),
      'Total GIK': faker.number.int({
        min: 1,
        max: 10000,
      }),
      'Total Cost': faker.number.int({
        min: 1,
        max: 10000,
      }),
      '# of Legs': faker.number.int({
        min: 1,
        max: 10,
      }),
      'Per Leg Total': faker.number.int({
        min: 1,
        max: 10000,
      }),
      'Per Leg PUR': faker.number.int({
        min: 1,
        max: 10000,
      }),
      'Per Leg GIK': faker.number.int({
        min: 1,
        max: 10000,
      }),
      'Total # of PAX': faker.number.int({
        min: 1,
        max: 10,
      }),
      'Total # of Legs': faker.number.int({
        min: 1,
        max: 10,
      }),
      'Patient First Name': faker.person.firstName(),
      'Patient Last Name': faker.person.lastName(),
      'Patient Name': faker.person.fullName(),
      Airline: faker.helpers.arrayElements(
        AIRLINES,
        faker.number.int({
          min: 1,
          max: 3,
        })
      ),
      'T-Minus Blacklane Email': faker.date.future().toISOString().split('T')[0],
      '48 Hours After Booked': faker.date.future().toISOString().split('T')[0],
      'Request ID': faker.string.uuid(),
      Email: faker.internet.email(),
      ...manualData.fields,
    },
    ...manualData,
  }) as FlightRequestData;
