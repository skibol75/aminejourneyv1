import { openai } from '@ai-sdk/openai'
import { generateText, streamText } from 'ai'

export async function enhancePrompt(prompt: string): Promise<string> {
  try {
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: `Enhance this image generation prompt to be more detailed and artistic: "${prompt}". 
      Make it more descriptive while keeping the core concept. Add artistic style, lighting, and composition details.
      Return only the enhanced prompt without explanations.`,
    })
    
    return text
  } catch (error) {
    console.error('Error enhancing prompt:', error)
    return prompt // Return original prompt if enhancement fails
  }
}

export async function generateImagePrompt(description: string) {
  try {
    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      prompt: `Create a detailed image generation prompt based on: "${description}". 
      Include artistic style, composition, lighting, and technical details that would help create a high-quality image.`,
    })
    
    return result.toAIStream()
  } catch (error) {
    console.error('Error generating image prompt:', error)
    throw error
  }
}