import msalConfig from '../config/msalConfig';
import { formatISODateTime, formatLocalDate } from '../util/dateUtils';
import express from 'express';
import axios from 'axios';
import { ConfidentialClientApplication } from '@azure/msal-node';
import type { TrimmedFlightRequest } from '../interfaces/requests/trimmed-flight-request.interface';
import type { FlightLegData } from '../interfaces/legs/flight-leg.interface';
import type { DocumentsData, FileData } from '../interfaces/documents/documents.interface';

const app = express();
app.use(express.json());

/**
 * Reusuable service for accessing, managing, and restructuring the onedrive associated
 * with Jotform account. Handles multiple aspects of Microsoft Graph API and OneDrive. Refer to README.md 
 * for detailed breakdown of core functionality and endpoint details.
 *
 */

// create MSAL instance
export const cca = new ConfidentialClientApplication(msalConfig);

/**
 * Simple endpoint to retrieve data regarding all of a patient's folders
 *
 * @param req
 * @param res
 * @returns
 */
export const locatePatientFolder = async (req, res): Promise<Response> => {
  const patientName = req.body.patient_name;
  const airtableID = req.body.airtableID;

  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;
    const result = await findPatientFolder(patientName, airtableID, token);

    return res.status(result.status).json(result.data);
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({
      message: 'An unexpected error occurred while processing the request.',
      error: e,
    });
  }
};

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const populatePatientFolder = async (req, res) => {
  const patientName = req.body.patient_name;
  const airtableID = req.body.airtableID;
  
  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;
    const patientSearch = await findPatientFolder(patientName, airtableID, token);

    if (patientSearch.status == 200) {
      const [tripsStatus, accompanyingStatus, documentsStatus] =
        await Promise.all([
          createFolder({ folderName: 'trips' }, patientName, airtableID, token),
          createFolder(
            { folderName: 'accompanying_passengers' },
            patientName,
            airtableID,
            token
          ),
          createFolder({ folderName: 'documents' }, patientName, airtableID, token),
        ]);

      const responseData: PopulateFolderResponse = {
        tripsStatus,
        accompanyingStatus,
        documentsStatus,
      };

      return res.status(200).json(responseData);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: 'An unexpected error occurred while processing the request.',
      error: e,
    });
  }
};

/**
 * findPatientFolder
 * Locates patient folder within OneDrive and verifies it's existence
 *
 * @param patientName
 * @param token
 * @returns
 */
export async function findPatientFolder(
  patientName: string,
  airtableID: string,
  token: string
): Promise<any> {
  try {
    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}:/`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    return result;
  } catch (e: any) {
    // resource not found
    if (e.response?.status == 404) {
      try {
        await createPatientFolder(patientName, airtableID, token);
        return await findPatientFolder(patientName, airtableID, token);
      } catch (createError) {
        console.error('Error creating patient folder:', createError);
        throw createError;
      }
    }
    console.error('Internal server error:', e);
    throw e;
  }
}

/**
 *
 * @param patientName
 * @param token
 * @returns
 */
export async function createPatientFolder(
  patientName: string,
  airtableID: string,
  token: string
): Promise<number> {
  const requestBody = {
    name: `${patientName}_${airtableID}`,
    folder: {},
    '@microsoft.graph.conflictBehavior': 'fail', // should fail if there was a callback issue and the patient top folder does already exist
  };
  try {
    const result = await axios.post(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data:/children`,
      requestBody,
      {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return result.status;
  } catch (e: any) {
    if (e.response?.status == 409) {
      return 409;
    }
    console.error('Internal server error:', e);
    throw e;
  }
}

/**
 * structures the params for folder creation in modular manner
 * folderName -- corresponds to the desired subfolder name
 * additionalParams -- overriding any potential params in folder creation
 */
interface FolderOperationParams {
  folderName: string;
  additionalParams?: Record<string, any>;
}

/**
 *
 */
interface PopulateFolderResponse {
  tripsStatus: number;
  accompanyingStatus: number;
  documentsStatus: number;
}

/**
 * main function for creating the three primary subfolders for top level patient folder
 *  - Trips
 *  - Accompanying Passengers
 *  - Financial Documents
 *
 * @param params
 * @param token
 * @returns
 */
