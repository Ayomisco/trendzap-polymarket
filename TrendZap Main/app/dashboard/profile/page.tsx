"use client"

import { Settings } from "lucide-react"
import Link from "next/link"
import AppNavbar from "@/components/app-navbar"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const userStats = {
    username: "VocalViper",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f42e3e",
    totalPredictions: 156,
    correctPredictions: 120,
    joinDate: "2024-01-15",
    portfolio: {
      balance: 12458.75,
      invested: 9850.0,
      pnl: 2608.75,
    },
    stats: {
      accuracy: 78.5,
      wins: 120,
      losses: 36,
      rank: 8,
    },
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <AppNavbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{userStats.username}</h1>
              <p className="text-sm text-muted-foreground font-mono">
                {userStats.walletAddress.slice(0, 10)}...{userStats.walletAddress.slice(-8)}
              </p>
            </div>
            <Link href="/dashboard/settings">
              <Button className="gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Total Predictions</p>
            <p className="text-3xl font-bold">{userStats.totalPredictions}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Accuracy</p>
            <p className="text-3xl font-bold text-green-500">{userStats.stats.accuracy}%</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Portfolio Balance</p>
            <p className="text-3xl font-bold">${userStats.portfolio.balance.toFixed(2)}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Leaderboard Rank</p>
            <p className="text-3xl font-bold">#{userStats.stats.rank}</p>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Prediction Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Correct</span>
                <span className="font-bold text-green-500">{userStats.stats.wins}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Incorrect</span>
                <span className="font-bold text-red-500">{userStats.stats.losses}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-bold">
                  {((userStats.stats.wins / userStats.totalPredictions) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">Portfolio Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Invested</span>
                <span className="font-bold">${userStats.portfolio.invested.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Balance</span>
                <span className="font-bold">${userStats.portfolio.balance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-muted-foreground">Total P&L</span>
                <span className="font-bold text-green-500">+${userStats.portfolio.pnl.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Member Info */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Member Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joined</span>
              <span className="font-bold">
                {new Date(userStats.joinDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wallet</span>
              <span className="font-mono text-sm">{userStats.walletAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network</span>
              <span className="font-bold">Polygon</span>
            </div>
          </div>
        </Card>
      </main>

      <MobileBottomNav />
    </div>
  )
}
