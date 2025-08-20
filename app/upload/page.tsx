"use client"

import type React from "react"
import { useData } from "@/components/data-context"
import { parseCSV } from "@/lib/csv-parser"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Sparkles,
  ArrowRight,
  Database,
  Zap,
  ArrowLeft,
  LogOut,
  Settings,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function UploadPage() {
  const [uploadStep, setUploadStep] = useState(1)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [fileName, setFileName] = useState("")

  const { setCsvData, setIsLoading: setDataLoading, setFileName: setDataFileName } = useData()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setDataFileName(file.name)
      setIsUploading(true)
      setUploadStep(2)

      const reader = new FileReader()
      reader.onload = (event) => {
        const csvText = event.target?.result as string
        if (csvText) {
          const parsedData = parseCSV(csvText)
          setCsvData(parsedData)
        }
      }
      reader.readAsText(file)

      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 15
        setUploadProgress(Math.min(progress, 100))

        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsUploading(false)
            setUploadStep(3)
          }, 1000)
        }
      }, 200)
    }
  }

  const handleContinueToDashboard = () => {
    window.location.href = "/dashboard"
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  const handleBackToLogin = () => {
    window.location.href = "/login"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => (window.location.href = "/")}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  StatWise AI
                </h1>
              </button>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Sparkles className="w-3 h-3 mr-1" />
                Beta
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500">
                <button onClick={() => (window.location.href = "/")} className="hover:text-slate-700">
                  Home
                </button>
                <span>/</span>
                <button onClick={handleBackToLogin} className="hover:text-slate-700">
                  Login
                </button>
                <span>/</span>
                <span className="text-slate-900 font-medium">Upload</span>
              </div>

              <div className="relative group">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    Welcome, John!
                  </Badge>
                  <Avatar className="cursor-pointer w-8 h-8">
                    <AvatarImage src="/placeholder-user.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
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
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBackToLogin}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  uploadStep >= 1 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                1
              </div>
              <span className={uploadStep >= 1 ? "text-blue-600 font-medium" : "text-slate-500"}>Upload Data</span>
            </div>
            <div className={`w-16 h-1 ${uploadStep >= 2 ? "bg-blue-600" : "bg-slate-200"}`}></div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  uploadStep >= 2 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                2
              </div>
              <span className={uploadStep >= 2 ? "text-blue-600 font-medium" : "text-slate-500"}>AI Processing</span>
            </div>
            <div className={`w-16 h-1 ${uploadStep >= 3 ? "bg-blue-600" : "bg-slate-200"}`}></div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  uploadStep >= 3 ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                3
              </div>
              <span className={uploadStep >= 3 ? "text-blue-600 font-medium" : "text-slate-500"}>View Results</span>
            </div>
          </div>
        </div>

        {/* Step 1: Upload */}
        {uploadStep === 1 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-slate-900">Upload Your Survey Data</h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Upload your CSV, Excel, or JSON files and let our AI analyze your survey data instantly
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-12">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-12 h-12 text-blue-600" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">Drag & Drop Your Files Here</h3>
                    <p className="text-slate-600">Or click to browse and select your survey data files</p>
                  </div>

                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".csv,.xlsx,.xls,.json"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="space-y-4">
                        <Upload className="w-16 h-16 text-slate-400 mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-slate-700">Choose files to upload</p>
                          <p className="text-slate-500">Supports CSV, Excel, JSON formats up to 50MB</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Automatic data cleaning</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Real-time processing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Secure & encrypted</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Data Option */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Database className="w-6 h-6 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Try with Sample Data</h4>
                      <p className="text-sm text-blue-700">
                        Don't have data ready? Use our sample survey dataset to explore features
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
                    onClick={() => {
                      setFileName("sample_survey_data.csv")
                      setDataFileName("sample_survey_data.csv")
                      setIsUploading(true)
                      setUploadStep(2)

                      const sampleData = parseCSV(`Name,Age,Satisfaction,Comments
John Doe,25,5,"Great service!"
Jane Smith,30,4,"Good experience overall"
Bob Johnson,35,3,"Could be better"
Alice Brown,28,5,"Excellent support"
Charlie Wilson,42,2,"Not satisfied"`)
                      setCsvData(sampleData)

                      let progress = 0
                      const interval = setInterval(() => {
                        progress += Math.random() * 20
                        setUploadProgress(Math.min(progress, 100))

                        if (progress >= 100) {
                          clearInterval(interval)
                          setTimeout(() => {
                            setIsUploading(false)
                            setUploadStep(3)
                          }, 1000)
                        }
                      }, 150)
                    }}
                  >
                    Use Sample Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Processing */}
        {uploadStep === 2 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-slate-900">AI is Processing Your Data</h1>
              <p className="text-xl text-slate-600">Our advanced algorithms are analyzing your survey data...</p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardContent className="p-12">
                <div className="text-center space-y-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto">
                    <Brain className="w-12 h-12 text-blue-600 animate-pulse" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">Processing: {fileName}</h3>
                    <p className="text-slate-600">Please wait while we analyze your data...</p>
                  </div>

                  <div className="max-w-md mx-auto space-y-4">
                    <Progress value={uploadProgress} className="h-3" />
                    <p className="text-sm text-slate-500">{Math.round(uploadProgress)}% complete</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-900">Data Validation</h4>
                        <p className="text-sm text-slate-600">Checking data quality and structure</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mt-0.5"></div>
                      <div>
                        <h4 className="font-medium text-slate-900">AI Analysis</h4>
                        <p className="text-sm text-slate-600">Generating insights and patterns</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-500">Visualization</h4>
                        <p className="text-sm text-slate-500">Creating interactive charts</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-slate-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-500">Report Generation</h4>
                        <p className="text-sm text-slate-500">Preparing your dashboard</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Results */}
        {uploadStep === 3 && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900">Analysis Complete!</h1>
              <p className="text-xl text-slate-600">Your survey data has been successfully processed and analyzed</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Data Quality</h3>
                  <div className="text-2xl font-bold text-green-600 mb-1">94%</div>
                  <p className="text-sm text-slate-600">Excellent data quality detected</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Responses</h3>
                  <div className="text-2xl font-bold text-teal-600 mb-1">2,847</div>
                  <p className="text-sm text-slate-600">Survey responses analyzed</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">Insights</h3>
                  <div className="text-2xl font-bold text-purple-600 mb-1">47</div>
                  <p className="text-sm text-slate-600">AI-generated insights</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-teal-50">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">Your Dashboard is Ready!</h3>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                  Explore interactive visualizations, AI-powered insights, and detailed analytics of your survey data.
                  Your personalized dashboard awaits.
                </p>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-lg px-8 py-6"
                  onClick={handleContinueToDashboard}
                >
                  View Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