export async function createFolder(
  params: FolderOperationParams,
  patientName: string,
  airtableID: string,
  token: string
): Promise<number> {
  const defaultBody = {
    name: params.folderName,
    folder: {},
    '@microsoft.graph.conflictBehavior': 'fail', // operation should fail if the folder already exists for patient
  };

  const requestBody = { ...defaultBody, ...params.additionalParams };
  try {
    const result = await axios.post(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}:/children`,
      requestBody,
      {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return result.status;
  } catch (e: any) {
    if (e.response?.status == 409) {
      // folder pseudo-creation success
      return 201;
    }
    console.error('Error in handling request:', e);
    return e.response?.status || 500;
  }
}

/**
 *
 * @param req
 * @param res
 */
export const getDocuments = async (req, res) => {
  const patientName = req.query.patientName as string;
  const airtableID = req.query.airtableID as string;

  if (!patientName) { return res.status(400).json({ message: "Missing query params"}) }

  const formattedPatientName = patientName.trim().split(/\s+/).join('_'); 

  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;

    await findPatientFolder(formattedPatientName, airtableID, token)
    await createFolder({ folderName: 'documents' }, formattedPatientName, airtableID, token)

    const results = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}/documents:/children`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    const documentsData = await formatDocumentsData(results.data.value || [], patientName, airtableID);
    return res.status(200).json(documentsData);
  } catch (e) {
    console.error(e)
    return res.status(500).json({ message: "Internal server error (500)"});
  }
};

/**
 * Formats document data
 * @param rawFiles 
 * @param patientName 
 * @returns 
 */
async function formatDocumentsData(rawFiles: any[], patientName: string, airtableID: string): Promise<DocumentsData> {
  const extractExtension = (fileName: string): string | null => {
    const parts = fileName.split(".");
    return parts.length > 1 ? parts.pop()!.toLowerCase() : null;
  };

  const formattedPatientName = patientName.trim().split(/\s+/).join('_');

  // expected file formats
  const birthFile = rawFiles.find((file) => file.name.includes("birth_certificate"));
  const financialFile = rawFiles.find((file) => file.name.includes("financial_certificate"));

  const birthExtension = birthFile ? extractExtension(birthFile.name) : null;
  const financialExtension = financialFile ? extractExtension(financialFile.name) : null;

  const birthCert =
    birthExtension !== null
      ? createFileName(formattedPatientName, airtableID, "birth_certificate", birthExtension)
      : null;
  const financialCert =
    financialExtension !== null
      ? createFileName(formattedPatientName, airtableID, "financial_certificate", financialExtension)
      : null;


  // based on interface for FileData
  const files: FileData[] = rawFiles.map((file) => ({
    id: file.id,
    name: file.name,
    downloadUrl: file["@microsoft.graph.downloadUrl"], // for a clickable reference to document
    createdDateTime: formatISODateTime(file.createdDateTime), // MM/DD/YYYY - 00:00:00
  })) as FileData[];

  // determine if the birth certificate exists for patient
  const birthCertExists = birthCert ? rawFiles.some((file) => file.name === birthCert) : false;

  // determine if the financial certificate exists for patient
  const financialCertExists = financialCert ? rawFiles.some((file) => file.name === financialCert) : false;

  return { files, birthCertExists, financialCertExists}
}

/**
 * 
 * @param formattedPatientName 
 * @param airtableID 
 * @param documentType 
 * @param extension 
 * @returns 
 */
const createFileName = (formattedPatientName, airtableID, documentType, extension) => {
  let suffix = "";
  switch (documentType) {
    case "birth_certificate":
      suffix = `_birth_certificate.${extension}`;
      break;
    case "financial_certificate":
      suffix = `_financial_certificate.${extension}`;
      break;
    default:
      suffix = `_document.${extension}`;
  }
  return `${formattedPatientName}_${airtableID}${suffix}`;
};

/**
 * Retrieves file information for a specific accompanying passenger
 * 
 * @param req 
 * @param res The value parameter is used for determining if there are files within - empty array response indicates no files exist
 */
