import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { userId } = await req.json()

  // Here, you would update the user's status in your database
  // Since we've removed Prisma, you'll need to implement this using your new database solution
  // For now, we'll just return a success message

  return NextResponse.json({ message: 'User approved successfully' })
}

export const dynamic = 'force-dynamic'

export const runtime = "nodejs";
