"use client"

import type React from "react"
import { AppNavbar } from "./app-navbar"
import MobileBottomNav from "./mobile-bottom-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
  onNavigate: (page: "markets" | "portfolio" | "leaderboard") => void
  walletAddress: string
  currentPage: string
}

export default function DashboardLayout({ children, onNavigate, walletAddress, currentPage }: DashboardLayoutProps) {
  const handleDisconnect = () => {
    window.location.reload()
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppNavbar walletAddress={walletAddress} balance={12500.5} onDisconnect={handleDisconnect} />

      <main className="flex-1 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>

      <MobileBottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  )
}