export const getAccompanyingPassengerFile = async (req, res) => {
  const patientName = req.query.patientName as string;
  const airtableID = req.query.airtableID as string;
  const passengerName = req.query.passengerFullName as string;
  const passengerDob = req.query.passengerDob as string;

  if (!patientName || !airtableID || !passengerName || !passengerDob ) { return res.status(400).json({ message: "Missing query params"}) }
  
  const age = await checkAge(passengerDob)

  // conditional check: if accompanying passenger is legal adult, no need for documents
  if (age >= 18) {
    return res.status(200).json({ value: []})
  }

  // formatting check
  const formattedPatientName = patientName.trim().split(/\s+/).join('_'); 
  const formattedPassengerName = passengerName.trim().split(/\s+/).join('_'); 

  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;

    // fallback validation
    await findPatientFolder(formattedPatientName, airtableID, token)
    await createFolder({ folderName: 'accompanying_passengers' }, formattedPatientName, airtableID, token)
    await findAccompanyingPassengerFolder(formattedPatientName, airtableID, formattedPassengerName, token)

    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}/accompanying_passengers/${formattedPassengerName}:/children`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    return res.status(200).json(result.data);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal server error (500)"});
  }
}

// /**
//  * 
//  * @param req 
//  * @param res 
//  */
// export const getTreatmentSiteVerification = async (req, res) => {
// }

/**
 *
 * @param req
 * @param res
 */
export const populateAccompanyingPassengersFolder = async (req, res) => {
  const patientName = req.body.patient_name;
  const airtableID = req.body.airtableID;
  const passengers = req.body.accompanying_passengers; // should expect an array

  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;
    const results = await Promise.all(
      passengers.map(async passenger => {
        const passengerName = passenger.fullName as string;
        const dobString = passenger.dob as string;
        const relationship = passenger.relationship as string;

        const passengerAge = await checkAge(dobString);
        const under18 = passengerAge < 18;

        // pre-check that patient folder and accomanpying_passengers folder exist before searching for accompanying passengers
        await findPatientFolder(patientName, airtableID, token);
        await createFolder(
          { folderName: 'accompanying_passengers' },
          patientName,
          airtableID,
          token
        );
        const passengerSearch = await findAccompanyingPassengerFolder(
          patientName,
          airtableID,
          passengerName,
          token
        );

        if (passengerSearch.status === 200) {
          return {
            passengerName,
            status: 200,
            message: under18
              ? `Passenger ${passengerName} is under 18. Please upload a birth certificate.`
              : `Passenger ${passengerName} folder exists or was created successfully.`,
            dob: dobString,
            relationship,
            age: passengerAge,
            under18, // flag to indicate if a folder should have a birth certificate uploaded
          };
        }
      })
    );

    return res.status(200).json({ results });
  } catch (e) {
    return res.status(500).json({
      message: 'An unexpected error occurred while processing the request.',
      error: e,
    });
  }
};

/**
 *
 * @param patientName
 * @param passengerName
 * @param token
 * @returns
 */
async function findAccompanyingPassengerFolder(
  patientName: string,
  airtableID: string,
  passengerName: string,
  token: string
): Promise<any> {
  const formattedPassengerName = passengerName.trim().split(/\s+/).join('_');
  try {
    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}/accompanying_passengers/${formattedPassengerName}:/`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    return result;
  } catch (e: any) {
    // resource not found
    if (e.response?.status == 404) {
      try {
        await createAccompanyingPassengerFolder(
          patientName,
          airtableID,
          formattedPassengerName,
          token
        );
        return await findAccompanyingPassengerFolder(
          patientName,
          airtableID,
          formattedPassengerName,
          token
        );
      } catch (createError) {
        console.error(
          'Error creating accompanying passenger folder:',
          createError
        );
        throw createError;
      }
    }
    console.error('Internal server error:', e);
    throw e;
  }
}

/**
 *
 * @param patientName
 * @param passengerName
 * @param token
 * @returns
 */
