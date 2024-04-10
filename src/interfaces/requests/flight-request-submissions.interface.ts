export interface FlightRequestSubmission {
  childPatient: {
    ageAtAppointment: number;
    isFirstTimeUser: boolean;
    hasMedicalInsurance: boolean;
    birthCertificateOrGuardianshipProofRequired: boolean;
    nameOnGovernmentID: string;
    diagnosis: string;
    typeOfTreatment: string;
    oxygenRequired: boolean;
    flyingWithServiceDog: boolean;
    wheelchairRequired: boolean;
    medicalInsurance: {
      companyName: string;
      subscriberId: string;
      groupId: string;
    };
    treatmentSite: {
      name: string;
      cityState: string;
      phone: string;
      fax: string;
    };
    primaryDoctor: {
      fullName: string;
    };
  };
  travelDetails: {
    commercialSafe: boolean;
    hasTSADocs: boolean;
    domestic: boolean;
    departureDate: string; // 'Date'
    returnDate: string; // possibly use 'Date' later if that works better
    departureDateAtLeast14DaysAway: boolean;
    typeOfTravel: string;
    airports: {
      origin: string;
      originAlternate: string;
      destination: string;
      destinationAlternate: string;
    };
    singleUseCode: string;
  };
  applicantDetails: {
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    gender: string;
    contact: {
      homePhone: string;
      cellPhone: string;
      email: string;
    };
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      county: string;
      country: string;
    };
  };
  household: {
    size: number;
    grossIncome: number;
    governmentAssistance: string[]; // Array because multiple selections are possible.
    IRS1040DocumentsAvailable: boolean;
  };
  legalAndMisc: {
    photoVideoRelease: boolean;
    waiveLegalAction: boolean;
    consentForMedicalTreatment: boolean;
    howDidYouHearAboutUs: string;
  };
  educationAndEmployment: {
    patientEthnicity: string[]; // string array if multiple selections are possible.
    highestEducationCompleted: string;
    maritalStatus: string;
    employmentStatus: string;
    militaryService: {
      isVeteran: boolean;
      memberDetails: string;
    };
  };
  additionalPassengers: PassengerDetails[];
}

interface PassengerDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  relationshipToPatient: string;
  dateOfBirth: Date;
  gender: string;
  cellPhone: string;
  email: string;
  sameAddressAsPatient: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  waiverOfResponsibility: boolean;
  returnDateDifferent: boolean;
  returnDateExplanation: string;
  returnDate: string; // switch to'Date' later if that works better
}

// zapier automations and this API key is used to send the data to the JotForm
