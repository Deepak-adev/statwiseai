export interface SurveyData {
  id: string
  timestamp: string
  [key: string]: string | number
}

export interface ParsedCSVData {
  headers: string[]
  data: SurveyData[]
  summary: {
    totalRows: number
    totalColumns: number
    dataQuality: number
    missingValues: number
  }
}

export function parseCSV(csvText: string): ParsedCSVData {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))

  const data: SurveyData[] = []
  let missingValues = 0

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim().replace(/"/g, ""))
    const row: SurveyData = {
      id: `row-${i}`,
      timestamp: new Date().toISOString(),
    }

    headers.forEach((header, index) => {
      const value = values[index] || ""
      if (!value) missingValues++

      // Try to convert to number if possible
      const numValue = Number.parseFloat(value)
      row[header] = isNaN(numValue) ? value : numValue
    })

    data.push(row)
  }

  const totalCells = (lines.length - 1) * headers.length
  const dataQuality = Math.round(((totalCells - missingValues) / totalCells) * 100)

  return {
    headers,
    data,
    summary: {
      totalRows: data.length,
      totalColumns: headers.length,
      dataQuality,
      missingValues,
    },
  }
}

export function generateInsights(data: SurveyData[]): string[] {
  const insights: string[] = []

  if (data.length === 0) return insights

  // Sample insights based on data patterns
  insights.push(`Analyzed ${data.length} survey responses`)

  // Find numeric columns for analysis
  const numericColumns = Object.keys(data[0]).filter(
    (key) => key !== "id" && key !== "timestamp" && typeof data[0][key] === "number",
  )

  if (numericColumns.length > 0) {
    const avgColumn = numericColumns[0]
    const values = data.map((row) => row[avgColumn] as number).filter((v) => !isNaN(v))
    const average = values.reduce((sum, val) => sum + val, 0) / values.length
    insights.push(`Average ${avgColumn}: ${average.toFixed(2)}`)
  }

  // Find text columns for sentiment analysis
  const textColumns = Object.keys(data[0]).filter(
    (key) => key !== "id" && key !== "timestamp" && typeof data[0][key] === "string",
  )

  if (textColumns.length > 0) {
    insights.push(`Detected ${textColumns.length} text-based response fields`)

    // Simple sentiment analysis
    const positiveWords = ["good", "great", "excellent", "amazing", "love", "perfect", "satisfied"]
    const negativeWords = ["bad", "terrible", "awful", "hate", "disappointed", "poor", "unsatisfied"]

    let positiveCount = 0
    let negativeCount = 0

    data.forEach((row) => {
      textColumns.forEach((col) => {
        const text = (row[col] as string).toLowerCase()
        if (positiveWords.some((word) => text.includes(word))) positiveCount++
        if (negativeWords.some((word) => text.includes(word))) negativeCount++
      })
    })

    const totalSentiment = positiveCount + negativeCount
    if (totalSentiment > 0) {
      const positivePercent = Math.round((positiveCount / totalSentiment) * 100)
      insights.push(`Sentiment Analysis: ${positivePercent}% positive responses`)
    }
  }

  return insights
}

export function generateChartData(data: SurveyData[], columnName: string) {
  if (!data.length) return []

  const values = data.map((row) => row[columnName])
  const isNumeric = typeof values[0] === "number"

  if (isNumeric) {
    // Create histogram for numeric data
    const numValues = values as number[]
    const min = Math.min(...numValues)
    const max = Math.max(...numValues)
    const bins = 5
    const binSize = (max - min) / bins

    const histogram = Array(bins)
      .fill(0)
      .map((_, i) => ({
        name: `${(min + i * binSize).toFixed(1)}-${(min + (i + 1) * binSize).toFixed(1)}`,
        value: 0,
      }))

    numValues.forEach((val) => {
      const binIndex = Math.min(Math.floor((val - min) / binSize), bins - 1)
      histogram[binIndex].value++
    })

    return histogram
  } else {
    // Create frequency chart for categorical data
    const frequency: { [key: string]: number } = {}
    values.forEach((val) => {
      const key = String(val)
      frequency[key] = (frequency[key] || 0) + 1
    })

    return Object.entries(frequency)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10) // Top 10 categories
  }
}
