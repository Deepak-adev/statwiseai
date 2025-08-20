"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useData } from "@/components/data-context"
import { generateInsights } from "@/lib/csv-parser"
import {
  Upload,
  BarChart3,
  Brain,
  Shield,
  Home,
  Zap,
  Download,
  AlertTriangle,
  CheckCircle,
  Users,
  Target,
  Activity,
  Search,
  Bell,
  Settings,
  Share2,
  TrendingUp,
  Globe,
  Pause,
  Play,
  MessageSquare,
  Lightbulb,
  Clock,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Heart,
} from "lucide-react"
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart as RechartsLineChart,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList,
  Treemap,
} from "recharts"

// Mock data for demo - removed unused variable

const chartData = [
  { name: "Jan", responses: 400, satisfaction: 4.2 },
  { name: "Feb", responses: 300, satisfaction: 4.5 },
  { name: "Mar", responses: 600, satisfaction: 4.1 },
  { name: "Apr", responses: 800, satisfaction: 4.7 },
  { name: "May", responses: 700, satisfaction: 4.6 },
  { name: "Jun", responses: 900, satisfaction: 4.8 },
]

const collaborators = [
  { name: "Sarah Chen", role: "Data Analyst", status: "online", avatar: "/placeholder-user.png" },
  { name: "Mike Johnson", role: "Product Manager", status: "away", avatar: "/placeholder-user.png" },
  { name: "Emily Davis", role: "UX Researcher", status: "online", avatar: "/placeholder-user.png" },
]

const notifications = [
  {
    id: 1,
    type: "anomaly",
    message: "Unusual spike in negative sentiment detected",
    time: "2 min ago",
    severity: "high",
  },
  {
    id: 2,
    type: "insight",
    message: "New trend identified: Mobile users show 15% higher satisfaction",
    time: "5 min ago",
    severity: "medium",
  },
  { id: 3, type: "alert", message: "Data quality dropped below 85% threshold", time: "8 min ago", severity: "high" },
  { id: 4, type: "success", message: "Weekly report generated successfully", time: "12 min ago", severity: "low" },
]

const advancedInsights = [
  {
    type: "trend",
    title: "Satisfaction Trend Analysis",
    description: "Customer satisfaction has increased by 23% over the last quarter",
    confidence: 0.94,
    impact: "high",
    recommendation: "Continue current customer service initiatives",
    category: "Performance",
    timestamp: "2 min ago",
    data: [
      { month: "Jan", value: 3.2 },
      { month: "Feb", value: 3.8 },
      { month: "Mar", value: 4.1 },
      { month: "Apr", value: 4.6 },
    ],
  },
  {
    type: "sentiment",
    title: "Sentiment Pattern Detection",
    description: "Negative sentiment spikes detected on weekends, suggesting staffing issues",
    confidence: 0.87,
    impact: "medium",
    recommendation: "Increase weekend support staff by 40%",
    category: "Operations",
    timestamp: "5 min ago",
    data: [
      { day: "Mon", positive: 85, negative: 15 },
      { day: "Tue", positive: 88, negative: 12 },
      { day: "Wed", positive: 90, negative: 10 },
      { day: "Thu", positive: 87, negative: 13 },
      { day: "Fri", positive: 82, negative: 18 },
      { day: "Sat", positive: 65, negative: 35 },
      { day: "Sun", positive: 68, negative: 32 },
    ],
  },
  {
    type: "demographic",
    title: "Demographic Insights",
    description: "Users aged 25-34 show 45% higher engagement with mobile surveys",
    confidence: 0.91,
    impact: "high",
    recommendation: "Optimize mobile survey experience for this demographic",
    category: "User Experience",
    timestamp: "8 min ago",
    data: [
      { age: "18-24", mobile: 65, desktop: 35 },
      { age: "25-34", mobile: 78, desktop: 22 },
      { age: "35-44", mobile: 55, desktop: 45 },
      { age: "45-54", mobile: 42, desktop: 58 },
      { age: "55+", mobile: 28, desktop: 72 },
    ],
  },
  {
    type: "predictive",
    title: "Churn Risk Analysis",
    description: "12% of users show early churn indicators based on response patterns",
    confidence: 0.83,
    impact: "critical",
    recommendation: "Implement retention campaign for at-risk users",
    category: "Retention",
    timestamp: "12 min ago",
    data: [
      { segment: "High Risk", count: 156, percentage: 12 },
      { segment: "Medium Risk", count: 298, percentage: 23 },
      { segment: "Low Risk", count: 846, percentage: 65 },
    ],
  },
  {
    type: "optimization",
    title: "Survey Optimization",
    description: "Questions 3-5 have 67% higher abandonment rate",
    confidence: 0.89,
    impact: "medium",
    recommendation: "Simplify questions 3-5 or move them later in the survey",
    category: "Survey Design",
    timestamp: "15 min ago",
    data: [
      { question: "Q1", completion: 98 },
      { question: "Q2", completion: 95 },
      { question: "Q3", completion: 62 },
      { question: "Q4", completion: 58 },
      { question: "Q5", completion: 55 },
      { question: "Q6", completion: 89 },
    ],
  },
]

const sentimentAnalysis = {
  overall: { positive: 78, negative: 12, neutral: 10 },
  categories: [
    { name: "Product Quality", positive: 85, negative: 10, neutral: 5, trend: "up" },
    { name: "Customer Service", positive: 82, negative: 8, neutral: 10, trend: "up" },
    { name: "Pricing", positive: 65, negative: 25, neutral: 10, trend: "down" },
    { name: "User Experience", positive: 88, negative: 7, neutral: 5, trend: "up" },
    { name: "Support Response", positive: 75, negative: 15, neutral: 10, trend: "stable" },
    { name: "Feature Requests", positive: 70, negative: 20, neutral: 10, trend: "up" },
  ],
  keywords: [
    { word: "excellent", count: 234, sentiment: "positive" },
    { word: "slow", count: 156, sentiment: "negative" },
    { word: "helpful", count: 198, sentiment: "positive" },
    { word: "expensive", count: 89, sentiment: "negative" },
    { word: "intuitive", count: 167, sentiment: "positive" },
    { word: "confusing", count: 78, sentiment: "negative" },
  ],
}

const trendAnalysis = [
  { metric: "Response Rate", current: 78, previous: 72, change: 8.3, trend: "up" },
  { metric: "Completion Rate", current: 85, previous: 81, change: 4.9, trend: "up" },
  { metric: "Avg Response Time", current: 3.2, previous: 4.1, change: -22.0, trend: "up" },
  { metric: "Satisfaction Score", current: 4.6, previous: 4.2, change: 9.5, trend: "up" },
  { metric: "NPS Score", current: 67, previous: 58, change: 15.5, trend: "up" },
  { metric: "Churn Rate", current: 12, previous: 18, change: -33.3, trend: "up" },
]

const aiRecommendations = [
  {
    id: 1,
    type: "optimization",
    priority: "high",
    title: "Optimize Survey Length",
    description: "Reduce survey length by 30% to improve completion rates",
    impact: "Expected 15% increase in completion rate",
    effort: "Medium",
    timeline: "2 weeks",
    category: "Survey Design",
  },
  {
    id: 2,
    type: "targeting",
    priority: "medium",
    title: "Segment Mobile Users",
    description: "Create mobile-specific survey flows for better engagement",
    impact: "Expected 25% increase in mobile completion",
    effort: "High",
    timeline: "4 weeks",
    category: "User Experience",
  },
  {
    id: 3,
    type: "retention",
    priority: "critical",
    title: "Implement Retention Campaign",
    description: "Target at-risk users with personalized follow-up surveys",
    impact: "Expected 40% reduction in churn",
    effort: "Medium",
    timeline: "3 weeks",
    category: "Retention",
  },
  {
    id: 4,
    type: "content",
    priority: "low",
    title: "Update Question Library",
    description: "Refresh question templates based on industry best practices",
    impact: "Expected 10% improvement in response quality",
    effort: "Low",
    timeline: "1 week",
    category: "Content",
  },
]

