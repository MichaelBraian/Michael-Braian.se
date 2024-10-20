import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store OTP (you might want to use a more persistent storage in production)
    // otps[email] = otp;

    if (process.env.NODE_ENV === 'production') {
      // Configure nodemailer with your email settings
      const transporter = nodemailer.createTransport({
        host: 'send.one.com',
        port: 465,
        secure: true, // Use SSL
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      try {
        const info = await transporter.sendMail({
          from: `"AI Chat Dashboard" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Your OTP for Login",
          text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
          html: `<b>Your OTP is: ${otp}</b><br>It will expire in 5 minutes.`
        });
        console.log('Message sent: %s', info.messageId);
      } catch (sendError) {
        console.error('Detailed email sending error:', sendError);
        return NextResponse.json({ 
          error: 'Failed to send OTP email', 
          details: sendError instanceof Error ? sendError.message : 'Unknown error' 
        }, { status: 500 });
      }
    } else {
      // For development purposes, we'll skip actual email sending
      console.log('Development mode: OTP for', email, 'is', otp);
    }

    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Failed to process OTP request:', error);
    return NextResponse.json({ 
      error: 'Failed to send OTP',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export const runtime = "nodejs";
