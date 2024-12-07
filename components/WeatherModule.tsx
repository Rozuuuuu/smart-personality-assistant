"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Wind, Droplets, Loader2 } from 'lucide-react'

interface WeatherData {
  temperature: number
  humidity: number
  wind_speed: number
  summary: string
}

export default function WeatherModule() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchWeather = async () => {
      const url = 'https://ai-weather-by-meteosource.p.rapidapi.com/current?lat=10.3157&lon=123.8854&units=metric&language=en';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b26b104c34msh9495b1b24a94d98p1197dejsn39cebd6f78b2',
          'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
        }
      };

      try {
        setLoading(true)
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }
        const data = await response.json()
        setWeather({
          temperature: data.current.temperature,
          humidity: data.current.humidity,
          wind_speed: data.current.wind.speed,
          summary: data.current.summary
        })
        setError(null)
      } catch (err) {
        setError('Error fetching weather data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 600000) ///// Refresh every 10 minutes

    return () => clearInterval(interval)
  }, [])

  const getWeatherIcon = (summary: string) => {
    switch (summary.toLowerCase()) {
      case 'clear':
        return <Sun className="h-10 w-10 text-yellow-400" />
      case 'cloudy':
        return <Cloud className="h-10 w-10 text-gray-400" />
      case 'rain':
        return <CloudRain className="h-10 w-10 text-blue-400" />
      default:
        return <Cloud className="h-10 w-10 text-gray-400" />
    }
  }

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600">
        <CardTitle className="text-white">Weather in Cebu</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : weather ? (
          <div className="flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              {getWeatherIcon(weather.summary)}
              <div className="text-right">
                <p className="text-4xl font-bold">{weather.temperature}°C</p>
                <p className="text-xl text-gray-400">{weather.summary}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg transition-all duration-300 hover:bg-gray-700">
                <Droplets className="h-6 w-6 text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-gray-400">Humidity</p>
                  <p className="text-xl font-bold">{weather.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg transition-all duration-300 hover:bg-gray-700">
                <Wind className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-sm font-medium text-gray-400">Wind Speed</p>
                  <p className="text-xl font-bold">{weather.wind_speed} m/s</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No weather data available</p>
        )}
      </CardContent>
    </Card>
  )
}

