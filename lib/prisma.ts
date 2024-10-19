// lib/prisma.ts
import { PrismaClient } from '@prisma/client/edge'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

export default prisma
