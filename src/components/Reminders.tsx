"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Reminder {
  id: number
  text: string
  time: string
}

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [newReminder, setNewReminder] = useState("")
  const [newReminderTime, setNewReminderTime] = useState("")

  useEffect(() => {
    const storedReminders = localStorage.getItem("reminders")
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("reminders", JSON.stringify(reminders))
  }, [reminders])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      reminders.forEach(reminder => {
        if (new Date(reminder.time) <= now) {
          alert(`Reminder: ${reminder.text}`)
          setReminders(prevReminders => prevReminders.filter(r => r.id !== reminder.id))
        }
      })
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [reminders])

  const addReminder = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReminder.trim() === "" || newReminderTime === "") {
      alert('Please enter both reminder text and time')
      return
    }

    setReminders([...reminders, { id: Date.now(), text: newReminder, time: newReminderTime }])
    setNewReminder("")
    setNewReminderTime("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addReminder} className="space-y-4">
          <div>
            <Label htmlFor="reminder-text">Reminder</Label>
            <Input
              id="reminder-text"
              value={newReminder}
              onChange={(e) => setNewReminder(e.target.value)}
              placeholder="Enter reminder text"
            />
          </div>
          <div>
            <Label htmlFor="reminder-time">Time</Label>
            <Input
              id="reminder-time"
              type="datetime-local"
              value={newReminderTime}
              onChange={(e) => setNewReminderTime(e.target.value)}
            />
          </div>
          <Button type="submit">Add Reminder</Button>
        </form>
        <ul className="mt-4 space-y-2">
          {reminders.map(reminder => (
            <li key={reminder.id}>
              {reminder.text} - {new Date(reminder.time).toLocaleString()}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

