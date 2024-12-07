"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface NewsItem {
  title: string
  url: string
}

export default function NewsHeadlines() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`)
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setNews(data.articles.slice(0, 5))
        setError(null)
      } catch (err) {
        setError('Error fetching news')
        console.error(err)
      }
    }

    fetchNews()
    const interval = setInterval(fetchNews, 3600000) // Refresh every hour

    return () => clearInterval(interval)
  }, [])

  if (error) {
    return <Card><CardContent className="pt-6 text-red-500">{error}</CardContent></Card>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>News Headlines</CardTitle>
      </CardHeader>
      <CardContent>
        {news.length > 0 ? (
          <ul className="space-y-2">
            {news.map((item, index) => (
              <li key={index}>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading news headlines...</p>
        )}
      </CardContent>
    </Card>
  )
}

