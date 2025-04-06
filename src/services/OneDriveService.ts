import msalConfig from '../config/msalConfig';
import { formatLocalDate } from '../util/dateUtils';
import express from 'express';
import axios from 'axios';
import { ConfidentialClientApplication } from '@azure/msal-node';
import type { TrimmedFlightRequest } from '../interfaces/requests/trimmed-flight-request.interface';
import type { FlightLegData } from '../interfaces/legs/flight-leg.interface';

const app = express();
app.use(express.json());

/**
 * Reusuable service for accessing, managing, and restructuring the onedrive associated
 * with Jotform account. Handles multiple aspects of Microsoft Graph API and OneDrive:
 *
 *
 */

// create MSAL instance
const cca = new ConfidentialClientApplication(msalConfig);

/**
 * Simple endpoint to retrieve data regarding all of a patient's folders
 *
 * @param req
 * @param res
 * @returns
 */
export const locatePatientFolder = async (req, res): Promise<Response> => {
  const patientName = req.body.patient_name;

  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;
    const result = await findPatientFolder(patientName, token);

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
  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;
    const patientSearch = await findPatientFolder(patientName, token);

    if (patientSearch.status == 200) {
      const [tripsStatus, accompanyingStatus, documentsStatus] =
        await Promise.all([
          createFolder({ folderName: 'trips' }, patientName, token),
          createFolder(
            { folderName: 'accompanying_passengers' },
            patientName,
            token
          ),
          createFolder({ folderName: 'documents' }, patientName, token),
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
async function findPatientFolder(
  patientName: string,
  token: string
): Promise<any> {
  try {
    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}:/`,
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
        await createPatientFolder(patientName, token);
        return await findPatientFolder(patientName, token);
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
async function createPatientFolder(
  patientName: string,
  token: string
): Promise<number> {
  const requestBody = {
    name: patientName,
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
async function createFolder(
  params: FolderOperationParams,
  patientName: string,
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
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}:/children`,
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
  const patientName = req.body.patient_name;


};

/**
 * Retrieves file information 
 * 
 * @param req 
 * @param res The value parameter is used for determining if there are files within
 */
export const getAccompanyingPassengerFile = async (req, res) => {
  const patientName = req.query.patientName as string;
  const passengerName = req.query.passengerFullName as string;
  const passengerDob = req.query.passengerDob as string;

  if (!patientName || !passengerName || !passengerDob ) { return res.status(400).json({ message: "Missing query params"}) }
  
  const age = await checkAge(passengerDob)

  // conditional check: if accompanying passenger is legal adult, no need for documents
  if (age >= 18) {
    return res.status(200).json({ value: []})
  }

  const formattedPassengerName = passengerName.trim().split(/\s+/).join('_'); // formatting check

  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;
    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}/accompanying_passengers/${formattedPassengerName}:/children`,
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );
    return res.status(200).json(result.data);
  } catch (e) {
    console.error('Internal server error:', e);
    return res.status(500);
  }
}

/**
 * 
 * @param req 
 * @param res 
 */
export const getTreatmentSiteVerification = async (req, res) => {
  const patientName = req.body.patient_name;
  
}

/**
 *
 * @param req
 * @param res
 */
export const populateAccompanyingPassengersFolder = async (req, res) => {
  const patientName = req.body.patient_name;
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
        const relationship = passenger.relationship as string[];

        const passengerAge = await checkAge(dobString);
        const under18 = passengerAge < 18;

        // pre-check that patient folder and accomanpying_passengers folder exist before searching for accompanying passengers
        await findPatientFolder(patientName, token);
        await createFolder(
          { folderName: 'accompanying_passengers' },
          patientName,
          token
        );
        const passengerSearch = await findAccompanyingPassengerFolder(
          patientName,
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
  passengerName: string,
  token: string
): Promise<any> {
  const formattedPassengerName = passengerName.trim().split(/\s+/).join('_');
  try {
    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}/accompanying_passengers/${formattedPassengerName}:/`,
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
          formattedPassengerName,
          token
        );
        return await findAccompanyingPassengerFolder(
          patientName,
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
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}/accompanying_passengers:/children`,
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
function checkAge(dobString: string): Promise<number> {
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
  const trips: TrimmedFlightRequest[] = req.body.trips;

  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;
    // since trip fulfillment is not on documents, must ensure that if documents page isn't rendered, we must create patient folder
    // if folder hierarchy has not already been established and additionally create the trips folder here as well.
    await findPatientFolder(patientName, token);
    await findMainTripsFolder(patientName, token);

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
        await findSubTripsFolder(patientName, folderName, token);
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
  token: string
): Promise<any> {
  try {
    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}/trips:/`,
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
        await createFolder({ folderName: 'trips' }, patientName, token);
        return await findMainTripsFolder(patientName, token);
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
  folderName: string,
  token: string
): Promise<any> {
  try {
    const result = await axios.get(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}/trips/${folderName}:/`,
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
        await createSubTripsFolder(patientName, folderName, token);
        return await findSubTripsFolder(patientName, folderName, token);
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
 * @param folderName
 * @param token
 * @returns
 */
async function createSubTripsFolder(
  patientName: string,
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
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}/trips:/children`,
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
