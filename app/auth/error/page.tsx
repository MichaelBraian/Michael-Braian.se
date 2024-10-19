"use client"

import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-red-500">
            Authentication Error
          </CardTitle>
          <CardDescription>
            There was a problem signing you in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Error: {error || 'Unknown error'}
          </p>
          <Link href="/login" passHref>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 ease-in-out">
              Try Again
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}