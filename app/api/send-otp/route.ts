import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";

// This should be the same object used in send-otp route
const otps: { [email: string]: string } = {};

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[email] = otp;

    // TODO: Implement email sending logic here
    console.log(`OTP for ${email}: ${otp}`); // For testing purposes

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json({ error: 'Failed to send OTP', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const dynamic = 'force-dynamic';
