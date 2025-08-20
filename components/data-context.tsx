"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { ParsedCSVData } from "@/lib/csv-parser"

interface DataContextType {
  csvData: ParsedCSVData | null
  setCsvData: (data: ParsedCSVData | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  fileName: string
  setFileName: (name: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [csvData, setCsvData] = useState<ParsedCSVData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState("")

  return (
    <DataContext.Provider
      value={{
        csvData,
        setCsvData,
        isLoading,
        setIsLoading,
        fileName,
        setFileName,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
