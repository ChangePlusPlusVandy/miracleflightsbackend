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
    Email: patientEmail,
    'Household Income': annualFamilyIncome,
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
    Diagnosis: patientDiagnosis,
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
    enoughDaysAway,
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
    [questionIdMap.patientEmail]: patientEmail,
    [questionIdMap.annualFamilyIncome]: annualFamilyIncome.toString(),
    [questionIdMap.householdSize]: householdSize.toString(),
    [questionIdMap.patientCellPhone]: patientCellPhone,
    [questionIdMap.patientHomePhone]: patientHomePhone,
    [questionIdMap.patientHighestEducation]: patientHighestEducation,
    [questionIdMap.patientMaritalStatus]: maritalStatus,
    [questionIdMap.patientEmploymentStatus]: patientEmploymentStatus,
    [questionIdMap.patientEthnicity]: patientEthnicity.toString(),
    [questionIdMap.patientMilitaryService]: patientMilitaryService,
    [questionIdMap.patientMilitaryMember]: patientMilitaryMember.toString(),
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
    [questionIdMap.enoughDaysAway]: enoughDaysAway,
    [questionIdMap.travelType]: travelType,
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
    454: '',
    536: '',
    548: '',
    427: '',
    563: '',
    560: '',
    444: '',
    539: '',
    445: '',
    540: '',
    543: '',
    193: '',
    479: '',
    206: '',
    519: '',
    207: '',
    288: '',
    554: '',
    555: '',
    556: '',
    557: '',
    473: '',
    474: '',
    162: '',
    535: '',
    163: '',
    170: '',
    413: '',
    415: '',
    547: '',
    416: '',
    289: '',
    419: '',
    265: '',
    306: '',
    480: '',
    301: '',
    302: '',
    343: '',
    257: '',
    258: '',
    260: '',
    303: '',
    355: '',
    267: '',
    526: '',
    531: '',
    307: '',
    481: '',
    293: '',
    218: '',
    367: '',
    350: '',
    352: '',
    353: '',
    418: '',
    356: '',
    176: '',
    178: '',
    177: '',
    190: '',
    191: '',
    285: '',
    561: '',
    219: '',
    153: '',
    154: '',
  };

  return restructuredRequest;
};

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
