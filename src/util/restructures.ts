import { questionIdMap } from '../interfaces/requests/flight-request-submissions.interface';
import type {
  FlightRequestSubmission,
  FlightRequestWithIds,
} from '../interfaces/requests/flight-request-submissions.interface';

export const restructureFlightRequest = (
  request: FlightRequestSubmission
): FlightRequestWithIds => {
  const { patient, passengerTwo, passengerThree, flightRequestData } = request;

  const {
    'First Name': patientFirstName,
    'Last Name': patientLastName,
    'Date of Birth': patientDateOfBirth,
    Gender: patientGender,
    Street: patientStreetAddress,
    City: patientCity,
    Country: patientCountry,
    Email: patientEmail,
    'Household Income': householdIncome,
    'Household Size': householdSize,
    'Cell Phone': patientCellPhone,
    'Home Phone': patientHomePhone,
    Education: patientHighestEducation,
    'Marital Status': maritalStatus,
    Employment: patientEmploymentStatus,
    Ethnicity: patientEthnicity,
    'Military Service': patientMilitaryService,
    'Military Member': patientMilitaryMember,
    'How did you hear about us': howDidYouHearAboutUs,
    Diagnoses: patientDiagnosis,
    Age: patientAgeAtAppointment,
  } = patient;

  const {
    'First Name': passenger2FirstName,
    'Last Name': passenger2LastName,
    'Date of Birth': passenger2DateOfBirth,
    Gender: passenger2Gender,
    Street: passenger2StreetAddress,
    City: passenger2City,
    Email: passenger2Email,
    'Cell Phone': passenger2CellPhone,
  } = passengerTwo;

  const {
    'First Name': passenger3FirstName,
    'Last Name': passenger3LastName,
    'Date of Birth': passenger3DateOfBirth,
    Gender: passenger3Gender,
    Street: passenger3StreetAddress,
    City: passenger3City,
    Email: passenger3Email,
    'Cell Phone': passenger3CellPhone,
  } = passengerThree ?? {};

  const {
    travelType,
    ScheduledMedicalAppointmentDate,
    DepartureDate,
    AirportOfOrigin,
    AlternateAirportOfOrigin,
    DestinationAirport,
    AlternateDestinationAirport,
    ReturnDate,
    FullNameOfTreatmentSite,
    FullNameOfPrimaryTreatmentSiteDoctor,
  } = flightRequestData;

  const restructuredRequest: FlightRequestWithIds = {
    // Patient Data
    [questionIdMap.patientFirstName]: patientFirstName,
    [questionIdMap.patientLastName]: patientLastName,
    [questionIdMap.patientDateOfBirth]: convertToDateJSON(patientDateOfBirth),
    [questionIdMap.patientGender]: patientGender,
    [questionIdMap.patientStreetAddress]: patientStreetAddress,
    [questionIdMap.patientCity]: patientCity,
    [questionIdMap.patientCountry]: patientCountry,
    [questionIdMap.patientEmail]: patientEmail,
    [questionIdMap.annualFamilyIncome]: householdIncome.toString(),
    [questionIdMap.householdSize]: householdSize.toString(),
    [questionIdMap.grossHouseholdIncome]: householdIncome.toString(),
    [questionIdMap.childPatientVerification]:
      'Yes - Miracle Flights will provide flights to a qualifying child patient (age 17 and under at the time of medical appointment) and up to two additional parents/legal guardians/family members (up to 3 total passengers).',
    [questionIdMap.isFirstTime]: 'No',
    [questionIdMap.patientCellPhone]: patientCellPhone, // Not being sent over to JotForm. Does it have to do with format? Frontend is sending airtable data, backend is sending it as a string in this format: "(123) 456-7890"
    [questionIdMap.patientHomePhone]: patientHomePhone,
    [questionIdMap.patientHighestEducation]: patientHighestEducation,
    [questionIdMap.patientMaritalStatus]: maritalStatus,
    [questionIdMap.patientEmploymentStatus]: patientEmploymentStatus,
    [questionIdMap.patientEthnicity]: patientEthnicity.toString(),
    [questionIdMap.patientMilitaryService]: patientMilitaryService
      ? patientMilitaryService
      : '',
    [questionIdMap.patientMilitaryMember]: patientMilitaryMember
      ? patientMilitaryMember.toString()
      : '',
    [questionIdMap.howDidYouHearAboutUs]: howDidYouHearAboutUs.toString(),
    [questionIdMap.patientDiagnosis]: patientDiagnosis.toString(),
    [questionIdMap.patientAgeAtAppointment]: patientAgeAtAppointment.toString(),

    // Passenger 2 Data
    [questionIdMap.passenger2FirstName]: passenger2FirstName,
    [questionIdMap.passenger2LastName]: passenger2LastName,
    [questionIdMap.passenger2DateOfBirth]: convertToDateJSON(
      passenger2DateOfBirth
    ),
    [questionIdMap.passenger2Gender]: passenger2Gender,
    [questionIdMap.passenger2StreetAddress]: passenger2StreetAddress,
    [questionIdMap.passenger2City]: passenger2City,
    [questionIdMap.passenger2Email]: passenger2Email,
    [questionIdMap.passenger2CellPhone]: passenger2CellPhone,

    // Passenger 3 Data
    [questionIdMap.passenger3FirstName]: passenger3FirstName ?? '',
    [questionIdMap.passenger3LastName]: passenger3LastName ?? '',
    [questionIdMap.passenger3DateOfBirth]: passenger3DateOfBirth
      ? convertToDateJSON(passenger3DateOfBirth)
      : { month: '', day: '', year: '' },
    [questionIdMap.passenger3Gender]: passenger3Gender ?? '',
    [questionIdMap.passenger3StreetAddress]: passenger3StreetAddress ?? '',
    [questionIdMap.passenger3City]: passenger3City ?? '',
    [questionIdMap.passenger3Email]: passenger3Email ?? '',
    [questionIdMap.passenger3CellPhone]: passenger3CellPhone ?? '',

    // Flight Request Data
    [questionIdMap.enoughDaysAway]: isFourteenDaysAway(DepartureDate),
    [questionIdMap.enoughDaysAway2]: isFourteenDaysAway(DepartureDate),
    [questionIdMap.travelType]: travelType
      ? 'One-Way Flight (Departure Flight Only)'
      : 'Roundtrip Flight (Departure and Return Flight)',
    [questionIdMap.ScheduledMedicalAppointmentDate]: convertToDateJSON(
      ScheduledMedicalAppointmentDate
    ),
    [questionIdMap.DepartureDate]: convertToDateJSON(DepartureDate),
    [questionIdMap.AirportOfOrigin]: AirportOfOrigin,
    [questionIdMap.AlternateAirportOfOrigin]: AlternateAirportOfOrigin,
    [questionIdMap.DestinationAirport]: DestinationAirport,
    [questionIdMap.AlternateDestinationAirport]: AlternateDestinationAirport,
    [questionIdMap.returnDate]: convertToDateJSON(ReturnDate),
    [questionIdMap.FullNameOfTreatmentSite]: FullNameOfTreatmentSite,
    [questionIdMap.FullNameOfPrimaryTreatmentSiteDoctor]:
      FullNameOfPrimaryTreatmentSiteDoctor,

    // These are data points not being sent over, we need to incorporate these in the frontend
    454: 'Yes',
    536: 'Yes',
    548: 'Yes',
    427: 'Yes',
    563: '', // Type of gov. assistance
    560: 'Yes',
    543: '',
    193: '', // Patient Middle Name
    479: '', // State
    206: '', // Postal code
    519: '', // County
    288: '', // Type of treatment
    554: '', // Does the child patient presently have medical insurance coverage?
    555: '', // Medical Insurance Company Name
    556: '', // Subscriber ID #, Policy #, or Member ID #
    557: '', // Group #
    473: '', // Treatment Site City and State
    474: '', // Treatment Site Phone Number
    162: '', // Oxygen Required
    535: '', // Will you be flying with a service dog?
    163: '', // Wheelchair Required
    170: '', // Birth Certificate or Proof of Legal Guardianship Required for Child Patient (17 and under)
    413: patientFirstName + patientLastName, // Child Patient Name (as it appears on government issued identification)
    415: 'Furthermore, I do herewith unequivocally waive and deny, for myself and all my assigns, any and all rights to pursue any action against said Miracle Flights for any action or inaction executed by them in good faith.', // Waive Right to Pursue Legal Action
    547: 'I acknowledge and confirm that both parents and/or legal guardians consent and approve of the medical treatment that the child patient is receiving as listed in this Flight Request Application.', // Consent for Medical Treatment
    416: 'I AGREE and hereby authorize Miracle Flights and its partners, sponsors, and affiliates to use my name, likeness, photographs, reproductions, videos, recordings, or endorsements of/by me and/or my child for publicity, social media, and/or any other related Miracle Flights marketing purposes.', // Photo/Video Release
    289: '', // Patient Signer Name
    419: '', // Relationship to Patient
    265: '', // Passenger 2 - Middle Name
    306: '', // Passenger 2 - Address is the same as the patient?
    480: '', // Passenger 2 - State
    301: '', // Passenger 2 - Postal Code
    302: '', // Passenger 2 - Country
    343: '', // Passenger 2 Waiver of Responsibility
    257: passenger2FirstName + passenger2LastName, // Passenger Name (as it appears on government issued identification)
    258: 'Furthermore, I do herewith unequivocally waive and deny, for myself and all my assigns, any and all rights to pursue any action against said Miracle Flights for any action or inaction executed by them in good faith.', // Passenger 2 Waive Right to Pursue Legal Action
    260: 'I AGREE and hereby authorize Miracle Flights and its partners, sponsors, and affiliates to use my name, likeness, photographs, reproductions, videos, recordings, or endorsements of/by me and/or my child for publicity, social media, and/or any other related Miracle Flights marketing purposes.', // Passenger 2 Photo/Video Release
    303: '', // Passenger 3 - Relationship to Patient
    355: '', // Passenger 2 Signer Name
    267: '', // Passenger 3 - Middle Name
    526: '', // Is Passenger 3 returning on a different date than Patient/Passenger 1?
    531: '', // Explain why Passenger 3 is requesting a different return date than Patient/Passenger 1
    307: '', // Passenger 3 - Address is the same as the patient?
    481: '', // Passenger 3 - State
    293: '', // Passenger 3 - Postal Code
    218: '', // Passenger 3 - Country
    367: '', // Passenger 3 Waiver of Responsibility
    350: passenger3FirstName + (passenger3LastName ?? ''), // Passenger 3 Name (as it appears on government issued identification)
    352: 'Furthermore, I do herewith unequivocally waive and deny, for myself and all my assigns, any and all rights to pursue any action against said Miracle Flights for any action or inaction executed by them in good faith.', // Passenger 3 Waive Right to Pursue Legal Action
    353: 'I AGREE and hereby authorize Miracle Flights and its partners, sponsors, and affiliates to use my name, likeness, photographs, reproductions, videos, recordings, or endorsements of/by me and/or my child for publicity, social media, and/or any other related Miracle Flights marketing purposes.', // Passenger 3 Photo / Video Release
    418: passenger3FirstName + (passenger3LastName ?? ''), // Passenger 3 signer name
    356: '', // Relationship to passenger 3
    176: householdSize.toString(), // # people in household
    178: '', // Sources of income
    177: '', // Proof of income
    190: 'I hereby acknowledge financial assistance for air travel will be provided to me by Miracle Flights and certify that our total gross family/household income from all sources and my family size are as indicated above.', // Eligibility is determined by total family income and size
    191: 'I will call Miracle Flights with any flight cancellations or changes needed to my original itinerary. I acknowledge that Miracle Flights is the only party that can cancel or amend my flights and I will not contact the airlines directly. Failure to do comply with this may put Miracle Flights and its airline relationships in jeopardy and may result in fewer flights provided to myself and others.', // Cancelling or amending flights?
    285: 'I understand that the airline tickets are provided at no cost to me and/or my family by Miracle Flights. I will contact Miracle Flights as soon as possible to make them aware of any changes that may result in my family not being able to fly on the flights that were provided to us. Therefore, any change or cancellation not pre-approved by Miracle Flights may result in Miracle Flights losing the resources spent on your flights. In the case of a "no call no show" resulting in Miracle Flights losing resources, Miracle Flights may seek financial compensation for the travel costs and/or may deny the patient and their family future program services.', // No call, no show
    561: 'I acknowledge and confirm that both parents and/or legal guardians consent and approve of the medical treatment that the child patient is receiving as listed in this Flight Request Application.', // Final consent for medical treatment
    219: '', // signer email
    153: '', // Name of signer
    154: '', // Final relationship to patient
  };

  return restructuredRequest;
};

// Converts the date string to an object with the month, day, and year
const convertToDateJSON = (
  date: string
): { month: string; day: string; year: string } => {
  const dateArray = date.split('-');
  const month = dateArray[1];
  const day = dateArray[2];
  const year = dateArray[0];

  return {
    month: month,
    day: day,
    year: year,
  };
};

// This function is used to determine if the scheduled date is 14 days away
const isFourteenDaysAway = (scheduledDate): string => {
  const today = new Date();
  const scheduled = new Date(scheduledDate);
  const differenceInTime = scheduled.getTime() - today.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays > 14 ? 'Yes' : 'No';
};
