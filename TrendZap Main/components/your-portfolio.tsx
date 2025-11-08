"use client"

import { TrendingUp, TrendingDown, Award } from "lucide-react"

export default function YourPortfolio() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="glassmorphic p-6 rounded-lg border border-border hover:border-primary/50 transition">
        <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
        <p className="text-3xl font-bold gradient-text">2,450 TZP</p>
        <p className="text-xs text-accent mt-2">+$245.00</p>
      </div>

      <div className="glassmorphic p-6 rounded-lg border border-border hover:border-secondary/50 transition">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Wins</p>
          <TrendingUp className="w-4 h-4 text-secondary" />
        </div>
        <p className="text-3xl font-bold text-secondary">24</p>
        <p className="text-xs text-muted-foreground mt-2">Win Rate: 68%</p>
      </div>

      <div className="glassmorphic p-6 rounded-lg border border-border hover:border-destructive/50 transition">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Active Bets</p>
          <TrendingDown className="w-4 h-4 text-destructive" />
        </div>
        <p className="text-3xl font-bold text-destructive">8</p>
        <p className="text-xs text-muted-foreground mt-2">$1,240 at risk</p>
      </div>

      <div className="glassmorphic p-6 rounded-lg border border-border hover:border-accent/50 transition">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Rank</p>
          <Award className="w-4 h-4 text-accent" />
        </div>
        <p className="text-3xl font-bold text-accent">#42</p>
        <p className="text-xs text-muted-foreground mt-2">Leaderboard</p>
      </div>
    </div>
  )
}
