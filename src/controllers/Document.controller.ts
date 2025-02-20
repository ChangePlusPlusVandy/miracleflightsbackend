import axios from 'axios';
import type { Request, Response } from 'express';

const zapier_url = process.env.ZAPIER_WEBHOOK_KEY || '';

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    console.log('Received file:', req.file); // Log file to check if it's being uploaded correctly
    console.log('Document type:', req.body.documentType);

    // Send the file to Zapier
    console.log('headers:', req.headers);
    const response = await axios.post(zapier_url, req.file, {});

    res.status(200).json({
      message: 'File forwarded to Zapier successfully!',
      zapierResponse: response.data,
    });
  } catch (error) {
    console.error('Error forwarding file to Zapier:', error);
    res.status(500).json({ error: 'File forwarding failed' });
  }
};
