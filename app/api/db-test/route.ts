import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
      }
    })
    return NextResponse.json({ 
      message: 'Database connection successful', 
      usersCount: users.length,
      users: users
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 })
  }
}

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';
