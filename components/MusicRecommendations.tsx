"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Play, Headphones, ExternalLink } from 'lucide-react'

interface Song {
  id: string
  title: string
  artist: string
  views: string
  duration: string
  youtubeUrl: string
  imageUrl: string
}

const biniSongs: Song[] = [
  {
    id: "1",
    title: "Pantropiko",
    artist: "BINI",
    views: "89M",
    duration: "3:42",
    youtubeUrl: "https://www.youtube.com/watch?v=Zx31bB2vMns",
    imageUrl: "/images/bini/pantropiko.jpg"
  },
  {
    id: "2",
    title: "Salamin, Salamin",
    artist: "BINI",
    views: "71M",
    duration: "3:28",
    youtubeUrl: "https://www.youtube.com/watch?v=J1Ip2sC_lss",
    imageUrl: "/images/bini/salamin.jpg"
  },
  {
    id: "3",
    title: "Cherry On Top (Christmas Remix)",
    artist: "BINI",
    views: "42M",
    duration: "3:15",
    youtubeUrl: "https://www.youtube.com/watch?v=wufUX5P2Ds8",
    imageUrl: "/images/bini/cherry-on-top.jpg"
  },
  {
    id: "4",
    title: "Karera",
    artist: "BINI",
    views: "25M",
    duration: "3:36",
    youtubeUrl: "https://www.youtube.com/watch?v=QNV2DmBxChQ",
    imageUrl: "/images/bini/karera.jpg"
  },
  {
    id: "5",
    title: "Lagi",
    artist: "BINI",
    views: "23M",
    duration: "3:22",
    youtubeUrl: "https://www.youtube.com/watch?v=KyndoXN4_ns",
    imageUrl: "/images/bini/lagi.jpg"
  }
]

export default function MusicRecommendations() {
  const [recommendations, setRecommendations] = useState<Song[]>([])

  useEffect(() => {
    setRecommendations(biniSongs)
  }, [])

  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <CardTitle className="flex items-center text-2xl">
          <Headphones className="mr-2" />
          Music Recommendations - Top Trending BINI Songs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <div className="space-y-4">
          {recommendations.map((song, index) => (
            <Link 
              href={song.youtubeUrl} 
              key={song.id} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-4 group hover:bg-gray-100 rounded-lg transition-colors duration-200 p-2 cursor-pointer"
            >
              <div className="flex-shrink-0 relative">
                <Image
                  src={song.imageUrl}
                  alt={`${song.title} by ${song.artist}`}
                  width={160}
                  height={90}
                  className="rounded-md object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Play className="text-white" size={32} />
                </div>
                <Badge variant="secondary" className="absolute
bottom-2 right-2 bg-black bg-opacity-75">
                  {song.duration}
                </Badge>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold group-hover:text-pink-600 transition-colors duration-200 flex items-center">
                  {song.title}
                  <ExternalLink className="ml-2 w-4 h-4" />
                </h3>
                <p className="text-sm text-muted-foreground">{song.artist}</p>
                <p className="text-xs text-muted-foreground mt-1">{song.views} views</p>
              </div>
              <div className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-500">
                {index + 1}
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