async function createAccompanyingPassengerFolder(
  patientName: string,
  airtableID: string,
  passengerName: string,
  token: string
): Promise<number> {
  const requestBody = {
    name: passengerName,
    folder: {},
    '@microsoft.graph.conflictBehavior': 'fail', // should fail if there was a callback issue and the patient top folder does already exist
  };
  try {
    const result = await axios.post(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}/accompanying_passengers:/children`,
      requestBody,
      {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return result.status;
  } catch (e: any) {
    if (e.response?.status == 409) {
      return 409;
    }
    console.error('Internal server error:', e);
    throw e;
  }
}

/**
 *
 * @param dobString
 * @returns
 */
async function checkAge(dobString: string): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      const dob = new Date(dobString);
      if (isNaN(dob.getTime())) {
        throw new Error('Invalid date format');
      }
      const diffMs = Date.now() - dob.getTime();
      const ageDate = new Date(diffMs);
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);

      resolve(age);
    } catch (e) {
      reject(e);
    }
  });
}

/**
 *
 * @param res
 * @param req
 */
export const populateTripsFolder = async (req, res) => {
  const patientName = req.body.patient_name;
  const airtableID = req.body.airtableID;
  const trips: TrimmedFlightRequest[] = req.body.trips;

  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;
    // since trip fulfillment is not on documents, must ensure that if documents page isn't rendered, we must create patient folder
    // if folder hierarchy has not already been established and additionally create the trips folder here as well.
    await findPatientFolder(patientName, airtableID, token);
    await findMainTripsFolder(patientName, airtableID, token);

    await Promise.all(
      trips.map(async trip => {
        const flightLegs = trip['Flight Legs'] as unknown as FlightLegData[];

        let formattedEarliest: string;
        let formattedLatest: string;

        if (flightLegs && flightLegs.length > 0) {
          // Get earliest departure and latest arrival from flight legs.
          const { earliest, latest } = await getEarliestLatestDates(flightLegs);
          formattedEarliest = formatLocalDate(earliest) || 'unknown';
          formattedLatest = formatLocalDate(latest) || 'unknown';
        } else {
          // Fallback to trip-level dates if no flight legs exist.
          formattedEarliest =
            formatLocalDate(trip['Departure Date']) || 'unknown';
          formattedLatest = formatLocalDate(trip['Return Date']) || 'unknown';
        }

        const folderName = `${trip.id}_${trip['Trip Type']}_${formattedEarliest}_${formattedLatest}`;
        await findSubTripsFolder(patientName, airtableID, folderName, token);
      })
    );
    return res.status(200).json(trips);
  } catch (e) {
    return res.status(500).json({
      message: 'An unexpected error occurred while processing the request.',
      error: e,
    });
  }
};

/**
 *
 * @param patientName
 * @param token
 * @returns
 */
async function findMainTripsFolder(
  patientName: string,
  airtableID: string,
  token: string
): Promise<any> {
  try {
    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}/trips:/`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    return result;
  } catch (e: any) {
    // resource not found
    if (e.response?.status == 404) {
      try {
        await createFolder({ folderName: 'trips' }, patientName, airtableID, token);
        return await findMainTripsFolder(patientName, airtableID, token);
      } catch (createError) {
        console.error('Error creating main trips folder:', createError);
        throw createError;
      }
    }
    console.error('Internal server error:', e);
    throw e;
  }
}

/**
 *
 * @param patientName
 * @param folderName
 * @param token
 * @returns
 */
async function findSubTripsFolder(
  patientName: string,
  airtableID: string,
  folderName: string,
  token: string
): Promise<any> {
  try {
    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}/trips/${folderName}:/`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    return result;
  } catch (e: any) {
    // resource not found
    if (e.response?.status == 404) {
      try {
        await createSubTripsFolder(patientName, airtableID, folderName, token);
        return await findSubTripsFolder(patientName, airtableID, folderName, token);
      } catch (createError) {
        console.error('Error creating trip folder:', createError);
        throw createError;
      }
    }
    console.error('Internal server error:', e);
    throw e;
  }
}

/**
 *
 * @param patientName
 * @param airtableID
 * @param folderName
 * @param token
 * @returns
 */
async function createSubTripsFolder(
  patientName: string,
  airtableID: string,
  folderName: string,
  token: string
): Promise<number> {
  try {
    const requestBody = {
      name: folderName,
      folder: {},
      '@microsoft.graph.conflictBehavior': 'fail', // should fail if there was a callback issue and the folder already exists
    };
    const result = await axios.post(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}/trips:/children`,
      requestBody,
      {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return result.status;
  } catch (e: any) {
    if (e.response?.status == 409) {
      return 409;
    }
    console.error('Internal server error:', e);
    throw e;
  }
}

/**
 *
 * @param flightLegs
 * @returns
 */
async function getEarliestLatestDates(
  flightLegs: FlightLegData[]
): Promise<{ earliest: Date; latest: Date }> {
  if (!flightLegs || flightLegs.length === 0) {
    throw new Error('No flight legs provided.');
  }

  const earliestLeg = flightLegs.reduce((earliest, current) => {
    const currentDeparture = new Date(current['Departure Date/Time']);
    const earliestDeparture = new Date(earliest['Departure Date/Time']);
    return currentDeparture < earliestDeparture ? current : earliest;
  });

  const latestLeg = flightLegs.reduce((latest, current) => {
    const currentArrival = new Date(current['Arrival Date/Time']);
    const latestArrival = new Date(latest['Arrival Date/Time']);
    return currentArrival > latestArrival ? current : latest;
  });

  return {
    earliest: new Date(earliestLeg['Departure Date/Time']),
    latest: new Date(latestLeg['Arrival Date/Time']),
  };
}