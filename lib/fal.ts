interface FalImageRequest {
  prompt: string
  image_url?: string
  width?: number
  height?: number
  num_inference_steps?: number
  guidance_scale?: number
  strength?: number
  enable_safety_checker?: boolean
}

interface FalVideoRequest {
  prompt: string
  image_url: string
  duration?: '6' | '10'
  prompt_optimizer?: boolean
}

export async function generateImageWithFal(params: FalImageRequest): Promise<string> {
  try {
    const response = await fetch('/api/fal/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`Failed to generate image: ${response.status} - ${errorData}`)
    }

    const result = await response.json()
    return result.imageUrl
  } catch (error: any) {
    console.error('Fal.ai API error:', error)
    throw new Error(error.message || 'Failed to generate image with Fal.ai')
  }
}

export async function generateVideoWithFal(params: FalVideoRequest): Promise<string> {
  try {
    const response = await fetch('/api/fal/generate-video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`Failed to generate video: ${response.status} - ${errorData}`)
    }

    const result = await response.json()
    return result.videoUrl
  } catch (error: any) {
    console.error('Fal.ai Video API error:', error)
    throw new Error(error.message || 'Failed to generate video with Fal.ai')
  }
}

export async function uploadImageToFal(imageFile: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', imageFile)

    const response = await fetch('/api/fal/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(`Failed to upload image: ${response.status} - ${errorData}`)
    }

    const result = await response.json()
    return result.url
  } catch (error: any) {
    console.error('Image upload error:', error)
    throw new Error(error.message || 'Failed to upload image')
  }
}