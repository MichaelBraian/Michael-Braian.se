import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/options"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    return NextResponse.json({ 
      status: 'ok',
      session: session ? 'authenticated' : 'unauthenticated'
    })
  } catch (error) {
    console.error('Error in auth check route:', error)
    return NextResponse.json({ error: 'Internal Server Error', status: 'error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'

export const runtime = "nodejs"
