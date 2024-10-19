"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

const aiChats = [
  { id: 'openai', name: 'OpenAI Chat', description: 'Chat with OpenAI models', icon: () => <span>🤖</span> },
  { id: 'anthropic', name: 'Anthropic Chat', description: 'Interact with Anthropic AI', icon: () => <span>🧠</span> },
  { id: 'custom', name: 'Custom AI', description: 'Your own AI implementation', icon: () => <span>🔧</span> },
]

export default function Dashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Welcome, {session.user?.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Logged in as: {session.user?.email}
          </p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiChats.map((chat) => (
          <Card key={chat.id} className="overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-teal-400/10 p-6">
              <div className="flex items-center space-x-4">
                {chat.icon()}
                <div>
                  <CardTitle>{chat.name}</CardTitle>
                  <CardDescription>{chat.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-semibold py-2 rounded-md transition-all duration-300 ease-in-out"
                onClick={() => router.push(`/chat/${chat.id}`)}
              >
                Start Chat
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}