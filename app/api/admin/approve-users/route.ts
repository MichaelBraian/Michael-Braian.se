import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const { userId } = await req.json()

  await prisma.user.update({
    where: { id: userId },
    data: { status: 'approved' },
  })

  return NextResponse.json({ message: 'User approved successfully' })
}

export const runtime = "edge";
