import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = /mobile/i.test(userAgent)

  const personalizedContent = {
    layout: isMobile ? 'mobile' : 'desktop',
    greeting: `Hello, ${isMobile ? 'mobile' : 'desktop'} user!`,
  }

  return NextResponse.json(personalizedContent)
}

