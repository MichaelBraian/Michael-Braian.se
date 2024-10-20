'use client'

import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()

  useEffect(() => {
    const checkEnvironment = async () => {
      try {
        const envResponse = await fetch('/api/env-check')
        if (!envResponse.ok) {
          throw new Error('Environment check failed')
        }
        const envData = await envResponse.json()
        
        // Check if any required environment variables are missing
        const missingVars = Object.entries(envData)
          .filter(([key, value]) => value === 'Not set' && key !== 'NODE_ENV')
          .map(([key]) => key)

        if (missingVars.length > 0) {
          console.error('Missing environment variables:', missingVars)
          toast({
            title: "Configuration Error",
            description: `Missing environment variables: ${missingVars.join(', ')}. Please check your .env.local file.`,
            variant: "destructive",
          })
        }
      } catch (error) {
        console.error('Environment check error:', error)
        toast({
          title: "Configuration Error",
          description: "There was a problem with the server configuration. Please check the server logs.",
          variant: "destructive",
        })
      }
    }

    checkEnvironment()
  }, [toast])

  return <SessionProvider>{children}</SessionProvider>
}
