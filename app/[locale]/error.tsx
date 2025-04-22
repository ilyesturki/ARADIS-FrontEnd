'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled Error:', error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-5xl font-bold text-red-500">Something went wrong</h1>
      <p className="mt-4 text-gray-700">
        An unexpected error occurred. Please try again or contact support.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 rounded bg-red-600 px-5 py-2 text-white hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </main>
  )
}
