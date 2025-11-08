"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import DashboardHome from "@/components/dashboard-home"
import MarketsPage from "@/components/markets-page"
import PortfolioPage from "@/components/portfolio-page"
import LeaderboardPage from "@/components/leaderboard-page"

type PageType = "home" | "markets" | "portfolio" | "leaderboard"

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>("home")
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnectWallet = async () => {
    // Simulate wallet connection
    setWalletConnected(true)
    setWalletAddress("0x742d35Cc6634C0532925a3b844Bc9e7595f42e3e")
  }

  if (!walletConnected) {
    return <WalletConnectScreen onConnect={handleConnectWallet} />
  }

  return (
    <DashboardLayout onNavigate={setCurrentPage} walletAddress={walletAddress} currentPage={currentPage}>
      {currentPage === "home" && <DashboardHome />}
      {currentPage === "markets" && <MarketsPage />}
      {currentPage === "portfolio" && <PortfolioPage />}
      {currentPage === "leaderboard" && <LeaderboardPage />}
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
