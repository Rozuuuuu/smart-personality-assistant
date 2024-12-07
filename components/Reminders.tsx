"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Plus, Trash2 } from 'lucide-react'

interface Reminder {
  id: number
  text: string
  time: string
}

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [newReminder, setNewReminder] = useState("")
  const [newReminderTime, setNewReminderTime] = useState("")

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

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600">
        <CardTitle className="text-white">Reminders</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={addReminder} className="space-y-4 mb-6">
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
          <Button type="submit" className="w-full"><Plus className="mr-2 h-4 w-4" /> Add Reminder</Button>
        </form>
        <ul className="space-y-2">
          {reminders.map(reminder => (
            <li key={reminder.id} className="flex items-center justify-between p-2 rounded-md transition-all duration-300 hover:bg-gray-700">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4 text-green-400" />
                <span>{reminder.text} - {new Date(reminder.time).toLocaleString()}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteReminder(reminder.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

