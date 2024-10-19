import { NextResponse } from 'next/server'

export async function GET() {
  const requiredEnvVars = [
    'NEXTAUTH_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'NEXTAUTH_SECRET',
    'EMAIL_USER',
    'EMAIL_PASS',
    'OPENAI_API_KEY',
    'OPENAI_ASSISTANT_ID'
  ]

  const envStatus = requiredEnvVars.reduce((acc, key) => {
    acc[key] = process.env[key] ? 'Set' : 'Not set'
    return acc
  }, {} as Record<string, string>)

  envStatus['NODE_ENV'] = process.env.NODE_ENV || 'Not set'

  return NextResponse.json(envStatus)
}

export const dynamic = 'force-dynamic'

export const runtime = "edge";
