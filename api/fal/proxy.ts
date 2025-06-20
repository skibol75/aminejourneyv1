import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Check HTTP method
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get target URL from header
  const targetUrl = req.headers['x-fal-target-url'] as string;
  if (!targetUrl) {
    return res.status(400).json({ error: 'Bad Request: x-fal-target-url header is required' });
  }

  // Validate URL
  let url: URL;
  try {
    url = new URL(targetUrl);
  } catch {
    return res.status(412).json({ error: 'Precondition Failed: Invalid URL' });
  }

  // Check domain
  if (!url.hostname.endsWith('.fal.ai') && !url.hostname.endsWith('.fal.run')) {
    return res.status(412).json({ error: 'Precondition Failed: URL must point to *.fal.ai or *.fal.run' });
  }

  // Check content type for POST requests
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];
    if (contentType && !contentType.includes('application/json')) {
      return res.status(415).json({ error: 'Unsupported Media Type: Only application/json is supported' });
    }
  }

  // Get API key from environment
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Internal Server Error: FAL_KEY not configured' });
  }

  try {
    // Prepare headers for the target request
    const headers: Record<string, string> = {
      'Authorization': `Key ${apiKey}`,
    };

    // Add content-type for POST requests
    if (req.method === 'POST') {
      headers['Content-Type'] = 'application/json';
    }

    // Make request to target URL
    const targetResponse = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    // Get response data
    const responseData = await targetResponse.json();

    // Copy headers from target response (excluding content-length and content-encoding)
    const responseHeaders: Record<string, string> = {};
    targetResponse.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-length' && key.toLowerCase() !== 'content-encoding') {
        responseHeaders[key] = value;
      }
    });

    // Set headers on our response
    Object.entries(responseHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    // Return response with same status code
    return res.status(targetResponse.status).json(responseData);

  } catch (error: any) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal Server Error: Failed to proxy request' });
  }
}