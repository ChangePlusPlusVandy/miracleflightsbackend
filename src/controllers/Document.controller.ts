import { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/9939309/2s0zzn7/";

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const documentType = req.body.documentType;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Temporary file path
    const tempDir = path.join(__dirname, "..", "temp"); // Ensure a 'temp' folder exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir); // Create the temp directory if it doesn't exist
    }
    
    const tempFilePath = path.join(tempDir, file.originalname);

    // Save the file to local storage temporarily
    fs.writeFileSync(tempFilePath, file.buffer);

    // Prepare the form data for Zapier
    const formData = new FormData();
    formData.append("file", fs.createReadStream(tempFilePath)); // Use the saved file
    formData.append("documentType", documentType);

    // Send the file to Zapier
    const response = await axios.post(ZAPIER_WEBHOOK_URL, formData, {
      headers: formData.getHeaders(),
    });

    // Delete file after send
    fs.unlinkSync(tempFilePath);

    res.status(200).json({
      message: "File forwarded to Zapier successfully!",
      zapierResponse: response.data,
    });
  } catch (error) {
    console.error("Error forwarding file to Zapier:", error);
    res.status(500).json({ error: "File forwarding failed" });
  }
};
