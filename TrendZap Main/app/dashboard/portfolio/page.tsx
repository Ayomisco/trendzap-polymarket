"use client"

import { ArrowUpRight, ArrowDownLeft } from "lucide-react"
import AppNavbar from "@/components/app-navbar"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { Card } from "@/components/ui/card"

const POSITIONS = [
  {
    id: "1",
    title: "Will Trump create Bitcoin reserve?",
    platform: "twitter",
    position: "YES",
    amount: 100,
    currentValue: 234.5,
    pnl: 134.5,
    pnlPercent: 134.5,
    timeframe: "30 days",
    status: "active",
  },
  {
    id: "2",
    title: "TikTok banned in US by May 2025?",
    platform: "tiktok",
    position: "NO",
    amount: 50,
    currentValue: 45.2,
    pnl: -4.8,
    pnlPercent: -9.6,
    timeframe: "60 days",
    status: "active",
  },
  {
    id: "3",
    title: "Instagram Reels to hit 1B daily users?",
    platform: "instagram",
    position: "YES",
    amount: 200,
    currentValue: 189.3,
    pnl: -10.7,
    pnlPercent: -5.35,
    timeframe: "90 days",
    status: "active",
  },
]

export default function PortfolioPage() {
  const totalBalance = 12458.75
  const totalInvested = 9850.0
  const totalPnL = 2608.75
  const totalPnLPercent = 26.47

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
            <p className="text-3xl font-bold">${totalBalance.toFixed(2)}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Invested</p>
            <p className="text-3xl font-bold">${totalInvested.toFixed(2)}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total P&L</p>
            <p className={`text-3xl font-bold ${totalPnL >= 0 ? "text-green-500" : "text-red-500"}`}>
              ${totalPnL.toFixed(2)}
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Return</p>
            <p className={`text-3xl font-bold ${totalPnLPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
              {totalPnLPercent.toFixed(2)}%
            </p>
          </Card>
        </div>

        {/* Active Positions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Your Positions</h2>
          {POSITIONS.map((position) => (
            <Card key={position.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{position.title}</h3>
                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <span className="capitalize">{position.platform}</span>
                    <span>{position.timeframe}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Position</p>
                    <p className={`font-bold ${position.position === "YES" ? "text-green-500" : "text-red-500"}`}>
                      {position.position}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Staked</p>
                    <p className="font-bold">${position.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Current Value</p>
                    <p className="font-bold">${position.currentValue.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">P&L</p>
                    <div
                      className={`flex items-center gap-1 font-bold ${position.pnl >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {position.pnl >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                      {Math.abs(position.pnlPercent).toFixed(2)}%
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <MobileBottomNav />
    </div>
  )
}
