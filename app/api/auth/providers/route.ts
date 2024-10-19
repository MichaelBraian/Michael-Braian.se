import { NextResponse } from 'next/server'
import { getProviders } from "next-auth/react"

export async function GET() {
  try {
    const providers = await getProviders()
    return NextResponse.json(providers)
  } catch (error) {
    console.error('Error in providers route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'

export const runtime = "edge";
