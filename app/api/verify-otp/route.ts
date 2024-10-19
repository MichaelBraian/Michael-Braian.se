import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// This should be the same object used in send-otp route
const otps: { [email: string]: string } = {};

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!otps[email]) {
      return NextResponse.json({ error: 'No OTP found for this email' }, { status: 400 });
    }

    if (otps[email] === otp) {
      delete otps[email]; // Remove the OTP after successful verification

      // Check user status
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      if (user.status === 'pending') {
        return NextResponse.json({ error: 'Your account is pending approval' }, { status: 403 });
      }

      return NextResponse.json({ message: 'OTP verified successfully' });
    } else {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Failed to verify OTP', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
