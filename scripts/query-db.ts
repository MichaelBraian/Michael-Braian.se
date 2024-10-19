import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  try {
    const users = await prisma.user.findMany()
    console.log('All users:', users)
  } catch (error) {
    console.error('Error querying the database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
