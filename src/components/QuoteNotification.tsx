"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QuoteNotification() {
  const [quote, setQuote] = useState<string>("")

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random')
        if (!response.ok) {
          throw new Error('Failed to fetch quote')
        }
        const data = await response.json()
        setQuote(data.content)
      } catch (err) {
        console.error('Error fetching quote:', err)
        setQuote('Failed to fetch quote. Please try again later.')
      }
    }

    fetchQuote()
    const interval = setInterval(fetchQuote, 86400000) // Fetch new quote daily

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="italic">{quote || "Loading quote..."}</p>
      </CardContent>
    </Card>
  )
}

