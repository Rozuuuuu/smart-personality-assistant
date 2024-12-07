"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { User, Moon, Sun } from 'lucide-react'

export default function UserProfile() {
  const [name, setName] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const savedName = localStorage.getItem("userName")
    const savedTheme = localStorage.getItem("theme")
    if (savedName) setName(savedName)
    if (savedTheme) setIsDarkMode(savedTheme === "dark")
  }, [])

  const saveProfile = () => {
    localStorage.setItem("userName", name)
    localStorage.setItem("theme", isDarkMode ? "dark" : "light")
    document.documentElement.classList.toggle("dark", isDarkMode)
  }

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600">
        <CardTitle className="text-white">User Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <User className="h-12 w-12 text-orange-400" />
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              id="dark-mode"
              
checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <Label htmlFor="dark-mode">Dark Mode</Label>
          </div>
          {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </div>
        <Button onClick={saveProfile} className="w-full">Save Preferences</Button>
      </CardContent>
    </Card>
  )
}

