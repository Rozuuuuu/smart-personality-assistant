"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function UserProfile() {
  const [name, setName] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

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
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="dark-mode"
            checked={isDarkMode}
            onCheckedChange={setIsDarkMode}
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
        <Button onClick={saveProfile}>Save Preferences</Button>
      </CardContent>
    </Card>
  )
}

