"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import DashboardHome from "@/components/dashboard-home"
import MarketsExplorer from "@/components/markets-explorer"
import PortfolioPage from "@/components/portfolio-page"
import LeaderboardPage from "@/components/leaderboard-page"
import DashboardStats from "@/components/dashboard-stats"

type PageType = "home" | "markets" | "portfolio" | "leaderboard"

export default function Dashboard() {
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

function WalletConnectScreen({ onConnect }: { onConnect: () => void }) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Connect Your Wallet</h1>
          <p className="text-muted-foreground">
            Connect your Polygon wallet to start predicting and earning tokens on TrendZap.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onConnect}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition"
          >
            MetaMask
          </button>
          <button
            onClick={onConnect}
            className="w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-secondary/50 transition"
          >
            WalletConnect
          </button>
          <button
            onClick={onConnect}
            className="w-full px-6 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition"
          >
            Coinbase Wallet
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          You'll be connecting to Polygon mainnet. Make sure you have some MATIC for gas fees.
        </p>
      </div>
    </div>
  )
}
