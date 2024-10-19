"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import CustomErrorBoundary from '@/components/CustomErrorBoundary'
import { prisma } from '@/lib/prisma'

export default function Login() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session-check')
        const data = await response.json()
        if (data.session) {
          router.push('/dashboard')
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
      }
    }
    checkAuth()
  }, [router])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (response.ok) {
        setOtpSent(true)
        toast({
          title: "OTP Sent",
          description: "Please check your email for the OTP",
        })
        if (data.otp) {
          console.log('Test OTP:', data.otp)
        }
      } else {
        throw new Error(data.error || 'Failed to send OTP')
      }
    } catch (error) {
      console.error('Error sending OTP:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "Redirecting to dashboard...",
        })
        router.push('/dashboard')
      } else {
        const data = await response.json()
        throw new Error(data.error || 'Invalid OTP')
      }
    } catch (error) {
      console.error('Error verifying OTP:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CustomErrorBoundary>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-[400px] shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email to receive a one-time password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={otpSent ? handleVerifyOTP : handleSendOTP}>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={otpSent}
                />
                {otpSent && (
                  <Input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                )}
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : otpSent ? 'Verify OTP' : 'Send OTP'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </CustomErrorBoundary>
  )
}
