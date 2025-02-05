import { Request, Response } from "express";
import axios from "axios";
import https from 'https';

const httpsAgent = new https.Agent({
  secureProtocol: 'TLSv1_2_method', // Force TLS 1.2
});

const zapier_url = process.env.ZAPIER_WEBHOOK_KEY || '';

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    console.log("Received file:", req.file);  // Log file to check if it's being uploaded correctly
    console.log("Document type:", req.body.documentType);

    const file = req.file;
    

    // Send the file to Zapier
    console.log('headers:', req.headers);
    const response = await axios.post(zapier_url, req.file, {
    });

    res.status(200).json({
      message: "File forwarded to Zapier successfully!",
      zapierResponse: response.data,
    });
  } catch (error) {

    console.error("Error forwarding file to Zapier:", error);
    res.status(500).json({ error: "File forwarding failed" });
  }
};
