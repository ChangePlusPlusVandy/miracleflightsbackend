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

const validateFormData = data => {
  // List of required fields for simplification
  const requiredFields = [
    // 'childPatientVerification',
    // 'canTravelCommercially',
    // 'hasRequiredDocumentation',
    // 'livesInUS',
    // 'departureDateIn14Days',
    // 'governmentAssistance',
    // 'hasIRS1040',
    // 'householdSize',
    // 'grossHouseholdIncome',
    // 'firstName',
    // 'lastName',
    // 'dateOfBirth',
    // 'gender',
    // 'streetAddress',
    // 'city',
    // 'state',
    // 'postalCode',
    'email',
  ];

  // Check if each required field is present and not empty in the data
  for (const field of requiredFields) {
    if (!data[field] || data[field].trim() === '') {
      return { isValid: false, missingField: field };
    }
  }

  return { isValid: true };
};

app.post('/submit-flight-request', async (req, res) => {
  const formData = req.body;

  // Validate formData
  const validation = validateFormData(formData);
  if (!validation.isValid) {
    return res.status(400).json({
      error: `Missing or empty required field: ${validation.missingField}`,
    });
  }

  // next step: check if need to transform formData into the format
  //  expected by JotForm if necessary

  try {
    // form ID: 232016153645146
    const response = await client.form.addSubmission('232016153645146', {
      submission: { data: formData },
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
    console.error('Error submitting to JotForm:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
