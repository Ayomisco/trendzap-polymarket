"use client"

import { useState } from "react"
import Link from "next/link"
import { Zap, Bell, LogOut, Menu, X } from "lucide-react"

interface TopNavbarProps {
  walletAddress: string
  onNavigate: (page: "home" | "markets" | "portfolio" | "leaderboard") => void
  currentPage: string
}

export default function TopNavbar({ walletAddress, onNavigate, currentPage }: TopNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", id: "home" },
    { label: "Markets", id: "markets" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Leaderboard", id: "leaderboard" },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-lg md:text-xl font-bold gradient-text hidden sm:inline">TrendZap</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as any)}
                className={`text-sm font-medium transition ${
                  currentPage === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section - Notifications & Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-card rounded-lg transition group">
              <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-card transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {walletAddress.slice(2, 4).toUpperCase()}
                </div>
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 glassmorphic rounded-lg py-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-xs text-muted-foreground">Connected Wallet</p>
                    <p className="font-mono text-xs break-all mt-1">{walletAddress}</p>
                  </div>

                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-card/50 transition text-left">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Profile
                  </button>

                  <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-card/50 transition text-left">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Settings
                  </button>

                  <div className="border-t border-border pt-1">
                    <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition text-left">
                      <LogOut className="w-4 h-4" />
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-card rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id as any)
                  setMobileMenuOpen(false)
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${
                  currentPage === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-card"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Spacer to account for fixed navbar */}
      <div className="h-16" />
    </>
  )
}
