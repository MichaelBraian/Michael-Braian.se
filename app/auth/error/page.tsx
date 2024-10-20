"use client"

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams?.get('error')

  return (
    <div>
      <h1>Error</h1>
      <p>An error occurred: {error}</p>
    </div>
  )
}

export default function ErrorPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorPage />
    </Suspense>
  )
}
