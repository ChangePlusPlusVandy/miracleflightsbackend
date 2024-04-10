import type { TrimmedPassenger } from '../passenger/trimmed-passenger.interface';

// This is the question array for flight specfic data received from the front end
export interface FlightSpecificData {
  enoughDaysAway: string;
  travelType: string;
  ScheduledMedicalAppointmentDate: string; // Needs to be in ISO string format
  DepartureDate: string; // Needs to be in ISO string format
  AirportOfOrigin: string;
  AlternateAirportOfOrigin: string;
  DestinationAirport: string;
  AlternateDestinationAirport: string;
  ReturnDate: string;
  FullNameOfTreatmentSite: string;
  FullNameOfPrimaryTreatmentSiteDoctor: string;
}

// This is what is received from the front end
export interface FlightRequestSubmission {
  patient: TrimmedPassenger;
  passengerTwo: TrimmedPassenger;
  passengerThree?: TrimmedPassenger;
  flightRequestData: FlightSpecificData;
}

// This is used to map the question names to the question IDs in the JotForm
export enum questionIdMap {
  // Flight Request
  youngerThan17 = '454',
  safeTravelPassengers = '536',
  hasTsaDocs = '548',
  liveInUs = '427',
  enoughDaysAway = '450',
  governmentAssistanceType = '563',
  IRS1040Docs = '560',
  householdSize = '443',
  grossHouseholdIncome = '444',
  childPatientVerification = '539',
  isFirstTime = '445',
  enoughDaysAway2 = '540',
  singleUseCode = '543',
  travelType = '523',
  ScheduledMedicalAppointmentDate = '159',
  DepartureDate = '513', // Date
  AirportOfOrigin = '403',
  AlternateAirportOfOrigin = '404',
  DestinationAirport = '405',
  AlternateDestinationAirport = '406',
  returnDate = '160', // Date

  // Patient
  patientFirstName = '192',
  patientMiddleName = '193',
  patientLastName = '311',
  patientDateOfBirth = '14', // Date
  patientAgeAtAppointment = '522',
  patientGender = '136',
  patientStreetAddress = '198',
  patientCity = '199',
  patientState = '479',
  patientPostalCode = '206',
  patientCounty = '519',
  patientCountry = '207',
  patientHomePhone = '19',
  patientCellPhone = '137',
  patientEmail = '24',
  patientDiagnosis = '287',
  patientTypeOfTreatment = '288',
  patientHasMedicalInsurance = '554',
  patientMedicalInsuranceCompany = '555',
  patientMedicalInsuranceSubscriberId = '556',
  patientMedicalInsuranceGroupId = '557',
  FullNameOfTreatmentSite = '472',
  TreatmentSiteCityandState = '473', // city, state
  TreatmentSitePhoneNumber = '474',
  FullNameOfPrimaryTreatmentSiteDoctor = '477',
  patientOxygenRequired = '162',
  patientFlyingWithServiceDog = '535',
  patientWheelchairRequired = '163',
  patientBirthCertificateRequired = '170',
  patientEthnicity = '187',
  patientHighestEducation = '309',
  patientMaritalStatus = '308',
  patientEmploymentStatus = '310',
  patientMilitaryService = '514',
  patientMilitaryMember = '515',
  howDidYouHearAboutUs = '150',
  childPatientGovernmentName = '413',
  waiveLegalAction = '415',
  consentForMedicalTreatment = '547',
  photoVideoRelease = '416',
  patientSignerName = '289',

  // Passenger 2
  passenger2RelationshipToPatient = '419',
  passenger2FirstName = '264',
  passenger2MiddleName = '265',
  passenger2LastName = '312',
  passenger2Gender = '456',
  passenger2CellPhone = '295',
  passenger2Email = '268',
  passenger2SameAddressAsPatient = '306',
  passenger2StreetAddress = '291',
  passenger2City = '299',
  passenger2State = '480',
  passenger2PostalCode = '301',
  passenger2Country = '302',
  passenger2DateOfBirth = '452', // Date
  passenger2WaiverOfResponsibility = '343',
  passenger2GovernmentName = '257',
  passenger2WaiveLegalAction = '258',
  passenger2PhotoVideoRelease = '260',
  RelationshipToPassenger2 = '303',
  passenger2SignerName = '355',

  // Passenger 3
  passenger3FirstName = '266',
  passenger3MiddleName = '267',
  passenger3LastName = '313',
  passenger3Gender = '457',
  passenger3Email = '269',
  passenger3CellPhone = '297',
  passenger3DifferentReturnDate = '526',
  passenger3ReturnDateExplanation = '531',
  passenger3SameAddressAsPatient = '307',
  passenger3StreetAddress = '298',
  passenger3City = '292',
  passenger3State = '481',
  passenger3PostalCode = '293',
  passenger3Country = '218',
  passenger3WaiverOfResponsibility = '367',
  passenger3GovernmentName = '350',
  passenger3WaiveLegalAction = '352',
  passenger3PhotoVideoRelease = '353',
  passenger3SignerName = '418',
  RelationshipToPassenger3 = '356',
  passenger3DateOfBirth = '453', // Date
  // General info/conclusion
  numPeopleInHousehold = '176',
  annualFamilyIncome = '175',
  sourcesOfIncome = '178',
  uploadProofOfIncome = '177',
  eligibilityDeterminedByIncome = '190',
  cancelOrAmendFlights = '191',
  noCallNoShow = '285',
  consentForMedicalTreatmen2 = '561',
  signerEmail = '219',
  nameOfSigner = '153',
  relationshipToPatient = '154',
}

