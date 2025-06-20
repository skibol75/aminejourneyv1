import { callFalProxy } from './fal-proxy';

interface FalKontextInput {
  prompt: string;
  image_url: string;
  aspect_ratio?: string;
  num_images?: number;
  output_format?: 'jpeg' | 'png';
  sync_mode?: boolean;
  safety_tolerance?: '1' | '2' | '3' | '4' | '5' | '6';
  guidance_scale?: number;
  seed?: number;
}

interface FalQueueResponse {
  status: 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED';
  request_id: string;
  response_url?: string;
  status_url: string;
  cancel_url: string;
  logs?: any;
  metrics?: any;
  queue_position?: number;
}

interface FalKontextOutput {
  prompt: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    content_type: string;
    file_name: string;
    file_size: number;
  }>;
  timings: Record<string, number>;
  has_nsfw_concepts: boolean[];
  seed: number;
}

interface FalGenerationParams {
  prompt: string;
  image_url?: string;
  width?: number;
  height?: number;
  guidance_scale?: number;
}

// Convert width/height to aspect ratio format expected by Fal.ai
function getAspectRatioFromDimensions(width: number, height: number): string {
  if (width === height) return '1:1';
  if (width === 1344 && height === 768) return '16:9';
  if (width === 768 && height === 1344) return '9:16';
  if (width === 1024 && height === 1024) return '1:1';
  
  // Calculate ratio and find closest match
  const ratio = width / height;
  if (Math.abs(ratio - 21/9) < 0.1) return '21:9';
  if (Math.abs(ratio - 16/9) < 0.1) return '16:9';
  if (Math.abs(ratio - 4/3) < 0.1) return '4:3';
  if (Math.abs(ratio - 3/2) < 0.1) return '3:2';
  if (Math.abs(ratio - 2/3) < 0.1) return '2:3';
  if (Math.abs(ratio - 3/4) < 0.1) return '3:4';
  if (Math.abs(ratio - 9/16) < 0.1) return '9:16';
  if (Math.abs(ratio - 9/21) < 0.1) return '9:21';
  
  // Default fallback
  return '1:1';
}

export async function generateImageWithFal(params: FalGenerationParams): Promise<string> {
  try {
    // Prepare the request payload according to the OpenAPI spec
    const payload: FalKontextInput = {
      prompt: params.prompt,
      image_url: params.image_url || '', // Required field according to spec
      aspect_ratio: getAspectRatioFromDimensions(params.width || 1024, params.height || 1024),
      num_images: 1,
      output_format: 'jpeg',
      sync_mode: false, // Use async mode for better UX
      safety_tolerance: '2', // Default safety level
      guidance_scale: params.guidance_scale || 3.5,
      seed: Math.floor(Math.random() * 1000000)
    };

    // Submit request to the queue endpoint via proxy
    const queueResult: FalQueueResponse = await callFalProxy({
      url: 'https://queue.fal.run/fal-ai/flux-pro/kontext',
      method: 'POST',
      body: payload
    });

    console.log('Queue result:', queueResult);

    // Poll for results using the status URL
    return await pollForResult(queueResult.request_id);
    
  } catch (error: any) {
    console.error('Fal.ai API error:', error);
    throw new Error(error.message || 'Failed to generate image with Fal.ai');
  }
}

async function pollForResult(requestId: string): Promise<string> {
  const maxAttempts = 60; // 5 minutes with 5-second intervals
  let attempts = 0;

  while (attempts < maxAttempts) {
    try {
      const status: FalQueueResponse = await callFalProxy({
        url: `https://queue.fal.run/fal-ai/flux-pro/kontext/requests/${requestId}/status`,
        method: 'GET'
      });

      console.log('Poll status:', status);

      if (status.status === 'COMPLETED' && status.response_url) {
        const result: FalKontextOutput = await callFalProxy({
          url: status.response_url,
          method: 'GET'
        });
        
        if (result.images && result.images.length > 0) {
          return result.images[0].url;
        }
      }

      if (status.status === 'COMPLETED' && !status.response_url) {
        // Try to get result directly using the request ID
        try {
          const result: FalKontextOutput = await callFalProxy({
            url: `https://queue.fal.run/fal-ai/flux-pro/kontext/requests/${requestId}`,
            method: 'GET'
          });
          
          if (result.images && result.images.length > 0) {
            return result.images[0].url;
          }
        } catch (error) {
          console.log('Direct result fetch failed, continuing to poll...');
        }
      }

      // Wait 5 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    } catch (error) {
      console.error('Polling error:', error);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  throw new Error('Generation timeout. Please try again.');
}

export async function uploadImageToFal(imageFile: File): Promise<string> {
  try {
    // Use Fal.ai's file upload service via proxy
    const formData = new FormData();
    formData.append('file', imageFile);

    // For file uploads, we need to handle this differently since it's not JSON
    const response = await fetch('/api/fal/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to upload image: ${response.status} - ${errorData}`);
    }

    const result = await response.json();
    return result.url;
  } catch (error: any) {
    console.error('Image upload error:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
}