import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  // Here, you would fetch pending users from your database
  // Since we've removed Prisma, you'll need to implement this using your new database solution
  // For now, we'll just return an empty array

  const pendingUsers: { id: string, email: string }[] = []

  return NextResponse.json({ users: pendingUsers })
}
