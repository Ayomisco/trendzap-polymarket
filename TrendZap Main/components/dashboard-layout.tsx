"use client"

import type React from "react"
import TopNavbar from "./top-navbar"

interface DashboardLayoutProps {
  children: React.ReactNode
  onNavigate: (page: "home" | "markets" | "portfolio" | "leaderboard") => void
  walletAddress: string
  currentPage: string
}

export default function DashboardLayout({ children, onNavigate, walletAddress, currentPage }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavbar walletAddress={walletAddress} onNavigate={onNavigate} currentPage={currentPage} />

      {/* Main Content - Full width with responsive padding */}
      <main className="px-4 md:px-8 lg:px-12 py-8 max-w-7xl mx-auto">{children}</main>
    </div>
  )
}
