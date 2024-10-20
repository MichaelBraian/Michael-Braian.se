import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../[...nextauth]/options"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    return NextResponse.json(session)
  } catch (error) {
    console.error('Error in custom session route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic';
