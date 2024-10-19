import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/options"
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const pendingUsers = await prisma.user.findMany({
    where: { status: 'pending' },
    select: { id: true, email: true },
  })

  return NextResponse.json({ users: pendingUsers })
}

