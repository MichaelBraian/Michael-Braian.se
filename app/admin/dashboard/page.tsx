"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

const aiChats = [
  { id: 'openai', name: 'OpenAI Chat', description: 'Chat with OpenAI models', icon: () => <span>🤖</span> },
  { id: 'anthropic', name: 'Anthropic Chat', description: 'Interact with Anthropic AI', icon: () => <span>🧠</span> },
  { id: 'custom', name: 'Custom AI', description: 'Your own AI implementation', icon: () => <span>🔧</span> },
]

type User = {
  id: string
  email: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [pendingUsers, setPendingUsers] = useState<User[]>([])

  useEffect(() => {
    if (status === 'unauthenticated' || (session?.user?.role !== 'admin')) {
      router.push('/login')
    } else {
      fetchPendingUsers()
    }
  }, [status, session, router])

  const fetchPendingUsers = async () => {
    try {
      const response = await fetch('/api/admin/pending-users')
      const data = await response.json()
      setPendingUsers(data.users)
    } catch (error) {
      console.error('Error fetching pending users:', error)
      toast({ title: "Failed to fetch pending users", variant: "destructive" })
    }
  }

  const approveUser = async (userId: string) => {
    try {
      const response = await fetch('/api/admin/approve-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        toast({ title: "User approved successfully" })
        fetchPendingUsers()
      } else {
        const errorData = await response.json()
        toast({ title: errorData.error || "Error approving user", variant: "destructive" })
      }
    } catch (error) {
      console.error('Error approving user:', error)
      toast({ title: "Error approving user", variant: "destructive" })
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Pending Users</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingUsers.map((user) => (
            <div key={user.id} className="flex justify-between items-center mb-4">
              <span>{user.email}</span>
              <Button onClick={() => approveUser(user.id)}>Approve</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
