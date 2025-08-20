"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface NavigationProps {
  showAuthButtons?: boolean
  currentPage?: string
}

export function Navigation({ showAuthButtons = true, currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigation("/")}>
            {/* Custom handcrafted logo */}
            <div className="relative">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="w-6 h-6 bg-white rounded-md relative">
                  <div className="absolute top-1 left-1 w-1 h-1 bg-slate-800 rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1 h-1 bg-slate-800 rounded-full"></div>
                  <div className="absolute bottom-1 left-1 w-1 h-1 bg-slate-800 rounded-full"></div>
                  <div className="absolute bottom-1 right-1 w-1 h-1 bg-slate-800 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-slate-800 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full opacity-80"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-slate-800 leading-tight">
                StatWise
              </h1>
              <div className="text-xs text-slate-500 font-medium tracking-wider">ANALYTICS</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => handleNavigation("/integrity")}>
              Security
            </Button>
            {currentPage === "dashboard" && (
              <Button variant="ghost" onClick={() => handleNavigation("/upload")}>
                Upload New Data
              </Button>
            )}

            {showAuthButtons ? (
              <>
                <Button variant="ghost" onClick={() => handleNavigation("/login")}>
                  Sign In
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                  onClick={() => handleNavigation("/login")}
                >
                  Get Started
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={() => handleNavigation("/")}>
                Sign Out
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-200">
            <div className="flex flex-col space-y-2 pt-4">
              <Button variant="ghost" className="justify-start" onClick={() => handleNavigation("/integrity")}>
                Security
              </Button>
              {currentPage === "dashboard" && (
                <Button variant="ghost" className="justify-start" onClick={() => handleNavigation("/upload")}>
                  Upload New Data
                </Button>
              )}

              {showAuthButtons ? (
                <>
                  <Button variant="ghost" className="justify-start" onClick={() => handleNavigation("/login")}>
                    Sign In
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 justify-start"
                    onClick={() => handleNavigation("/login")}
                  >
                    Get Started
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="justify-start bg-transparent"
                  onClick={() => handleNavigation("/")}
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
