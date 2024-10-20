import { NextResponse } from 'next/server';

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

      // Here, you would check the user status in your database
      // Since we've removed Prisma, you'll need to implement this using your new database solution
      // For now, we'll just return a success message

      return NextResponse.json({ message: 'OTP verified successfully' });
    } else {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json({ error: 'Failed to verify OTP', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
