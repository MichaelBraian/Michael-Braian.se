"use client"

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, RefreshCw, Paperclip } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

interface Message {
  role: 'user' | 'assistant'
  content: string
  file?: File
}

export default function ChatInterface() {
  const { id } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [threadId, setThreadId] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !selectedFile) return

    const userMessage: Message = { role: 'user', content: input }
    if (selectedFile) {
      userMessage.file = selectedFile
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setSelectedFile(null)
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('message', input)
      formData.append('threadId', threadId || '')
      if (selectedFile) {
        formData.append('file', selectedFile)
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let assistantMessage: Message = { role: 'assistant', content: '' }
        setMessages(prev => [...prev, assistantMessage])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(5))
                if (data.type === 'done') {
                  setIsLoading(false)
                  setThreadId(data.threadId)
                  break
                }
                assistantMessage.content += data.content
                setMessages(prev => [...prev.slice(0, -1), { ...assistantMessage }])
              } catch (error) {
                console.error('Error parsing JSON:', error)
              }
            }
          }
        }
      } else {
        throw new Error('No reader available for response body')
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      toast({
        title: "Error",
        description: "Failed to get a response from the AI. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleReset = async () => {
    setMessages([])
    setThreadId(null)
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }

    try {
      const response = await fetch('/api/chat/reset', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Failed to reset chat')
      }
      const data = await response.json()
      setThreadId(data.threadId)
    } catch (error) {
      console.error('Error resetting chat:', error)
      toast({
        title: "Error",
        description: "Failed to reset the chat. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      toast({
        title: "File selected",
        description: `${file.name} is ready to be sent with your next message.`,
      })
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="flex-grow flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-500/10 to-teal-400/10 flex justify-between items-center">
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Chat with AI Assistant
          </CardTitle>
          <Button onClick={handleReset} variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden">
          <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-start ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{message.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white ml-2' 
                      : 'bg-gray-200 dark:bg-gray-700 mr-2'
                  }`}>
                    {message.content}
                    {message.file && <div className="text-xs mt-1">Attached: {message.file.name}</div>}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="dot-flashing"></div>
                </div>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button type="button" onClick={() => fileInputRef.current?.click()} variant="outline" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow rounded-full"
              disabled={isLoading}
            />
            <Button type="submit" className="rounded-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500" disabled={isLoading}>
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
