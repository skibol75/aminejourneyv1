import type { VercelRequest, VercelResponse } from '@vercel/node';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get API key from environment
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Internal Server Error: FAL_KEY not configured' });
  }

  try {
    // Parse the multipart form data
    const form = new IncomingForm();
    const [fields, files] = await form.parse(req);
    
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Create FormData for the upload
    const formData = new FormData();
    const blob = new Blob([fileBuffer], { type: file.mimetype || 'image/jpeg' });
    formData.append('file', blob, file.originalFilename || 'image.jpg');

    // Upload to Fal.ai
    const uploadResponse = await fetch('https://fal.run/storage/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
      },
      body: formData,
    });

    if (!uploadResponse.ok) {
      const errorData = await uploadResponse.text();
      throw new Error(`Upload failed: ${uploadResponse.status} - ${errorData}`);
    }

    const result = await uploadResponse.json();
    
    // Clean up temporary file
    fs.unlinkSync(file.filepath);
    
    return res.status(200).json(result);

  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Internal Server Error: Failed to upload file' });
  }
}