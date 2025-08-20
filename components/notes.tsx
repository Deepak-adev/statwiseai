"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface NotesProps {
  storageKey: string
  title?: string
  description?: string
}

export function Notes({ storageKey, title = "Notes", description = "Jot down findings, questions, and next steps." }: NotesProps) {
  const [value, setValue] = useState("")

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setValue(saved)
    } catch {}
  }, [storageKey])

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, value)
    } catch {}
  }, [storageKey, value])

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <textarea
          className="w-full h-40 p-3 border border-slate-200 rounded-md text-sm bg-white placeholder:text-slate-400"
          placeholder="Type your notes here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </CardContent>
    </Card>
  )
}


