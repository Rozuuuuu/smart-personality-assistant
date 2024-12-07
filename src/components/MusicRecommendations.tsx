"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Song {
  name: string
  artist: string
}

export default function MusicRecommendations() {
  const [recommendations, setRecommendations] = useState<Song[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // This is a mock API call. Replace with actual API when available.
        const mockData = [
          { name: "Bohemian Rhapsody", artist: "Queen" },
          { name: "Imagine", artist: "John Lennon" },
          { name: "Like a Rolling Stone", artist: "Bob Dylan" },
          { name: "Smells Like Teen Spirit", artist: "Nirvana" },
          { name: "Billie Jean", artist: "Michael Jackson" },
        ]
        setRecommendations(mockData)
        setError(null)
      } catch (err) {
        setError('Error fetching music recommendations')
        console.error(err)
      }
    }

    fetchRecommendations()
    const interval = setInterval(fetchRecommendations, 86400000) // Refresh daily

    return () => clearInterval(interval)
  }, [])

  if (error) {
    return <Card><CardContent className="pt-6 text-red-500">{error}</CardContent></Card>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Music Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <ul className="space-y-2">
            {recommendations.map((song, index) => (
              <li key={index}>
                {song.name} by {song.artist}
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading music recommendations...</p>
        )}
      </CardContent>
    </Card>
  )
}

