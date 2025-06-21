import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Call Fal.ai API
    const response = await fetch('https://queue.fal.run/fal-ai/flux-pro', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.text()
      return NextResponse.json(
        { error: `Fal.ai API error: ${errorData}` },
        { status: response.status }
      )
    }

    const result = await response.json()
    
    // Return the first image URL
    if (result.images && result.images.length > 0) {
      return NextResponse.json({ imageUrl: result.images[0].url })
    }
    
    return NextResponse.json(
      { error: 'No image generated' },
      { status: 500 }
    )
  } catch (error: any) {
    console.error('Generate image error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}