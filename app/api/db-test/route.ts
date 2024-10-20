import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Remove Prisma-related code
    // For now, we'll just return a placeholder message
    return NextResponse.json({ message: "Database connection removed. Please implement a new database solution." });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';
