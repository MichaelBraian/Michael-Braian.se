import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config() // This ensures .env file is properly loaded

const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

let loginAttempts = 0
let lastAttemptTime = 0

export async function POST(req: Request) {
  const currentTime = Date.now()
  
  if (loginAttempts >= MAX_ATTEMPTS && currentTime - lastAttemptTime < LOCKOUT_TIME) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 })
  }

  const { password } = await req.json()

  // Read HASHED_PASSWORD directly from .env file
  const envPath = path.resolve(process.cwd(), '.env')
  const envContent = fs.readFileSync(envPath, 'utf-8')
  const hashedPasswordMatch = envContent.match(/HASHED_PASSWORD="(.+)"/)
  const hashedPassword = hashedPasswordMatch ? hashedPasswordMatch[1] : ''

  console.log('Env content:', envContent)
  console.log('Hashed password from file:', hashedPassword)
  console.log('Received password:', password)

  if (!hashedPassword) {
    console.error('HASHED_PASSWORD not found in .env file')
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }

  const isPasswordValid = await bcrypt.compare(password, hashedPassword)
  console.log('Is password valid:', isPasswordValid)

  if (isPasswordValid) {
    loginAttempts = 0

    const token = sign({ authorized: true }, process.env.JWT_SECRET!, { expiresIn: '1h' })

    cookies().set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })

    return NextResponse.json({ success: true })
  } else {
    loginAttempts++
    lastAttemptTime = currentTime

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
}
