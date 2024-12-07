"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
  {
    text: "I have not failed. I've just found 10,000 ways that won't work.",
    author: "Thomas A. Edison"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney"
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett"
  },
  {
    text: "Happiness is not something ready-made. It comes from your own actions.",
    author: "Dalai Lama"
  },
  {
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar"
  },
  {
    text: "I am not a product of my circumstances. I am a product of my decisions.",
    author: "Stephen Covey"
  },
  {
    text: "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    text: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh"
  }
]

export default function QuoteNotification() {
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const today = new Date()
    setQuoteIndex(today.getDate() % quotes.length)

    const timer = setInterval(() => {
      const now = new Date()
      if (now.getDate() !== currentDate.getDate()) {
        setQuoteIndex(now.getDate() % quotes.length)
        setCurrentDate(now)
      }
    }, 60000) // Check every minute

    return () => clearInterval(timer)
  }, [currentDate])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center">
          <span className="mr-2">🌟</span> Daily Quote
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {currentDate.toLocaleDateString()}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
          <p className="text-lg font-serif italic mb-2">"{quotes[quoteIndex].text}"</p>
          <p className="text-right text-sm text-muted-foreground">- {quotes[quoteIndex].author}</p>
        </div>
      </CardContent>
    </Card>
  )
}

