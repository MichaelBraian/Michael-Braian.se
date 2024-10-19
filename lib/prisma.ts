// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

// Standard Prisma Client instance for NextAuth
export const prisma = new PrismaClient();

// Extended Prisma Client instance with Accelerate extension
export const prismaWithAccelerate = prisma.$extends(withAccelerate());

// Export the extended client as default if you prefer to use it elsewhere
export default prismaWithAccelerate;