const anomalyAlerts = [
  {
    id: 1,
    type: "spike",
    severity: "high",
    metric: "Negative Sentiment",
    value: 35,
    threshold: 20,
    timestamp: "2024-01-15 14:30",
    description: "Unusual spike in negative sentiment detected in customer service category",
    affectedSegment: "Customer Service",
    confidence: 0.92,
    trend: "increasing",
  },
  {
    id: 2,
    type: "drop",
    severity: "medium",
    metric: "Response Rate",
    value: 45,
    threshold: 65,
    timestamp: "2024-01-15 13:15",
    description: "Significant drop in response rate for mobile users",
    affectedSegment: "Mobile Users",
    confidence: 0.87,
    trend: "decreasing",
  },
  {
    id: 3,
    type: "pattern",
    severity: "low",
    metric: "Completion Time",
    value: 8.5,
    threshold: 6.0,
    timestamp: "2024-01-15 12:00",
    description: "Unusual pattern in survey completion times during lunch hours",
    affectedSegment: "12:00-14:00 Time Window",
    confidence: 0.74,
    trend: "stable",
  },
  {
    id: 4,
    type: "outlier",
    severity: "critical",
    metric: "Satisfaction Score",
    value: 2.1,
    threshold: 4.0,
    timestamp: "2024-01-15 11:45",
    description: "Critical outlier detected in satisfaction scores for enterprise customers",
    affectedSegment: "Enterprise Customers",
    confidence: 0.96,
    trend: "decreasing",
  },
]

const anomalyTimeSeriesData = [
  { time: "00:00", normal: 85, anomaly: 87, threshold: 90, alerts: 0 },
  { time: "02:00", normal: 83, anomaly: 85, threshold: 90, alerts: 0 },
  { time: "04:00", normal: 81, anomaly: 83, threshold: 90, alerts: 0 },
  { time: "06:00", normal: 88, anomaly: 89, threshold: 90, alerts: 0 },
  { time: "08:00", normal: 92, anomaly: 95, threshold: 90, alerts: 1 },
  { time: "10:00", normal: 89, anomaly: 91, threshold: 90, alerts: 0 },
  { time: "12:00", normal: 87, anomaly: 97, threshold: 90, alerts: 2 },
  { time: "14:00", normal: 85, anomaly: 93, threshold: 90, alerts: 1 },
  { time: "16:00", normal: 90, anomaly: 88, threshold: 90, alerts: 0 },
  { time: "18:00", normal: 86, anomaly: 89, threshold: 90, alerts: 0 },
  { time: "20:00", normal: 84, anomaly: 86, threshold: 90, alerts: 0 },
  { time: "22:00", normal: 82, anomaly: 84, threshold: 90, alerts: 0 },
]

const anomalyHeatmapData = [
  { category: "Product Quality", hour: "00", value: 0.1 },
  { category: "Product Quality", hour: "02", value: 0.2 },
  { category: "Product Quality", hour: "04", value: 0.1 },
  { category: "Product Quality", hour: "06", value: 0.3 },
  { category: "Product Quality", hour: "08", value: 0.8 },
  { category: "Product Quality", hour: "10", value: 0.4 },
  { category: "Product Quality", hour: "12", value: 0.9 },
  { category: "Product Quality", hour: "14", value: 0.7 },
  { category: "Product Quality", hour: "16", value: 0.3 },
  { category: "Product Quality", hour: "18", value: 0.2 },
  { category: "Product Quality", hour: "20", value: 0.1 },
  { category: "Product Quality", hour: "22", value: 0.1 },
  { category: "Customer Service", hour: "00", value: 0.2 },
  { category: "Customer Service", hour: "02", value: 0.1 },
  { category: "Customer Service", hour: "04", value: 0.1 },
  { category: "Customer Service", hour: "06", value: 0.2 },
  { category: "Customer Service", hour: "08", value: 0.6 },
  { category: "Customer Service", hour: "10", value: 0.8 },
  { category: "Customer Service", hour: "12", value: 0.9 },
  { category: "Customer Service", hour: "14", value: 0.8 },
  { category: "Customer Service", hour: "16", value: 0.5 },
  { category: "Customer Service", hour: "18", value: 0.3 },
  { category: "Customer Service", hour: "20", value: 0.2 },
  { category: "Customer Service", hour: "22", value: 0.1 },
  { category: "Pricing", hour: "00", value: 0.1 },
  { category: "Pricing", hour: "02", value: 0.1 },
  { category: "Pricing", hour: "04", value: 0.1 },
  { category: "Pricing", hour: "06", value: 0.2 },
  { category: "Pricing", hour: "08", value: 0.4 },
  { category: "Pricing", hour: "10", value: 0.3 },
  { category: "Pricing", hour: "12", value: 0.5 },
  { category: "Pricing", hour: "14", value: 0.6 },
  { category: "Pricing", hour: "16", value: 0.4 },
  { category: "Pricing", hour: "18", value: 0.2 },
  { category: "Pricing", hour: "20", value: 0.1 },
  { category: "Pricing", hour: "22", value: 0.1 },
  { category: "User Experience", hour: "00", value: 0.1 },
  { category: "User Experience", hour: "02", value: 0.1 },
  { category: "User Experience", hour: "04", value: 0.1 },
  { category: "User Experience", hour: "06", value: 0.1 },
  { category: "User Experience", hour: "08", value: 0.3 },
  { category: "User Experience", hour: "10", value: 0.2 },
  { category: "User Experience", hour: "12", value: 0.4 },
  { category: "User Experience", hour: "14", value: 0.5 },
  { category: "User Experience", hour: "16", value: 0.3 },
  { category: "User Experience", hour: "18", value: 0.2 },
  { category: "User Experience", hour: "20", value: 0.1 },
  { category: "User Experience", hour: "22", value: 0.1 },
]

const anomalyMetrics = [
  { name: "Total Anomalies", value: 47, change: 12, trend: "up", severity: "medium" },
  { name: "Critical Alerts", value: 3, change: -2, trend: "down", severity: "good" },
  { name: "Detection Accuracy", value: 94.2, change: 2.1, trend: "up", severity: "good" },
  { name: "False Positives", value: 5.8, change: -1.3, trend: "down", severity: "good" },
  { name: "Avg Response Time", value: 2.3, change: -0.5, trend: "down", severity: "good" },
  { name: "Pattern Recognition", value: 89.7, change: 4.2, trend: "up", severity: "good" },
]

const heatmapData = [
  { hour: "00:00", monday: 12, tuesday: 8, wednesday: 15, thursday: 10, friday: 18, saturday: 25, sunday: 20 },
  { hour: "04:00", monday: 5, tuesday: 3, wednesday: 7, thursday: 4, friday: 8, saturday: 12, sunday: 10 },
  { hour: "08:00", monday: 45, tuesday: 42, wednesday: 48, thursday: 46, friday: 52, saturday: 35, sunday: 28 },
  { hour: "12:00", monday: 65, tuesday: 68, wednesday: 72, thursday: 70, friday: 75, saturday: 58, sunday: 45 },
  { hour: "16:00", monday: 55, tuesday: 58, wednesday: 62, thursday: 60, friday: 68, saturday: 48, sunday: 38 },
  { hour: "20:00", monday: 35, tuesday: 38, wednesday: 42, thursday: 40, friday: 45, saturday: 65, sunday: 55 },
]

const scatterData = [
  { satisfaction: 4.2, responses: 400, engagement: 85 },
  { satisfaction: 4.5, responses: 300, engagement: 92 },
  { satisfaction: 4.1, responses: 600, engagement: 78 },
  { satisfaction: 4.7, responses: 800, engagement: 95 },
  { satisfaction: 4.6, responses: 700, engagement: 88 },
  { satisfaction: 4.8, responses: 900, engagement: 97 },
  { satisfaction: 3.9, responses: 250, engagement: 72 },
  { satisfaction: 4.3, responses: 550, engagement: 83 },
]

const radarData = [
  { metric: "Satisfaction", current: 4.6, benchmark: 4.2, fullMark: 5 },
  { metric: "Response Rate", current: 78, benchmark: 65, fullMark: 100 },
  { metric: "Completion", current: 92, benchmark: 85, fullMark: 100 },
  { metric: "Engagement", current: 88, benchmark: 75, fullMark: 100 },
  { metric: "Quality", current: 85, benchmark: 80, fullMark: 100 },
  { metric: "Speed", current: 90, benchmark: 82, fullMark: 100 },
]

const funnelData = [
  { name: "Survey Sent", value: 10000, fill: "#3b82f6" },
  { name: "Survey Opened", value: 7500, fill: "#10b981" },
  { name: "Started Survey", value: 6200, fill: "#f59e0b" },
  { name: "Completed Survey", value: 4800, fill: "#ef4444" },
  { name: "Provided Feedback", value: 3200, fill: "#8b5cf6" },
]

const treemapData = [
  { name: "Product Quality", size: 2400, fill: "#3b82f6" },
  { name: "Customer Service", size: 1800, fill: "#10b981" },
  { name: "Pricing", size: 1200, fill: "#f59e0b" },
  { name: "Delivery", size: 900, fill: "#ef4444" },
  { name: "Website UX", size: 600, fill: "#8b5cf6" },
  { name: "Mobile App", size: 400, fill: "#06b6d4" },
]

