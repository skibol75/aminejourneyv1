import { NextRequest, NextResponse } from 'next/server'
import { enhancePrompt } from '@/lib/ai'

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const enhancedPrompt = await enhancePrompt(prompt)
    
    return NextResponse.json({ enhancedPrompt })
  } catch (error: any) {
    console.error('Enhance prompt error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}