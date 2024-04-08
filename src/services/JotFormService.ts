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

export const SubmitJotForm = async (req, res) => {
  const formData = req.body;
  getQuestions();
  // const validation = validateFormData(formData);
  // if (!validation.isValid) {
  //   console.log(req.body);
  //   return res.status(400).json({
  //     error: `Missing or empty required field: ${validation.missingField}`,
  //   });
  // }

  try {
    console.log(formData);
    // form ID: 240586898219170 - clone one of the forms from the JotForm account
    const response = await client.form.addSubmission('240977441895067', {
      '5': formData.email,
      '6': 'Hello',
      '7': 'Hello',
      '8': 'Hello',
    });

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

const getQuestions = async () => {
  const response = await client.form.getQuestions('240977441895067');
  const content = response.content as unknown as JSON; // Add type assertion here
  console.log(content); // Access content using array indexing
};
