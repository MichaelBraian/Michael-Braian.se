import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../[...nextauth]/route"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    return NextResponse.json(session ? { session } : { session: null })
  } catch (error) {
    console.error('Error in session route:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const runtime = "nodejs";
