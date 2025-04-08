
import { cca  } from '../services/OneDriveService';


import axios from 'axios';


/**
 * Document upload codebase controller to handle upload session creation, deletion, error resolving
 *
 */

/**
 * Responsible for creating an upload session to stream data into and upload to documents.
 *
 * @param req
 * @param res
 * @returns
 */
export const createUploadSession = async (req, res) => {
  const patientName = req.body.patient_name as string;
  const airtableID = req.body.airtableID as string;

  try {
    const authResponse = await cca.acquireTokenByClientCredential({
      scopes: ['https://graph.microsoft.com/.default'],
    });
    const token = authResponse?.accessToken as string;

    // pass in upload session body
    const requestBody = req.body.item;
    const fileName = req.body.item.name;

    const result = await axios.post(
      `https://graph.microsoft.com/v1.0/drives/b!Bq4F0cHhHUStWX6xu3PlSvFGg-J9yP9AoIbUjyaXbEnmwavHs1M_Q5YJNNIAL06K/root:/CPPMiracleFlights25/patient_data/${patientName}_${airtableID}/documents/${fileName}:/createUploadSession`,
      requestBody,
      {
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // extremely important to preserve the upload session URL or else file cannot be uploaded to
    return res.status(200).json(result.data);
  } catch (e: any) {
    if (e.response?.status == 409) {
      console.error('Upload session already created for file!', e);
      return res.status(409).json(e);
    }
    console.error(e);
    res.status(500).json({ message: e });
  }
};

/**
 * Simple function to attempt to delete upload session if Microsoft service doesn't already
 *
 * @param req
 * @param res
 * @returns
 */
export const deleteUploadSession = async (req, res) => {
  const uploadUrl = req.body.uploadUrl as string;

  try {
    await axios.delete(uploadUrl);

    return res.status(204);
  } catch (e: any) {
    if (e.response?.status == 404) {
      return res.status(204).json({ message: 'Upload session was deleted' });
    }
    return res.status(404).json({ message: 'Upload session does not exist!' });
  }
};
