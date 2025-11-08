"use client"

import { useState } from "react"
import { TrendingUp, Target, Award, Wallet, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuickAddPrediction from "./quick-add-prediction"

export default function DashboardHome() {
  const [showPredictionModal, setShowPredictionModal] = useState(false)

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Welcome Back, Predictor!</h1>
        <p className="text-muted-foreground">Here's your prediction dashboard</p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: Wallet, label: "Balance", value: "15,420", color: "text-primary" },
          { icon: Target, label: "Active Predictions", value: "12", color: "text-secondary" },
          { icon: TrendingUp, label: "Win Rate", value: "68%", color: "text-accent" },
          { icon: Award, label: "Rank", value: "#47", color: "text-primary" },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="glassmorphic p-6 rounded-lg space-y-3 hover:border-primary/50 transition">
              <Icon className={`w-6 h-6 ${stat.color}`} />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Create Prediction Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => setShowPredictionModal(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-3 neon-glow-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create New Prediction
        </Button>
      </div>

      <QuickAddPrediction onClose={() => setShowPredictionModal(false)} defaultOpen={showPredictionModal} />

      {/* Recent Activity */}
      <div className="glassmorphic p-8 rounded-lg space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <p className="text-muted-foreground text-sm mt-1">Your latest predictions and wins</p>
        </div>

        <div className="space-y-3">
          {[
            {
              title: "Predicted TikTok video by @creator",
              metric: "Viral Score > 8.5",
              result: "WON",
              amount: "+450 tokens",
              time: "2 hours ago",
              resultColor: "text-accent",
            },
            {
              title: 'YouTube video "Morning Routine"',
              metric: "Views < 100K in 24h",
              result: "PENDING",
              amount: "-250 tokens",
              time: "1 day ago",
              resultColor: "text-muted-foreground",
            },
            {
              title: "Instagram reel by @influencer",
              metric: "Likes > 50K",
              result: "LOST",
              amount: "-150 tokens",
              time: "3 days ago",
              resultColor: "text-destructive",
            },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-card/30 border border-border/50 rounded-lg hover:border-primary/50 transition"
            >
              <div className="flex-1">
                <p className="font-semibold">{activity.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{activity.metric}</p>
              </div>
              <div className="text-right space-y-1">
                <p className={`font-bold ${activity.resultColor}`}>{activity.result}</p>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
              <div className="ml-4 text-right">
                <p className={`font-bold ${activity.resultColor === "text-accent" ? "text-accent" : ""}`}>
                  {activity.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Markets */}
      <div className="glassmorphic p-8 rounded-lg space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Hot Markets</h2>
          <p className="text-muted-foreground text-sm mt-1">Most active predictions right now</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              creator: "@MrBeast",
              platform: "YouTube",
              metric: "1M+ views in 24h",
              volume: "$128K",
              odds: "72% YES",
            },
            {
              creator: "@addison.rae",
              platform: "TikTok",
              metric: "Viral score > 9",
              volume: "$95K",
              odds: "65% YES",
            },
          ].map((market, i) => (
            <div
              key={i}
              className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg hover:border-primary/50 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold">{market.creator}</p>
                <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">{market.platform}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{market.metric}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Volume: {market.volume}</span>
                <span className="font-semibold text-accent">{market.odds}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
