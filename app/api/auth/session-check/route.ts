import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../[...nextauth]/options"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    return NextResponse.json({ session, status: 'success' })
  } catch (error) {
    console.error('Error in session check route:', error)
    return NextResponse.json({ error: 'Internal Server Error', status: 'error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'