// This is what is sent back to the JotForm
export interface FlightRequestWithIds {
  // Flight Request
  '454': string;
  '536': string;
  '548': string;
  '427': string;
  '450': string;
  '563': string;
  '560': string;
  '443': string;
  '444': string;
  '539': string;
  '445': string;
  '540': string;
  '543': string;
  '523': string;
  '159': { month: string; day: string; year: string };
  '513': { month: string; day: string; year: string };
  '403': string;
  '404': string;
  '405': string;
  '406': string;
  '160': { month: string; day: string; year: string };

  // Patient
  '192': string;
  '193': string;
  '311': string;
  '14': { month: string; day: string; year: string };
  '522': string;
  '136': string;
  '198': string;
  '199': string;
  '479': string;
  '206': string;
  '519': string;
  '207': string;
  '19': string;
  '137': string;
  '24': string;
  '287': string;
  '288': string;
  '554': string;
  '555': string;
  '556': string;
  '557': string;
  '472': string;
  '473': string;
  '474': string;
  '477': string;
  '162': string;
  '535': string;
  '163': string;
  '170': string;
  '187': string;
  '309': string;
  '308': string;
  '310': string;
  '514': string;
  '515': string;
  '150': string;
  '413': string;
  '415': string;
  '547': string;
  '416': string;
  '289': string;

  // Passenger 2
  '419': string;
  '264': string;
  '265': string;
  '312': string;
  '456': string;
  '295': string;
  '268': string;
  '306': string;
  '291': string;
  '299': string;
  '480': string;
  '301': string;
  '302': string;
  '452': { month: string; day: string; year: string };
  '343': string;
  '257': string;
  '258': string;
  '260': string;
  '303': string;
  '355': string;

  // Passenger 3
  '266': string;
  '267': string;
  '313': string;
  '457': string;
  '269': string;
  '297': string;
  '526': string;
  '531': string;
  '307': string;
  '298': string;
  '292': string;
  '481': string;
  '293': string;
  '218': string;
  '367': string;
  '350': string;
  '352': string;
  '353': string;
  '418': string;
  '356': string;
  '453': { month: string; day: string; year: string };

  // General info/conclusion
  '176': string;
  '175': string;
  '178': string;
  '177': string;
  '190': string;
  '191': string;
  '285': string;
  '561': string;
  '219': string;
  '153': string;
  '154': string;
}

// interface PassengerDetails {
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   relationshipToPatient: string;
//   dateOfBirth: Date;
//   gender: string;
//   cellPhone: string;
//   email: string;
//   sameAddressAsPatient: boolean;
//   address: {
//     street: string;
//     city: string;
//     state: string;
//     postalCode: string;
//     country: string;
//   };
//   waiverOfResponsibility: boolean;
//   returnDateDifferent: boolean;
//   returnDateExplanation: string;
//   returnDate: string; // switch to'Date' later if that works better
// }

// export interface FlightRequestSubmission {
//   childPatient: {
//     ageAtAppointment: number;
//     isFirstTimeUser: boolean;
//     hasMedicalInsurance: boolean;
//     birthCertificateOrGuardianshipProofRequired: boolean;
//     nameOnGovernmentID: string;
//     diagnosis: string;
//     typeOfTreatment: string;
//     oxygenRequired: boolean;
//     flyingWithServiceDog: boolean;
//     wheelchairRequired: boolean;
//     medicalInsurance: {
//       companyName: string;
//       subscriberId: string;
//       groupId: string;
//     };
//     treatmentSite: {
//       name: string;
//       cityState: string;
//       phone: string;
//       fax: string;
//     };
//     primaryDoctor: {
//       fullName: string;
//     };
//   };
//   travelDetails: {
//     commercialSafe: boolean;
//     hasTSADocs: boolean;
//     domestic: boolean;
//     departureDate: string; // 'Date'
//     returnDate: string; // possibly use 'Date' later if that works better
//     departureDateAtLeast14DaysAway: boolean;
//     typeOfTravel: string;
//     airports: {
//       origin: string;
//       originAlternate: string;
//       destination: string;
//       destinationAlternate: string;
//     };
//     singleUseCode: string;
//   };
//   applicantDetails: {
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     dateOfBirth: Date;
//     gender: string;
//     contact: {
//       homePhone: string;
//       cellPhone: string;
//       email: string;
//     };
//     address: {
//       street: string;
//       city: string;
//       state: string;
//       postalCode: string;
//       county: string;
//       country: string;
//     };
//   };
//   household: {
//     size: number;
//     grossIncome: number;
//     governmentAssistance: string[]; // Array because multiple selections are possible.
//     IRS1040DocumentsAvailable: boolean;
//   };
//   legalAndMisc: {
//     photoVideoRelease: boolean;
//     waiveLegalAction: boolean;
//     consentForMedicalTreatment: boolean;
//     howDidYouHearAboutUs: string;
//   };
//   educationAndEmployment: {
//     patientEthnicity: string[]; // string array if multiple selections are possible.
//     highestEducationCompleted: string;
//     maritalStatus: string;
//     employmentStatus: string;
//     militaryService: {
//       isVeteran: boolean;
//       memberDetails: string;
//     };
//   };
//   additionalPassengers: PassengerDetails[];
// }

// zapier automations and this API key is used to send the data to the JotForm
