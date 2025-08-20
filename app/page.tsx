"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, BarChart3, Shield, Upload, Target, CheckCircle, ArrowRight, Star } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: Brain,
      title: "Clear analysis",
      description:
        "Find themes, trends, and outliers without the busywork. We do the heavy lifting so you can focus on decisions.",
    },
    {
      icon: Shield,
      title: "Integrity & security",
      description:
        "Hash and anchor your datasets for tamper‑evidence. Optional blockchain proofs for audits and compliance.",
    },
    {
      icon: Upload,
      title: "Fuss-free uploads",
      description:
        "Drag in CSV or Excel. We handle formatting, cleaning, and setup—no templates or scripts required.",
    },
    {
      icon: BarChart3,
      title: "Readable dashboards",
      description: "Charts that make sense at a glance. Shareable, responsive, and easy to act on.",
    },
    {
      icon: Target,
      title: "Team workflows",
      description: "Notes, highlights, and approvals so analysts and stakeholders can work together.",
    },
    {
      icon: Shield,
      title: "Quality checks",
      description: "Built‑in validation and scoring so you can trust what you see.",
    },
    {
      icon: Target,
      title: "Timely alerts",
      description:
        "Be notified when something changes that’s worth your attention—no noise.",
    },
    {
      icon: Target,
      title: "Forecasts that guide",
      description: "Simple projections that help you plan the next step, not overwhelm it.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager at TechCorp",
      content:
        "StatWise AI reduced our survey analysis time from weeks to minutes. The insights are incredibly accurate.",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Research Director",
      content:
        "The AI-powered anomaly detection caught issues we would have missed. Game-changing for our research team.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Data Analyst",
      content:
        "Beautiful visualizations and the real-time dashboard keeps our entire team aligned on customer sentiment.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <Navigation showAuthButtons={true} />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="text-slate-700 border-slate-200 bg-white">
              <CheckCircle className="w-3 h-3 mr-1" />
              Made for research teams, built with care
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Understand your survey results
              <span className="text-slate-700 block">clearly and confidently</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Skip the tedious cleanup and manual tagging. Upload your file and get clear themes, trends, and next steps in minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-lg px-8 py-6"
              onClick={() => (window.location.href = "/upload")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Upload your file
              <ArrowRight className={`w-5 h-5 ml-2 transition-transform ${isHovered ? "translate-x-1" : ""}`} />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              See how it works
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">10M+</div>
              <div className="text-slate-600">Survey Responses Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">95%</div>
              <div className="text-slate-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">2.5x</div>
              <div className="text-slate-600">Faster Than Manual Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900">500+</div>
              <div className="text-slate-600">Companies Trust Us</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-slate-900">What you can do with StatWise</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Practical tools that help you go from raw responses to clear decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-900">How It Works</h2>
            <p className="text-xl text-slate-600">Get insights in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">1. Upload Your Data</h3>
              <p className="text-slate-600">
                Drag and drop your CSV, Excel, or JSON files. Our AI automatically detects the format and structure.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">2. AI Analysis</h3>
              <p className="text-slate-600">
                Advanced algorithms clean your data, detect patterns, and generate insights in real-time.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">3. Get Insights</h3>
              <p className="text-slate-600">
                View interactive dashboards, export reports, and make data-driven decisions instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Our principles</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A product built to help people do careful, thoughtful research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-slate-200 bg-white/50">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Clarity over complexity</h3>
              <p className="text-slate-600">Plain language, fewer clicks, and outputs you can explain to a teammate.</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white/50">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Respect the data</h3>
              <p className="text-slate-600">Your files stay under your control. We prioritize careful handling and transparency.</p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-white/50">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Human in the loop</h3>
              <p className="text-slate-600">Review, edit, and refine. You remain the expert; we speed up the work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-slate-900">What Our Users Say</h2>
          <p className="text-xl text-slate-600">Join hundreds of companies already using StatWise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white">Ready to Transform Your Survey Data?</h2>
            <p className="text-xl text-blue-100">
              Join thousands of companies using StatWise to make better decisions with their data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
                onClick={() => (window.location.href = "/login")}
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 bg-transparent"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm relative">
                      <div className="absolute top-0.5 left-0.5 w-0.5 h-0.5 bg-slate-800 rounded-full"></div>
                      <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-slate-800 rounded-full"></div>
                      <div className="absolute bottom-0.5 left-0.5 w-0.5 h-0.5 bg-slate-800 rounded-full"></div>
                      <div className="absolute bottom-0.5 right-0.5 w-0.5 h-0.5 bg-slate-800 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full opacity-80"></div>
                </div>
                <h3 className="text-xl font-bold">StatWise</h3>
              </div>
              <p className="text-slate-400">
                Transform your survey data into actionable insights with the power of AI.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-slate-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Documentation</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-slate-400">
                <div>About</div>
                <div>Blog</div>
                <div>Careers</div>
                <div>Contact</div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-slate-400">
                <div>Help Center</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
                <div>Status</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 StatWise AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
