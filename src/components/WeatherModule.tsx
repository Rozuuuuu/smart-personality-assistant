"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain } from "lucide-react"

interface WeatherData {
  temperature: number
  condition: string
}

const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, options: RequestInit, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, i) * 1000;
        console.log(`Rate limited. Retrying after ${waitTime}ms`);
        await delay(waitTime);
      } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response;
      }
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
  throw new Error('Max retries reached');
};

export default function WeatherModule() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async (city: string = 'Cebu City') => {
    const url = `https://open-weather13.p.rapidapi.com/city/${encodeURIComponent(city)}/PH`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
        'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
      }
    };

    try {
      console.log('Fetching weather data...');
      const response = await fetchWithRetry(url, options);
      const data = await response.json();
      console.log('Weather data received:', data);
      setWeather({
        temperature: kelvinToCelsius(data.main.temp),
        condition: data.weather[0].main
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Error fetching weather data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchWeather('Cebu City');
    const interval = setInterval(() => fetchWeather('Cebu City'), 600000); // Refresh every 10 minutes

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    console.log('NEXT_PUBLIC_RAPIDAPI_KEY:', process.env.NEXT_PUBLIC_RAPIDAPI_KEY ? 'Set' : 'Not set');
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="h-6 w-6" />
      case 'clouds':
        return <Cloud className="h-6 w-6" />
      case 'rain':
        return <CloudRain className="h-6 w-6" />
      default:
        return <Sun className="h-6 w-6" />
    }
  }

  if (error) {
    return <Card><CardContent className="pt-6 text-red-500">{error}</CardContent></Card>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather in Cebu City</CardTitle>
      </CardHeader>
      <CardContent>
        {weather ? (
          <div className="flex items-center space-x-4">
            {getWeatherIcon(weather.condition)}
            <div>
              <p className="text-2xl font-bold">{Math.round(weather.temperature)}°C</p>
              <p className="text-muted-foreground">{weather.condition}</p>
            </div>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </CardContent>
    </Card>
  )
}

