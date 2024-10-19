"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [pendingUsers, setPendingUsers] = useState([])

  useEffect(() => {
    if (status === 'unauthenticated' || (session?.user?.role !== 'admin')) {
      router.push('/login')
    } else {
      fetchPendingUsers()
    }
  }, [status, session, router])

  const fetchPendingUsers = async () => {
    const response = await fetch('/api/admin/pending-users')
    const data = await response.json()
    setPendingUsers(data.users)
  }

  const approveUser = async (userId) => {
    const response = await fetch('/api/admin/approve-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })

    if (response.ok) {
      toast({ title: "User approved successfully" })
      fetchPendingUsers()
    } else {
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
