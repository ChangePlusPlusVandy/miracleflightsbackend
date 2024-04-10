import express from 'express';
import Jotform from 'jotform';

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

// Req.body should be in the form of a flight request
// Need to parse the data and append it to user's existing data and submit it as a new request to the jotform
// The jotform will then send the data (through zapier) to the airtable

// Step 1: Generate request to SubmitJotForm method
// Step 2: Parse the body for fields
// Step 3: Match given fields to jotform qids
// Step 4: Append existing user data to the new request
// Step 5: Submit JotForm request with all data

export const SubmitJotForm = async (req, res) => {
  // const json = req.body;

  const submissionData = {};

  for (let i = 0; i < 1000; i++) {
    submissionData[i.toString()] = `${i.toString()}`;
  }

  try {
    // form ID: 240586898219170 - clone one of the forms from the JotForm account
    const response = await client.form.addSubmission(
      '240586898219170',
      submissionData
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
    console.error('HERE! Error submitting to JotForm:', (error as any)?.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// const getQuestions = async () => {
//   const response = await client.form.getQuestions('240586898219170');
//   const content = response.content as unknown as JSON; // Add type assertion here
//   console.log(content); // Access content using array indexing
// };
