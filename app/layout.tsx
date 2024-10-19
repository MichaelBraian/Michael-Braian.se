import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from './AuthProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Chat Dashboard',
  description: 'Interact with various AI chat models',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  )
}
