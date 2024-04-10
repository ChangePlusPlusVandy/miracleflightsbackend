import { restructureFlightRequest } from '../util/restructures';
import Jotform from 'jotform';
import express from 'express';
import type {
  FlightRequestSubmission,
  FlightSpecificData,
} from '../interfaces/requests/flight-request-submissions.interface';
import type { TrimmedPassenger } from '../interfaces/passenger/trimmed-passenger.interface';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

app.use(express.json());

const options = {
  url: 'https://hipaa-api.jotform.com',
};

const client = new Jotform(process.env.JOTFORM_API_KEY || '', {
  baseURL: options.url,
});

// const validateFormData = data => {
//   // List of required fields for simplification
//   // assume everything is valid
//   // set it up as one chunk
//   // submit and send back a 200 that it was submitted.
//   // pray it works.
//   // the flight request does not go to the sandbox, it goes to the live form.

//   // the form ID
//   const requiredFields = ['email'];

//   // Check if each required field is present and not empty in the data
//   for (const field of requiredFields) {
//     if (!data[field] || data[field].trim() === '') {
//       return { isValid: false, missingField: field };
//     }
//   }

//   return { isValid: true };
// };

export const SubmitJotForm = async (req, res) => {
  const json = req.body;
  const {
    patient,
    passengerTwo,
    passengerThree,
    flightRequestData,
  }: {
    patient: TrimmedPassenger;
    passengerTwo: TrimmedPassenger;
    passengerThree: TrimmedPassenger;
    flightRequestData: FlightSpecificData;
  } = json;

  const rawData: FlightRequestSubmission = {
    patient: patient,
    passengerTwo: passengerTwo,
    passengerThree: passengerThree,
    flightRequestData: flightRequestData,
  };

  console.log('HERE IS THE RAWDATA rawData:', rawData);
  const submissionData = JSON.stringify(restructureFlightRequest(rawData));

  try {
    // form ID: 240586898219170 - clone one of the forms from the JotForm account
    const response = await client.form.addSubmission(
      '240586898219170',
      JSON.parse(submissionData)
    );

    if (response.responseCode === 200) {
      res.status(200).json({
        message: 'Flight request submitted successfully',
        submissionId: response.content.submissionID,
      });
    } else {
      res.status(response.responseCode).json({ error: response.message });
    }
  } catch (error) {
    console.error('Error submitting to JotForm:', (error as any)?.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const response = await client.form.getQuestions('240586898219170');
    if (response.responseCode === 200) {
      const content = response.content as unknown as JSON; // Add type assertion here
      res.status(200).json({
        message: 'Questions retrieved successfully',
        questions: content,
      });
    } else {
      res.status(response.responseCode).json({ error: response.message });
    }
  } catch (error) {
    console.error(
      'Error getting questions from JotForm:',
      (error as any)?.message
    );
    res.status(500).json({ error: 'Internal server error' });
  }
};
