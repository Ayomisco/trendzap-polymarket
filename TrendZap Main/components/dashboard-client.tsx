"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import DashboardHome from "@/components/dashboard-home"
import MarketsExplorer from "@/components/markets-explorer"
import PortfolioPage from "@/components/portfolio-page"
import LeaderboardPage from "@/components/leaderboard-page"
import DashboardStats from "@/components/dashboard-stats"

type PageType = "home" | "markets" | "portfolio" | "leaderboard"

export default function DashboardClient() {
  const [currentPage, setCurrentPage] = useState<PageType>("markets")
  const [walletConnected, setWalletConnected] = useState(true)
  const walletAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f42e3e"

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page)
  }

  return (
    <DashboardLayout onNavigate={handleNavigate} walletAddress={walletAddress} currentPage={currentPage}>
      <div className="space-y-8">
        <DashboardStats totalValueLocked="$24,789.36" marketCount={329} winnersCount={800} currentTab={currentPage} />

        {currentPage === "home" && <DashboardHome />}
        {currentPage === "markets" && <MarketsExplorer />}
        {currentPage === "portfolio" && <PortfolioPage />}
        {currentPage === "leaderboard" && <LeaderboardPage />}
      </div>
    </DashboardLayout>
  )
}
