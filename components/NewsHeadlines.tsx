"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface NewsItem {
  title: string;
  link: string;
  photo_url: string;
  published_datetime_utc: string;
  source: string;
}

export default function NewsHeadlines() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      const url = 'https://real-time-news-data.p.rapidapi.com/topic-news-by-section?topic=TECHNOLOGY&section=CAQiW0NCQVNQZ29JTDIwdk1EZGpNWFlTQW1WdUdnSlZVeUlQQ0FRYUN3b0pMMjB2TURKdFpqRnVLaGtLRndvVFIwRkVSMFZVWDFORlExUkpUMDVmVGtGTlJTQUJLQUEqKggAKiYICiIgQ0JBU0Vnb0lMMjB2TURkak1YWVNBbVZ1R2dKVlV5Z0FQAVAB&limit=500&country=US&lang=en';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': 'b26b104c34msh9495b1b24a94d98p1197dejsn39cebd6f78b2',
          'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const result = await response.json();
        setNews(result.data || []);
        setError(null);
      } catch (err) {
        setError('Error fetching news');
        console.error(err);
      }
    };

    fetchNews()
    const interval = setInterval(fetchNews, 3600000) // Refresh every hour

    return () => clearInterval(interval)
  }, [])

  if (error) {
    return <Card><CardContent className="pt-6 text-red-500">{error}</CardContent></Card>
  }

  return (
    <Card className="h-[400px]">
      <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600">
        <CardTitle className="text-white">Technology News</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {news.length > 0 ? (
            <ul className="space-y-4">
              {news.map((item, index) => (
                <li key={index} className="flex space-x-4">
                  {item.photo_url && (
                    <img 
                      src={item.photo_url} 
                      alt={item.title} 
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:underline font-medium"
                    >
                      {item.title}
                    </a>
                    <p className="text-sm text-gray-600">
                      {new Date(item.published_datetime_utc).toLocaleString()} - {item.source}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading news headlines...</p>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

