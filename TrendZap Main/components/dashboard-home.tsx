"use client"

import { useState } from "react"
import { TrendingUp, Target, Award, Wallet, Plus, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuickAddPrediction from "./quick-add-prediction"

export default function DashboardHome() {
  const [showPredictionModal, setShowPredictionModal] = useState(false)

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header with CTA */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base mt-1">Track your predictions and earnings</p>
        </div>
        <Button
          onClick={() => setShowPredictionModal(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-6 py-3 w-full md:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Prediction
        </Button>
      </div>

      {/* Key Stats - Mobile first grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: Wallet, label: "Balance", value: "15,420", color: "text-primary" },
          { icon: Target, label: "Active", value: "12", color: "text-secondary" },
          { icon: TrendingUp, label: "Win Rate", value: "68%", color: "text-accent" },
          { icon: Award, label: "Rank", value: "#47", color: "text-primary" },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="glassmorphic p-4 md:p-6 rounded-lg space-y-2">
              <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Two Column Layout for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Recent Activity - Takes 2 columns on desktop */}
        <div className="lg:col-span-2">
          <div className="glassmorphic p-6 md:p-8 rounded-lg space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Recent Activity</h2>

            <div className="space-y-3">
              {[
                {
                  title: "TikTok video by @creator",
                  metric: "Viral Score > 8.5",
                  result: "WON",
                  amount: "+450",
                  time: "2h ago",
                  resultColor: "text-accent",
                  icon: ArrowUpRight,
                },
                {
                  title: 'YouTube: "Morning Routine"',
                  metric: "Views < 100K in 24h",
                  result: "PENDING",
                  amount: "-250",
                  time: "1d ago",
                  resultColor: "text-muted-foreground",
                  icon: null,
                },
                {
                  title: "Instagram reel @influencer",
                  metric: "Likes > 50K",
                  result: "LOST",
                  amount: "-150",
                  time: "3d ago",
                  resultColor: "text-destructive",
                  icon: ArrowDownRight,
                },
              ].map((activity, i) => {
                const Icon = activity.icon
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-3 p-4 bg-card/30 border border-border/50 rounded-lg hover:border-primary/50 transition"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm md:text-base truncate">{activity.title}</p>
                      <p className="text-xs md:text-sm text-muted-foreground truncate">{activity.metric}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-right">
                        <p className={`font-bold text-sm md:text-base ${activity.resultColor}`}>{activity.result}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      {Icon && <Icon className={`w-4 h-4 ${activity.resultColor}`} />}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Hot Markets - Sidebar on desktop */}
        <div className="glassmorphic p-6 md:p-8 rounded-lg space-y-4">
          <h2 className="text-xl md:text-2xl font-bold">Trending</h2>

          <div className="space-y-3">
            {[
              {
                creator: "@MrBeast",
                metric: "1M+ views",
                volume: "$128K",
                odds: "72%",
              },
              {
                creator: "@addison.rae",
                metric: "Viral score 9+",
                volume: "$95K",
                odds: "65%",
              },
            ].map((market, i) => (
              <button
                key={i}
                className="w-full p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-lg hover:border-primary/50 transition text-left group"
              >
                <p className="font-bold text-sm">{market.creator}</p>
                <p className="text-xs text-muted-foreground mt-1">{market.metric}</p>
                <div className="flex items-center justify-between text-xs mt-3">
                  <span className="text-muted-foreground">{market.volume}</span>
                  <span className="text-accent font-semibold group-hover:text-accent/80">{market.odds}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <QuickAddPrediction onClose={() => setShowPredictionModal(false)} defaultOpen={showPredictionModal} />
    </div>
  )
}