const cohortData = [
  { month: "Jan", week1: 100, week2: 85, week3: 72, week4: 65 },
  { month: "Feb", week1: 100, week2: 88, week3: 75, week4: 68 },
  { month: "Mar", week1: 100, week2: 82, week3: 70, week4: 62 },
  { month: "Apr", week1: 100, week2: 90, week3: 78, week4: 72 },
  { month: "May", week1: 100, week2: 87, week3: 74, week4: 67 },
  { month: "Jun", week1: 100, week2: 92, week3: 80, week4: 75 },
]

export default function StatWiseDashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const [dataQuality, setDataQuality] = useState(87)
  const [isUploading, setIsUploading] = useState(false)
  const [realTimeScore, setRealTimeScore] = useState(4.6)
  const [streamingInsight, setStreamingInsight] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const [aiChatMessages, setAiChatMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI analytics assistant. Ask me anything about your survey data." },
  ])
  const [currentChatMessage, setCurrentChatMessage] = useState("")
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [insightFilter, setInsightFilter] = useState("all")

  const { csvData } = useData()
  const [insights, setInsights] = useState<string[]>([])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeScore((prev) => Math.max(1, Math.min(5, prev + (Math.random() - 0.5) * 0.1)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Simulate streaming AI insights
  useEffect(() => {
    const insights = [
      "Analyzing response patterns...",
      "Detecting sentiment trends...",
      "Identifying data anomalies...",
      "Generating predictive insights...",
      "Optimizing survey recommendations...",
    ]
    let index = 0
    const interval = setInterval(() => {
      setStreamingInsight(insights[index % insights.length])
      index++
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (csvData) {
      const generatedInsights = generateInsights(csvData.data)
      setInsights(generatedInsights)
    }
  }, [csvData])

  const handleFileUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setDataQuality(Math.min(100, dataQuality + Math.random() * 10))
    }, 2000)
  }

  const handleLogout = () => {
    // Clear any stored user data
    localStorage.removeItem("user")
    // Redirect to landing page
    window.location.href = "/"
  }

  const handleBackToUpload = () => {
    window.location.href = "/upload"
  }

  const handleSendMessage = async () => {
    if (!currentChatMessage.trim()) return

    const userMessage = { role: "user", content: currentChatMessage }
    setAiChatMessages((prev) => [...prev, userMessage])
    setCurrentChatMessage("")
    setIsAiTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your data, I notice a 23% increase in satisfaction scores over the last quarter. This correlates with your recent customer service improvements.",
        "The sentiment analysis shows that mobile users have different preferences. Consider creating mobile-optimized survey flows.",
        "I've detected some anomalies in weekend response patterns. Would you like me to investigate further?",
        "Your NPS score has improved significantly. The main drivers appear to be product quality and customer service improvements.",
        "I recommend focusing on the 12% of users showing churn indicators. Shall I create a retention strategy?",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setAiChatMessages((prev) => [...prev, { role: "assistant", content: randomResponse }])
      setIsAiTyping(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => (window.location.href = "/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="relative">
                <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="w-5 h-5 bg-white rounded-md relative">
                    <div className="absolute top-1 left-1 w-1 h-1 bg-slate-800 rounded-full"></div>
                    <div className="absolute top-1 right-1 w-1 h-1 bg-slate-800 rounded-full"></div>
                    <div className="absolute bottom-1 left-1 w-1 h-1 bg-slate-800 rounded-full"></div>
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-slate-800 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-slate-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full opacity-80"></div>
              </div>
              <h1 className="text-xl font-bold text-slate-800">
                StatWise
              </h1>
            </button>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Globe className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
              <button onClick={() => (window.location.href = "/")} className="hover:text-slate-700">
                Home
              </button>
              <span>/</span>
              <button onClick={handleBackToUpload} className="hover:text-slate-700">
                Upload
              </button>
              <span>/</span>
              <span className="text-slate-900 font-medium">Dashboard</span>
            </div>

            <div className="relative">
              <Input
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            </div>

            <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)}>
              <Bell className="w-4 h-4" />
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4" />
            </Button>

            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Activity className="w-4 h-4 text-green-500" />
              <span>Live Score: {realTimeScore.toFixed(1)}</span>
            </div>

            <div className="relative group">
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder-user.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="absolute right-0 top-12 w-48 bg-white border border-slate-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-3 border-b border-slate-200">
                  <p className="font-medium text-slate-900">John Doe</p>
                  <p className="text-sm text-slate-500">john@example.com</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-slate-50 rounded-md">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-slate-50 rounded-md text-red-600"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-6 top-16 w-80 bg-white border border-slate-200 rounded-lg shadow-xl z-50">
              <div className="p-4 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
              </div>
              <ScrollArea className="max-h-64">
                <div className="p-2">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer">
                      <div className="flex items-start space-x-3">
                        {notification.type === "anomaly" && <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />}
                        {notification.type === "insight" && <Brain className="w-4 h-4 text-blue-500 mt-0.5" />}
                        {notification.type === "alert" && <Pause className="w-4 h-4 text-orange-500 mt-0.5" />}
                        {notification.type === "success" && <Play className="w-4 h-4 text-green-500 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm text-slate-700">{notification.message}</p>
                          <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-screen">
          <div className="p-4 border-b border-slate-200">
            <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleBackToUpload}>
              <Globe className="w-4 h-4 mr-2" />
              Back to Upload
            </Button>
          </div>

          <nav className="p-4 space-y-2">
            {[
              { id: "home", label: "Home", icon: Home },
              { id: "upload", label: "Upload Data", icon: Upload },
              { id: "reports", label: "Reports", icon: BarChart3 },
              { id: "insights", label: "AI Insights", icon: Brain },
              { id: "anomalies", label: "Anomaly Detection", icon: AlertTriangle },
              { id: "predictions", label: "Predictions", icon: TrendingUp },
              { id: "collaboration", label: "Team", icon: Users },
              { id: "audit", label: "Audit Logs", icon: Shield },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Team Collaboration Sidebar */}
          <div className="p-4 border-t border-slate-200">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Team Online</h4>
            <div className="space-y-2">
              {collaborators.map((collaborator, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="relative">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {collaborator.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${
                        collaborator.status === "online" ? "bg-green-500" : "bg-yellow-500"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate">{collaborator.name}</p>
                    <p className="text-xs text-slate-500 truncate">{collaborator.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="home">Overview</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="anomalies">Anomaly</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
              <TabsTrigger value="funnel">Funnel</TabsTrigger>
              <TabsTrigger value="collaboration">Team</TabsTrigger>
              <TabsTrigger value="audit">Audit</TabsTrigger>
            </TabsList>

            {/* Home Dashboard */}
            <TabsContent value="home" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Dashboard Overview</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    System Healthy
                  </Badge>
                  {/* Time Range Selector */}
                  <select
                    value={selectedTimeRange}
                    onChange={(e) => setSelectedTimeRange(e.target.value)}
                    className="px-3 py-1 border border-slate-200 rounded-md text-sm"
                  >
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                    <option value="90d">Last 90 days</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Quick Stats */}
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Responses</p>
                        <p className="text-2xl font-bold">{csvData?.summary.totalRows.toLocaleString() || "12,847"}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-teal-100">Avg Satisfaction</p>
                        <p className="text-2xl font-bold">{realTimeScore.toFixed(1)}/5</p>
                      </div>
                      <Target className="w-8 h-8 text-teal-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">AI Insights</p>
                        <p className="text-2xl font-bold">247</p>
                      </div>
                      <Brain className="w-8 h-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100">Data Quality</p>
                        <p className="text-2xl font-bold">{csvData?.summary.dataQuality || dataQuality}%</p>
                      </div>
                      <Shield className="w-8 h-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Insights Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      <span>AI Insights</span>
                    </CardTitle>
                    <CardDescription>Real-time analysis of your survey data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {insights.length > 0 ? (
                        insights.map((insight, index) => (
                          <div key={index} className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">{insight}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          <p className="text-sm text-slate-600">{streamingInsight}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Satisfaction Trends</CardTitle>
                    <CardDescription>Historical satisfaction trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RechartsLineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="satisfaction" stroke="#3b82f6" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Upload Data Tab */}
            <TabsContent value="upload" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Upload Data</h2>
                <Button onClick={handleFileUpload} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Data
                    </>
                  )}
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Data Quality</CardTitle>
                    <CardDescription>Current data quality status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={dataQuality} className="h-1" />
                    <p className="text-sm text-slate-600 mt-2">Data Quality: {dataQuality}%</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Reports</h2>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Satisfaction Trends</CardTitle>
                    <CardDescription>Historical satisfaction trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsLineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="satisfaction" stroke="#3b82f6" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Advanced AI Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Advanced AI Insights</h2>
                <div className="flex items-center space-x-2">
                  <select
                    value={insightFilter}
                    onChange={(e) => setInsightFilter(e.target.value)}
                    className="px-3 py-1 border border-slate-200 rounded-md text-sm"
                  >
                    <option value="all">All Insights</option>
                    <option value="trend">Trend Analysis</option>
                    <option value="sentiment">Sentiment</option>
                    <option value="predictive">Predictive</option>
                    <option value="optimization">Optimization</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Insights List */}
                <div className="lg:col-span-2 space-y-4">
                  {advancedInsights
                    .filter((insight) => insightFilter === "all" || insight.type === insightFilter)
                    .map((insight, index) => (
                      <Card
                        key={index}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2">
                              {insight.type === "trend" && <TrendingUp className="w-5 h-5 text-blue-600" />}
                              {insight.type === "sentiment" && <Heart className="w-5 h-5 text-pink-600" />}
                              {insight.type === "demographic" && <Users className="w-5 h-5 text-purple-600" />}
                              {insight.type === "predictive" && <Brain className="w-5 h-5 text-orange-600" />}
                              {insight.type === "optimization" && <Zap className="w-5 h-5 text-green-600" />}
                              <CardTitle className="text-lg">{insight.title}</CardTitle>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant={
                                  insight.impact === "critical"
                                    ? "destructive"
                                    : insight.impact === "high"
                                      ? "default"
                                      : "secondary"
                                }
                              >
                                {insight.impact}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {Math.round(insight.confidence * 100)}% confidence
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 mb-3">{insight.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-sm text-slate-500">
                              <Clock className="w-4 h-4" />
                              <span>{insight.timestamp}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {insight.category}
                            </Badge>
                          </div>
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-900">Recommendation:</p>
                            <p className="text-sm text-blue-800">{insight.recommendation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {/* AI Chat Assistant */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                        <span>AI Assistant</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-64 mb-4">
                        <div className="space-y-3">
                          {aiChatMessages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                              </div>
                            </div>
                          ))}
                          {isAiTyping && (
                            <div className="flex justify-start">
                              <div className="bg-slate-100 p-3 rounded-lg">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  ></div>
                                  <div
                                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Ask about your data..."
                          value={currentChatMessage}
                          onChange={(e) => setCurrentChatMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        />
                        <Button size="sm" onClick={handleSendMessage}>
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {trendAnalysis.slice(0, 4).map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{metric.metric}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">
                              {metric.current}
                              {metric.metric.includes("Time")
                                ? "min"
                                : metric.metric.includes("Rate") || metric.metric.includes("Score")
                                  ? "%"
                                  : ""}
                            </span>
                            <div
                              className={`flex items-center space-x-1 ${metric.trend === "up" ? "text-green-600" : "text-red-600"}`}
                            >
                              {metric.trend === "up" ? (
                                <ArrowUp className="w-3 h-3" />
                              ) : (
                                <ArrowDown className="w-3 h-3" />
                              )}
                              <span className="text-xs">{Math.abs(metric.change)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sentiment Analysis Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-pink-600" />
                      <span>Sentiment Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Overall Sentiment</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm">{sentimentAnalysis.overall.positive}%</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm">{sentimentAnalysis.overall.negative}%</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            <span className="text-sm">{sentimentAnalysis.overall.neutral}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {sentimentAnalysis.categories.map((category, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{category.name}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-green-600">{category.positive}%</span>
                                {category.trend === "up" && <ArrowUp className="w-3 h-3 text-green-600" />}
                                {category.trend === "down" && <ArrowDown className="w-3 h-3 text-red-600" />}
                                {category.trend === "stable" && <div className="w-3 h-0.5 bg-gray-400"></div>}
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${category.positive}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      <span>AI Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiRecommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm">{rec.title}</h4>
                            <Badge
                              variant={
                                rec.priority === "critical"
                                  ? "destructive"
                                  : rec.priority === "high"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600 mb-2">{rec.description}</p>
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span>{rec.impact}</span>
                            <span>{rec.timeline}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Anomaly Detection Tab */}
            <TabsContent value="anomalies" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Anomaly Detection</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-orange-600 border-orange-200">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    {anomalyAlerts.filter((a) => a.severity === "high" || a.severity === "critical").length} Active
                    Alerts
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>

              {/* Anomaly Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {anomalyMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-slate-600">{metric.name}</p>
                          <p className="text-2xl font-bold text-slate-900">
                            {metric.value}
                            {metric.name.includes("Rate") ||
                            metric.name.includes("Accuracy") ||
                            metric.name.includes("Recognition")
                              ? "%"
                              : metric.name.includes("Time")
                                ? "min"
                                : ""}
                          </p>
                        </div>
                        <div
                          className={`flex items-center space-x-1 ${
                            metric.severity === "good"
                              ? "text-green-600"
                              : metric.severity === "medium"
                                ? "text-orange-600"
                                : "text-red-600"
                          }`}
                        >
                          {metric.trend === "up" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                          <span className="text-sm font-medium">{Math.abs(metric.change)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Active Anomaly Alerts */}
                <div className="lg:col-span-2 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span>Active Anomaly Alerts</span>
                      </CardTitle>
                      <CardDescription>Real-time anomaly detection and alerts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {anomalyAlerts.map((alert) => (
                          <div
                            key={alert.id}
                            className={`p-4 rounded-lg border-l-4 ${
                              alert.severity === "critical"
                                ? "border-red-500 bg-red-50"
                                : alert.severity === "high"
                                  ? "border-orange-500 bg-orange-50"
                                  : alert.severity === "medium"
                                    ? "border-yellow-500 bg-yellow-50"
                                    : "border-blue-500 bg-blue-50"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge
                                    variant={
                                      alert.severity === "critical"
                                        ? "destructive"
                                        : alert.severity === "high"
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {alert.severity.toUpperCase()}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {alert.type}
                                  </Badge>
                                  <span className="text-xs text-slate-500">{alert.timestamp}</span>
                                </div>
                                <h4 className="font-medium text-slate-900 mb-1">{alert.metric} Anomaly</h4>
                                <p className="text-sm text-slate-600 mb-2">{alert.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-slate-500">
                                  <span>
                                    Value: <strong>{alert.value}</strong>
                                  </span>
                                  <span>
                                    Threshold: <strong>{alert.threshold}</strong>
                                  </span>
                                  <span>
                                    Confidence: <strong>{Math.round(alert.confidence * 100)}%</strong>
                                  </span>
                                  <span>
                                    Segment: <strong>{alert.affectedSegment}</strong>
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {alert.trend === "increasing" && <ArrowUp className="w-4 h-4 text-red-500" />}
                                {alert.trend === "decreasing" && <ArrowDown className="w-4 h-4 text-blue-500" />}
                                {alert.trend === "stable" && <div className="w-4 h-0.5 bg-gray-400"></div>}
                                <Button variant="outline" size="sm">
                                  Investigate
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Anomaly Time Series Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Anomaly Detection Timeline</CardTitle>
                      <CardDescription>24-hour anomaly detection with threshold monitoring</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart data={anomalyTimeSeriesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="normal" stroke="#64748b" strokeWidth={2} name="Normal" />
                          <Line type="monotone" dataKey="anomaly" stroke="#ef4444" strokeWidth={2} name="Detected" />
                          <Line
                            type="monotone"
                            dataKey="threshold"
                            stroke="#f59e0b"
                            strokeDasharray="5 5"
                            name="Threshold"
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Anomaly Controls and Settings */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Detection Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Sensitivity Level</label>
                        <select className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md text-sm" defaultValue="Medium (Balanced)">
                          <option>High (More alerts)</option>
                          <option>Medium (Balanced)</option>
                          <option>Low (Fewer alerts)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Alert Threshold</label>
                        <Input type="number" defaultValue="85" className="mt-1" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Detection Window</label>
                        <select className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md text-sm" defaultValue="24 hours">
                          <option>1 hour</option>
                          <option>6 hours</option>
                          <option>24 hours</option>
                          <option>7 days</option>
                        </select>
                      </div>
                      <Button className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Update Settings
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pattern Recognition</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Seasonal Patterns</span>
                          <Badge variant="outline" className="text-green-600">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Trend Analysis</span>
                          <Badge variant="outline" className="text-green-600">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Outlier Detection</span>
                          <Badge variant="outline" className="text-green-600">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Correlation Analysis</span>
                          <Badge variant="outline" className="text-orange-600">
                            Learning
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Anomaly Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Configure Notifications
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retrain Model
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Anomaly Heatmap */}
              <Card>
                <CardHeader>
                  <CardTitle>Anomaly Heatmap by Category & Time</CardTitle>
                  <CardDescription>
                    Visual representation of anomaly intensity across different categories and time periods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-12 gap-1 text-xs">
                    <div className="col-span-2"></div>
                    {["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"].map((hour) => (
                      <div key={hour} className="text-center text-slate-500 font-medium">
                        {hour}
                      </div>
                    ))}
                    {["Product Quality", "Customer Service", "Pricing", "User Experience"].map((category) => (
                      <div key={category} className="contents">
                        <div className="col-span-2 text-right text-slate-700 font-medium pr-2 py-1">{category}</div>
                        {["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"].map((hour) => {
                          const dataPoint = anomalyHeatmapData.find((d) => d.category === category && d.hour === hour)
                          const intensity = dataPoint ? dataPoint.value : 0
                          return (
                            <div
                              key={`${category}-${hour}`}
                              className="aspect-square rounded-sm cursor-pointer hover:ring-2 hover:ring-blue-300"
                              style={{
                                backgroundColor:
                                  intensity > 0.7
                                    ? "#ef4444"
                                    : intensity > 0.5
                                      ? "#f97316"
                                      : intensity > 0.3
                                        ? "#eab308"
                                        : intensity > 0.1
                                          ? "#84cc16"
                                          : "#e2e8f0",
                              }}
                              title={`${category} at ${hour}:00 - Intensity: ${(intensity * 100).toFixed(0)}%`}
                            ></div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-slate-500">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-slate-300 rounded-sm"></div>
                      <span>No Anomaly</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-lime-400 rounded-sm"></div>
                      <span>Low</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                      <span>Medium</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                      <span>High</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                      <span>Critical</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Predictive Analytics Tab */}
            <TabsContent value="predictions" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Predictive Analytics</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    <Brain className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Update Predictions
                  </Button>
                </div>
              </div>

              {/* Prediction Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Next Month Satisfaction</p>
                        <p className="text-2xl font-bold">4.8</p>
                        <p className="text-xs text-blue-200">+0.2 predicted increase</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Response Rate</p>
                        <p className="text-2xl font-bold">82%</p>
                        <p className="text-xs text-green-200">+4% predicted growth</p>
                      </div>
                      <Target className="w-8 h-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Churn Risk</p>
                        <p className="text-2xl font-bold">8%</p>
                        <p className="text-xs text-purple-200">-4% predicted reduction</p>
                      </div>
                      <Users className="w-8 h-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">NPS Score</p>
                        <p className="text-2xl font-bold">72</p>
                        <p className="text-xs text-orange-200">+5 points predicted</p>
                      </div>
                      <Heart className="w-8 h-8 text-orange-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Prediction Charts */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Satisfaction Forecast */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span>Satisfaction Score Forecast</span>
                      </CardTitle>
                      <CardDescription>6-month satisfaction prediction with confidence intervals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart
                          data={[
                            { month: "Jan", actual: 4.2, predicted: null, upper: null, lower: null },
                            { month: "Feb", actual: 4.5, predicted: null, upper: null, lower: null },
                            { month: "Mar", actual: 4.1, predicted: null, upper: null, lower: null },
                            { month: "Apr", actual: 4.7, predicted: null, upper: null, lower: null },
                            { month: "May", actual: 4.6, predicted: null, upper: null, lower: null },
                            { month: "Jun", actual: 4.8, predicted: null, upper: null, lower: null },
                            { month: "Jul", actual: null, predicted: 4.9, upper: 5.2, lower: 4.6 },
                            { month: "Aug", actual: null, predicted: 5.0, upper: 5.3, lower: 4.7 },
                            { month: "Sep", actual: null, predicted: 4.8, upper: 5.1, lower: 4.5 },
                            { month: "Oct", actual: null, predicted: 4.9, upper: 5.2, lower: 4.6 },
                            { month: "Nov", actual: null, predicted: 5.1, upper: 5.4, lower: 4.8 },
                            { month: "Dec", actual: null, predicted: 5.0, upper: 5.3, lower: 4.7 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[3.5, 5.5]} />
                          <Tooltip />
                          <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} name="Actual" />
                          <Line
                            type="monotone"
                            dataKey="predicted"
                            stroke="#ef4444"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name="Predicted"
                          />
                          <Line
                            type="monotone"
                            dataKey="upper"
                            stroke="#94a3b8"
                            strokeWidth={1}
                            strokeDasharray="2 2"
                            name="Upper Bound"
                          />
                          <Line
                            type="monotone"
                            dataKey="lower"
                            stroke="#94a3b8"
                            strokeWidth={1}
                            strokeDasharray="2 2"
                            name="Lower Bound"
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Response Volume Prediction */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                        <span>Response Volume Prediction</span>
                      </CardTitle>
                      <CardDescription>Predicted survey response volumes by segment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart
                          data={[
                            { month: "Jul", mobile: 450, desktop: 320, total: 770 },
                            { month: "Aug", mobile: 480, desktop: 310, total: 790 },
                            { month: "Sep", mobile: 520, desktop: 300, total: 820 },
                            { month: "Oct", mobile: 550, desktop: 290, total: 840 },
                            { month: "Nov", mobile: 580, desktop: 280, total: 860 },
                            { month: "Dec", mobile: 610, desktop: 270, total: 880 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="mobile" stroke="#10b981" strokeWidth={2} name="Mobile" />
                          <Line type="monotone" dataKey="desktop" stroke="#6366f1" strokeWidth={2} name="Desktop" />
                          <Line type="monotone" dataKey="total" stroke="#f59e0b" strokeWidth={3} name="Total" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Churn Risk Prediction */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span>Churn Risk Analysis</span>
                      </CardTitle>
                      <CardDescription>Predicted customer churn by risk segment</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">156</div>
                          <div className="text-sm text-red-700">High Risk</div>
                          <div className="text-xs text-red-500">12% of users</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">298</div>
                          <div className="text-sm text-yellow-700">Medium Risk</div>
                          <div className="text-xs text-yellow-500">23% of users</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">846</div>
                          <div className="text-sm text-green-700">Low Risk</div>
                          <div className="text-xs text-green-500">65% of users</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Predicted 30-day churn</span>
                          <span className="text-sm text-red-600 font-bold">8.2%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "8.2%" }}></div>
                        </div>
                        <div className="text-xs text-slate-500">
                          Based on response patterns, engagement metrics, and satisfaction scores
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Prediction Insights Sidebar */}
                <div className="space-y-4">
                  {/* Model Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Model Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Accuracy</span>
                        <span className="text-sm font-medium">94.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "94.2%" }}></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Confidence</span>
                        <span className="text-sm font-medium">87.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "87.5%" }}></div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Data Quality</span>
                        <span className="text-sm font-medium">91.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: "91.8%" }}></div>
                      </div>

                      <div className="pt-2 border-t border-slate-200">
                        <div className="text-xs text-slate-500">Last updated: 2 hours ago</div>
                        <div className="text-xs text-slate-500">Next update: In 4 hours</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Predictions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Predictions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-900">Satisfaction Increase</span>
                        </div>
                        <p className="text-xs text-blue-700">
                          Predicted 15% increase in satisfaction scores over next quarter
                        </p>
                        <div className="text-xs text-blue-600 mt-1">Confidence: 89%</div>
                      </div>

                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Users className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-900">Response Growth</span>
                        </div>
                        <p className="text-xs text-green-700">
                          Mobile responses expected to grow by 28% in next 6 months
                        </p>
                        <div className="text-xs text-green-600 mt-1">Confidence: 92%</div>
                      </div>

                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium text-orange-900">Churn Risk</span>
                        </div>
                        <p className="text-xs text-orange-700">156 users at high risk of churning within 30 days</p>
                        <div className="text-xs text-orange-600 mt-1">Confidence: 85%</div>
                      </div>

                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-2 mb-1">
                          <Heart className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-900">NPS Improvement</span>
                        </div>
                        <p className="text-xs text-purple-700">
                          NPS score predicted to reach 72 (+5 points) by year end
                        </p>
                        <div className="text-xs text-purple-600 mt-1">Confidence: 78%</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Prediction Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommended Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Target className="w-4 h-4 mr-2" />
                        Target High-Risk Users
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Optimize Mobile Experience
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Brain className="w-4 h-4 mr-2" />
                        Update Prediction Model
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Predictions
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Prediction Scenarios */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <span>Scenario Analysis</span>
                  </CardTitle>
                  <CardDescription>What-if analysis for different business scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-2">Optimistic Scenario</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Satisfaction:</span>
                          <span className="font-medium text-green-600">5.2/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Response Rate:</span>
                          <span className="font-medium text-green-600">89%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Churn Rate:</span>
                          <span className="font-medium text-green-600">4%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">NPS Score:</span>
                          <span className="font-medium text-green-600">78</span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-slate-500">
                        Assumes 20% improvement in customer service and mobile optimization
                      </div>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg bg-blue-50">
                      <h4 className="font-medium text-slate-900 mb-2">Most Likely Scenario</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Satisfaction:</span>
                          <span className="font-medium text-blue-600">4.8/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Response Rate:</span>
                          <span className="font-medium text-blue-600">82%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Churn Rate:</span>
                          <span className="font-medium text-blue-600">8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">NPS Score:</span>
                          <span className="font-medium text-blue-600">72</span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-slate-500">
                        Based on current trends and planned improvements
                      </div>
                    </div>

                    <div className="p-4 border border-slate-200 rounded-lg">
                      <h4 className="font-medium text-slate-900 mb-2">Conservative Scenario</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Satisfaction:</span>
                          <span className="font-medium text-orange-600">4.4/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Response Rate:</span>
                          <span className="font-medium text-orange-600">75%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Churn Rate:</span>
                          <span className="font-medium text-orange-600">12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">NPS Score:</span>
                          <span className="font-medium text-orange-600">65</span>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-slate-500">
                        Accounts for potential market challenges and slower adoption
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="heatmap" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Response Heatmap
                    </CardTitle>
                    <CardDescription>Survey response patterns by day and time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-8 gap-1 text-xs">
                      <div></div>
                      <div className="text-center font-medium">Mon</div>
                      <div className="text-center font-medium">Tue</div>
                      <div className="text-center font-medium">Wed</div>
                      <div className="text-center font-medium">Thu</div>
                      <div className="text-center font-medium">Fri</div>
                      <div className="text-center font-medium">Sat</div>
                      <div className="text-center font-medium">Sun</div>
                      {heatmapData.map((row, index) => (
                        <React.Fragment key={index}>
                          <div className="text-right font-medium pr-2">{row.hour}</div>
                          <div
                            className={`h-8 rounded flex items-center justify-center text-white font-medium ${row.monday > 50 ? "bg-red-500" : row.monday > 30 ? "bg-orange-400" : row.monday > 15 ? "bg-yellow-400 text-black" : "bg-blue-200 text-black"}`}
                          >
                            {row.monday}
                          </div>
                          <div
                            className={`h-8 rounded flex items-center justify-center text-white font-medium ${row.tuesday > 50 ? "bg-red-500" : row.tuesday > 30 ? "bg-orange-400" : row.tuesday > 15 ? "bg-yellow-400 text-black" : "bg-blue-200 text-black"}`}
                          >
                            {row.tuesday}
                          </div>
                          <div
                            className={`h-8 rounded flex items-center justify-center text-white font-medium ${row.wednesday > 50 ? "bg-red-500" : row.wednesday > 30 ? "bg-orange-400" : row.wednesday > 15 ? "bg-yellow-400 text-black" : "bg-blue-200 text-black"}`}
                          >
                            {row.wednesday}
                          </div>
                          <div
                            className={`h-8 rounded flex items-center justify-center text-white font-medium ${row.thursday > 50 ? "bg-red-500" : row.thursday > 30 ? "bg-orange-400" : row.thursday > 15 ? "bg-yellow-400 text-black" : "bg-blue-200 text-black"}`}
                          >
                            {row.thursday}
                          </div>
                          <div
                            className={`h-8 rounded flex items-center justify-center text-white font-medium ${row.friday > 50 ? "bg-red-500" : row.friday > 30 ? "bg-orange-400" : row.friday > 15 ? "bg-yellow-400 text-black" : "bg-blue-200 text-black"}`}
                          >
                            {row.friday}
                          </div>
                          <div
                            className={`h-8 rounded flex items-center justify-center text-white font-medium ${row.saturday > 50 ? "bg-red-500" : row.saturday > 30 ? "bg-orange-400" : row.saturday > 15 ? "bg-yellow-400 text-black" : "bg-blue-200 text-black"}`}
                          >
                            {row.saturday}
                          </div>
                          <div
                            className={`h-8 rounded flex items-center justify-center text-white font-medium ${row.sunday > 50 ? "bg-red-500" : row.sunday > 30 ? "bg-orange-400" : row.sunday > 15 ? "bg-yellow-400 text-black" : "bg-blue-200 text-black"}`}
                          >
                            {row.sunday}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Scatter Analysis</CardTitle>
                      <CardDescription>Satisfaction vs Response Volume</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart data={scatterData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="satisfaction" name="Satisfaction" />
                          <YAxis dataKey="responses" name="Responses" />
                          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                          <Scatter fill="#3b82f6" />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Radar</CardTitle>
                      <CardDescription>Multi-dimensional analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RadarChart data={radarData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="metric" />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} />
                          <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                          <Radar
                            name="Benchmark"
                            dataKey="benchmark"
                            stroke="#10b981"
                            fill="#10b981"
                            fillOpacity={0.1}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="funnel" className="space-y-6">
              <div className="grid gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversion Funnel</CardTitle>
                      <CardDescription>Survey completion journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <FunnelChart>
                          <Tooltip />
                          <Funnel dataKey="value" data={funnelData} isAnimationActive>
                            <LabelList position="center" fill="#fff" stroke="none" />
                          </Funnel>
                        </FunnelChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Topic Distribution</CardTitle>
                      <CardDescription>Feedback categories by volume</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <Treemap data={treemapData} dataKey="size" stroke="#fff" fill="#3b82f6" />
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Cohort Retention</CardTitle>
                    <CardDescription>User engagement over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={cohortData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="week1" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                        <Area type="monotone" dataKey="week2" stackId="1" stroke="#10b981" fill="#10b981" />
                        <Area type="monotone" dataKey="week3" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                        <Area type="monotone" dataKey="week4" stackId="1" stroke="#ef4444" fill="#ef4444" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Team Collaboration Tab */}
            <TabsContent value="collaboration" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Team Collaboration</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    <Users className="w-3 h-3 mr-1" />
                    {collaborators.filter((c) => c.status === "online").length} Online
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Invite Team
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Team Activity Feed */}
                <div className="lg:col-span-2 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span>Recent Activity</span>
                      </CardTitle>
                      <CardDescription>Real-time team collaboration updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            user: "Sarah Chen",
                            action: "created a new dashboard",
                            target: "Customer Satisfaction Q4",
                            time: "2 minutes ago",
                            type: "create",
                            avatar: "/placeholder-user.png",
                          },
                          {
                            user: "Mike Johnson",
                            action: "commented on",
                            target: "Mobile User Analysis",
                            time: "5 minutes ago",
                            type: "comment",
                            avatar: "/placeholder-user.png",
                          },
                          {
                            user: "Emily Davis",
                            action: "shared insights from",
                            target: "Sentiment Analysis Report",
                            time: "12 minutes ago",
                            type: "share",
                            avatar: "/placeholder-user.png",
                          },
                          {
                            user: "Sarah Chen",
                            action: "updated the data in",
                            target: "Weekly Performance Dashboard",
                            time: "18 minutes ago",
                            type: "update",
                            avatar: "/placeholder-user.png",
                          },
                          {
                            user: "Mike Johnson",
                            action: "exported report",
                            target: "Customer Feedback Analysis",
                            time: "25 minutes ago",
                            type: "export",
                            avatar: "/placeholder-user.png",
                          },
                          {
                            user: "Emily Davis",
                            action: "created annotation on",
                            target: "Anomaly Detection Chart",
                            time: "32 minutes ago",
                            type: "annotate",
                            avatar: "/placeholder-user.png",
                          },
                        ].map((activity, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                {activity.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                {activity.type === "create" && <Zap className="w-4 h-4 text-green-500" />}
                                {activity.type === "comment" && <MessageSquare className="w-4 h-4 text-blue-500" />}
                                {activity.type === "share" && <Share2 className="w-4 h-4 text-purple-500" />}
                                {activity.type === "update" && <RefreshCw className="w-4 h-4 text-orange-500" />}
                                {activity.type === "export" && <Download className="w-4 h-4 text-teal-500" />}
                                {activity.type === "annotate" && <Lightbulb className="w-4 h-4 text-yellow-500" />}
                                <p className="text-sm text-slate-900">
                                  <span className="font-medium">{activity.user}</span> {activity.action}{" "}
                                  <span className="font-medium text-blue-600">{activity.target}</span>
                                </p>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shared Dashboards */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BarChart3 className="w-5 h-5 text-purple-600" />
                        <span>Shared Dashboards</span>
                      </CardTitle>
                      <CardDescription>Collaborative dashboards and reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            name: "Customer Satisfaction Q4",
                            owner: "Sarah Chen",
                            collaborators: 3,
                            lastUpdated: "2 hours ago",
                            status: "active",
                            views: 127,
                          },
                          {
                            name: "Mobile User Analysis",
                            owner: "Mike Johnson",
                            collaborators: 2,
                            lastUpdated: "5 hours ago",
                            status: "active",
                            views: 89,
                          },
                          {
                            name: "Sentiment Analysis Report",
                            owner: "Emily Davis",
                            collaborators: 4,
                            lastUpdated: "1 day ago",
                            status: "review",
                            views: 156,
                          },
                          {
                            name: "Weekly Performance Dashboard",
                            owner: "Sarah Chen",
                            collaborators: 2,
                            lastUpdated: "3 days ago",
                            status: "archived",
                            views: 234,
                          },
                        ].map((dashboard, index) => (
                          <div
                            key={index}
                            className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-slate-900">{dashboard.name}</h4>
                              <Badge
                                variant={
                                  dashboard.status === "active"
                                    ? "default"
                                    : dashboard.status === "review"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {dashboard.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-3">Created by {dashboard.owner}</p>
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <div className="flex items-center space-x-3">
                                <span className="flex items-center space-x-1">
                                  <Users className="w-3 h-3" />
                                  <span>{dashboard.collaborators}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <Activity className="w-3 h-3" />
                                  <span>{dashboard.views} views</span>
                                </span>
                              </div>
                              <span>{dashboard.lastUpdated}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Comments and Annotations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MessageSquare className="w-5 h-5 text-green-600" />
                        <span>Recent Comments</span>
                      </CardTitle>
                      <CardDescription>Team discussions and annotations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            user: "Mike Johnson",
                            comment:
                              "The satisfaction scores for mobile users are significantly higher. We should investigate what's driving this trend.",
                            dashboard: "Mobile User Analysis",
                            time: "5 minutes ago",
                            replies: 2,
                            avatar: "/placeholder-user.png",
                          },
                          {
                            user: "Emily Davis",
                            comment:
                              "I've noticed some anomalies in the weekend data. The response rates drop by 40% on Saturdays.",
                            dashboard: "Weekly Performance Dashboard",
                            time: "1 hour ago",
                            replies: 1,
                            avatar: "/placeholder-user.png",
                          },
                          {
                            user: "Sarah Chen",
                            comment:
                              "Great insights! The correlation between mobile usage and satisfaction is really interesting. Let's dig deeper into this.",
                            dashboard: "Customer Satisfaction Q4",
                            time: "3 hours ago",
                            replies: 0,
                            avatar: "/placeholder-user.png",
                          },
                        ].map((comment, index) => (
                          <div key={index} className="p-4 bg-slate-50 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {comment.user
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-slate-900">{comment.user}</span>
                                  <span className="text-xs text-slate-500">on {comment.dashboard}</span>
                                  <span className="text-xs text-slate-500">•</span>
                                  <span className="text-xs text-slate-500">{comment.time}</span>
                                </div>
                                <p className="text-sm text-slate-700 mb-2">{comment.comment}</p>
                                <div className="flex items-center space-x-3">
                                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    Reply
                                  </Button>
                                  {comment.replies > 0 && (
                                    <span className="text-xs text-slate-500">{comment.replies} replies</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Team Sidebar */}
                <div className="space-y-4">
                  {/* Team Members */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Team Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            name: "Sarah Chen",
                            role: "Data Analyst",
                            status: "online",
                            avatar: "/placeholder-user.png",
                            lastActive: "now",
                          },
                          {
                            name: "Mike Johnson",
                            role: "Product Manager",
                            status: "away",
                            avatar: "/placeholder-user.png",
                            lastActive: "5 min ago",
                          },
                          {
                            name: "Emily Davis",
                            role: "UX Researcher",
                            status: "online",
                            avatar: "/placeholder-user.png",
                            lastActive: "now",
                          },
                          {
                            name: "Alex Rodriguez",
                            role: "Data Scientist",
                            status: "offline",
                            avatar: "/placeholder-user.png",
                            lastActive: "2 hours ago",
                          },
                          {
                            name: "Lisa Wang",
                            role: "Marketing Manager",
                            status: "online",
                            avatar: "/placeholder-user.png",
                            lastActive: "now",
                          },
                        ].map((member, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                          >
                            <div className="relative">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-sm">
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                                  member.status === "online"
                                    ? "bg-green-500"
                                    : member.status === "away"
                                      ? "bg-yellow-500"
                                      : "bg-gray-400"
                                }`}
                              ></div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-slate-900 truncate">{member.name}</p>
                              <p className="text-sm text-slate-500 truncate">{member.role}</p>
                              <p className="text-xs text-slate-400">{member.lastActive}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button className="w-full justify-start" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Current View
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Start Discussion
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        Invite Collaborator
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Team Report
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Collaboration Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Collaboration Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Active Dashboards</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Comments This Week</span>
                        <span className="text-sm font-medium">47</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Shared Reports</span>
                        <span className="text-sm font-medium">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Team Insights</span>
                        <span className="text-sm font-medium">156</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Collaboration Score</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-green-600">94%</span>
                            <ArrowUp className="w-3 h-3 text-green-600" />
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "94%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Real-time Notifications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Live Updates</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-slate-600">Sarah is viewing Mobile Analysis</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-slate-600">Mike commented on Q4 Report</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                          <span className="text-slate-600">Emily shared new insights</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Team Performance Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>Team Performance Overview</span>
                  </CardTitle>
                  <CardDescription>Collaborative analytics and team productivity metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">156</div>
                      <div className="text-sm text-blue-700">Insights Generated</div>
                      <div className="text-xs text-blue-500">+23% this week</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">47</div>
                      <div className="text-sm text-green-700">Active Discussions</div>
                      <div className="text-xs text-green-500">+12% this week</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">12</div>
                      <div className="text-sm text-purple-700">Shared Dashboards</div>
                      <div className="text-xs text-purple-500">+3 new this week</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">94%</div>
                      <div className="text-sm text-orange-700">Team Engagement</div>
                      <div className="text-xs text-orange-500">+5% this week</div>
                    </div>
                  </div>

                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsLineChart
                      data={[
                        { week: "Week 1", insights: 32, discussions: 12, dashboards: 3 },
                        { week: "Week 2", insights: 45, discussions: 18, dashboards: 5 },
                        { week: "Week 3", insights: 38, discussions: 15, dashboards: 4 },
                        { week: "Week 4", insights: 52, discussions: 23, dashboards: 6 },
                        { week: "Week 5", insights: 47, discussions: 19, dashboards: 5 },
                        { week: "Week 6", insights: 61, discussions: 28, dashboards: 8 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="insights" stroke="#3b82f6" strokeWidth={2} name="Insights" />
                      <Line type="monotone" dataKey="discussions" stroke="#10b981" strokeWidth={2} name="Discussions" />
                      <Line type="monotone" dataKey="dashboards" stroke="#8b5cf6" strokeWidth={2} name="Dashboards" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Audit Logs Tab */}
            <TabsContent value="audit" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">Audit Logs</h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    <Shield className="w-3 h-3 mr-1" />
                    Secure Tracking
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Logs
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Audit Overview Cards */}
                <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Total Activities</p>
                          <p className="text-2xl font-bold">2,847</p>
                          <p className="text-xs text-blue-200">Last 30 days</p>
                        </div>
                        <Activity className="w-8 h-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">Security Events</p>
                          <p className="text-2xl font-bold">12</p>
                          <p className="text-xs text-green-200">All resolved</p>
                        </div>
                        <Shield className="w-8 h-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm">Data Changes</p>
                          <p className="text-2xl font-bold">156</p>
                          <p className="text-xs text-purple-200">This week</p>
                        </div>
                        <RefreshCw className="w-8 h-8 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100 text-sm">Compliance Score</p>
                          <p className="text-2xl font-bold">98%</p>
                          <p className="text-xs text-orange-200">Excellent</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-orange-200" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Audit Log Feed */}
                <div className="lg:col-span-3 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>Recent Activity Log</span>
                      </CardTitle>
                      <CardDescription>Comprehensive audit trail of all system activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            id: "AUD-001",
                            timestamp: "2024-01-15 14:32:15",
                            user: "Sarah Chen",
                            action: "DATA_EXPORT",
                            resource: "Customer Satisfaction Report",
                            details: "Exported 2,847 survey responses to CSV format",
                            severity: "info",
                            ip: "192.168.1.45",
                            userAgent: "Chrome 120.0.0.0",
                          },
                          {
                            id: "AUD-002",
                            timestamp: "2024-01-15 14:28:42",
                            user: "Mike Johnson",
                            action: "DASHBOARD_CREATE",
                            resource: "Mobile Analytics Dashboard",
                            details: "Created new dashboard with 6 visualization components",
                            severity: "info",
                            ip: "192.168.1.67",
                            userAgent: "Firefox 121.0.1",
                          },
                          {
                            id: "AUD-003",
                            timestamp: "2024-01-15 14:25:18",
                            user: "System",
                            action: "ANOMALY_DETECTED",
                            resource: "Response Rate Monitor",
                            details: "Unusual spike in negative sentiment detected (35% above threshold)",
                            severity: "warning",
                            ip: "127.0.0.1",
                            userAgent: "StatWise AI Engine v2.1",
                          },
                          {
                            id: "AUD-004",
                            timestamp: "2024-01-15 14:20:33",
                            user: "Emily Davis",
                            action: "USER_LOGIN",
                            resource: "Authentication System",
                            details: "Successful login with 2FA verification",
                            severity: "info",
                            ip: "192.168.1.89",
                            userAgent: "Safari 17.2.1",
                          },
                          {
                            id: "AUD-005",
                            timestamp: "2024-01-15 14:15:07",
                            user: "Admin",
                            action: "PERMISSION_CHANGE",
                            resource: "User Management",
                            details:
                              "Updated permissions for user 'alex.rodriguez@company.com' - Added dashboard creation rights",
                            severity: "warning",
                            ip: "192.168.1.10",
                            userAgent: "Chrome 120.0.0.0",
                          },
                          {
                            id: "AUD-006",
                            timestamp: "2024-01-15 14:12:54",
                            user: "Sarah Chen",
                            action: "DATA_UPLOAD",
                            resource: "Survey Data Import",
                            details: "Uploaded new survey data file: customer_feedback_jan2024.csv (1,247 records)",
                            severity: "info",
                            ip: "192.168.1.45",
                            userAgent: "Chrome 120.0.0.0",
                          },
                          {
                            id: "AUD-007",
                            timestamp: "2024-01-15 14:08:21",
                            user: "System",
                            action: "BACKUP_COMPLETE",
                            resource: "Database Backup",
                            details: "Automated daily backup completed successfully (2.3GB)",
                            severity: "info",
                            ip: "127.0.0.1",
                            userAgent: "StatWise Backup Service v1.5",
                          },
                          {
                            id: "AUD-008",
                            timestamp: "2024-01-15 14:05:16",
                            user: "Mike Johnson",
                            action: "SECURITY_ALERT",
                            resource: "Login Attempt",
                            details: "Failed login attempt detected from unusual location (blocked)",
                            severity: "critical",
                            ip: "203.0.113.42",
                            userAgent: "Unknown Bot",
                          },
                        ].map((log, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border-l-4 ${
                              log.severity === "critical"
                                ? "border-red-500 bg-red-50"
                                : log.severity === "warning"
                                  ? "border-yellow-500 bg-yellow-50"
                                  : "border-blue-500 bg-blue-50"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge
                                    variant={
                                      log.severity === "critical"
                                        ? "destructive"
                                        : log.severity === "warning"
                                          ? "default"
                                          : "secondary"
                                    }
                                    className="text-xs"
                                  >
                                    {log.action}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {log.id}
                                  </Badge>
                                  <span className="text-xs text-slate-500">{log.timestamp}</span>
                                </div>
                                <h4 className="font-medium text-slate-900 mb-1">
                                  {log.user} • {log.resource}
                                </h4>
                                <p className="text-sm text-slate-600 mb-2">{log.details}</p>
                                <div className="flex items-center space-x-4 text-xs text-slate-500">
                                  <span>IP: {log.ip}</span>
                                  <span>User Agent: {log.userAgent}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {log.severity === "critical" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                {log.severity === "warning" && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
                                {log.severity === "info" && <CheckCircle className="w-4 h-4 text-blue-500" />}
                                <Button variant="outline" size="sm">
                                  Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Activity Timeline Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity Timeline</CardTitle>
                      <CardDescription>System activity over the last 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart
                          data={[
                            { hour: "00:00", logins: 2, exports: 0, uploads: 0, security: 0 },
                            { hour: "02:00", logins: 1, exports: 0, uploads: 0, security: 0 },
                            { hour: "04:00", logins: 0, exports: 0, uploads: 0, security: 1 },
                            { hour: "06:00", logins: 3, exports: 1, uploads: 0, security: 0 },
                            { hour: "08:00", logins: 12, exports: 3, uploads: 2, security: 0 },
                            { hour: "10:00", logins: 18, exports: 5, uploads: 4, security: 1 },
                            { hour: "12:00", logins: 15, exports: 8, uploads: 3, security: 0 },
                            { hour: "14:00", logins: 22, exports: 12, uploads: 6, security: 2 },
                            { hour: "16:00", logins: 19, exports: 9, uploads: 4, security: 0 },
                            { hour: "18:00", logins: 8, exports: 3, uploads: 1, security: 0 },
                            { hour: "20:00", logins: 5, exports: 1, uploads: 0, security: 0 },
                            { hour: "22:00", logins: 3, exports: 0, uploads: 0, security: 0 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="logins" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                          <Area type="monotone" dataKey="exports" stackId="1" stroke="#10b981" fill="#10b981" />
                          <Area type="monotone" dataKey="uploads" stackId="1" stroke="#f59e0b" fill="#f59e0b" />
                          <Area type="monotone" dataKey="security" stackId="1" stroke="#ef4444" fill="#ef4444" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Audit Controls Sidebar */}
                <div className="space-y-4">
                  {/* Filters */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Filter Logs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700">Time Range</label>
                        <select className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md text-sm">
                          <option>Last 24 hours</option>
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                          <option>Custom range</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Activity Type</label>
                        <select className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md text-sm">
                          <option>All Activities</option>
                          <option>User Actions</option>
                          <option>System Events</option>
                          <option>Security Events</option>
                          <option>Data Changes</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">Severity</label>
                        <select className="w-full mt-1 px-3 py-2 border border-slate-200 rounded-md text-sm">
                          <option>All Levels</option>
                          <option>Critical Only</option>
                          <option>Warning & Above</option>
                          <option>Info & Above</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700">User</label>
                        <Input placeholder="Filter by user..." className="mt-1" />
                      </div>
                      <Button className="w-full">
                        <Search className="w-4 h-4 mr-2" />
                        Apply Filters
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Security Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Security Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Failed Logins</span>
                        <span className="text-sm font-medium text-red-600">3</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Blocked IPs</span>
                        <span className="text-sm font-medium">7</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">2FA Verifications</span>
                        <span className="text-sm font-medium text-green-600">156</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Permission Changes</span>
                        <span className="text-sm font-medium">4</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Security Score</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-green-600">98%</span>
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "98%" }}></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Compliance Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Compliance Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">GDPR Compliance</span>
                        <Badge variant="default" className="text-xs bg-green-600">
                          Compliant
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">SOX Compliance</span>
                        <Badge variant="default" className="text-xs bg-green-600">
                          Compliant
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">HIPAA Compliance</span>
                        <Badge variant="secondary" className="text-xs">
                          N/A
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Data Retention</span>
                        <Badge variant="default" className="text-xs bg-green-600">
                          Compliant
                        </Badge>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <div className="text-xs text-slate-500">
                          Last audit: Dec 15, 2023
                          <br />
                          Next audit: Mar 15, 2024
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Audit Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Shield className="w-4 h-4 mr-2" />
                        Security Scan
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Configure Alerts
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Audit Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Compliance Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Compliance Dashboard</span>
                  </CardTitle>
                  <CardDescription>Regulatory compliance monitoring and reporting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-900">Data Protection</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Encryption Status</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            AES-256
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Data Anonymization</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Access Controls</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            RBAC
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Backup Encryption</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            Enabled
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-900">Access Management</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Multi-Factor Auth</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            Required
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Session Management</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            Secure
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Password Policy</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            Strong
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Account Lockout</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            Enabled
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-900">Audit & Monitoring</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Activity Logging</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            Complete
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Real-time Monitoring</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Anomaly Detection</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            AI-Powered
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">Incident Response</span>
                          <Badge variant="default" className="text-xs bg-green-600">
                            Automated
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
