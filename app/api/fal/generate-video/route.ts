import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Call Fal.ai Video API
    const response = await fetch('https://queue.fal.run/fal-ai/minimax/hailuo-02/standard/image-to-video', {
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
        { error: `Fal.ai Video API error: ${errorData}` },
        { status: response.status }
      )
    }

    const result = await response.json()
    
    // Return the video URL
    if (result.video && result.video.url) {
      return NextResponse.json({ videoUrl: result.video.url })
    }
    
    return NextResponse.json(
      { error: 'No video generated' },
      { status: 500 }
    )
  } catch (error: any) {
    console.error('Generate video error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}