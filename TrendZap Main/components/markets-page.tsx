"use client"

import { Search, Users, Zap } from "lucide-react"
import { useState } from "react"

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const markets = [
    {
      id: 1,
      creator: "@MrBeast",
      platform: "YouTube",
      title: "How many views in 24h?",
      metric: "1M+ views",
      volume: "$128K",
      participants: 542,
      odds: "72% YES",
      image: "MB",
    },
    {
      id: 2,
      creator: "@addison.rae",
      platform: "TikTok",
      title: "Will it go viral?",
      metric: "Viral score > 9",
      volume: "$95K",
      participants: 389,
      odds: "65% YES",
      image: "AR",
    },
    {
      id: 3,
      creator: "@David Dobrik",
      platform: "YouTube",
      title: "Engagement rate > 8%?",
      metric: "8%+ engagement",
      volume: "$87K",
      participants: 312,
      odds: "58% YES",
      image: "DD",
    },
    {
      id: 4,
      creator: "@Charli D'Amelio",
      platform: "TikTok",
      title: "100K likes in 1 hour?",
      metric: "100K likes",
      volume: "$156K",
      participants: 621,
      odds: "81% YES",
      image: "CD",
    },
  ]

  const filteredMarkets = markets.filter((market) => {
    const matchesSearch =
      market.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || market.platform.toLowerCase() === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Prediction Markets</h1>
        <p className="text-muted-foreground">Explore all active prediction markets</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3.5 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search creators or markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          {["all", "youtube", "tiktok", "instagram", "x"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg transition ${
                filterType === type
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMarkets.map((market) => (
          <div
            key={market.id}
            className="glassmorphic p-6 rounded-lg hover:border-primary/50 transition cursor-pointer group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-primary-foreground">
                  {market.image}
                </div>
                <div>
                  <p className="font-semibold">{market.creator}</p>
                  <p className="text-xs text-muted-foreground">{market.platform}</p>
                </div>
              </div>
              <Zap className="w-5 h-5 text-accent group-hover:scale-110 transition" />
            </div>

            {/* Content */}
            <div className="space-y-3 mb-4">
              <p className="font-bold text-lg">{market.title}</p>
              <p className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-full inline-block">
                {market.metric}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-y border-border">
              <div>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="font-bold text-lg">{market.volume}</p>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">Participants</p>
                  <p className="font-bold">{market.participants}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Odds</p>
                <p className="font-bold text-accent">{market.odds}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition">
                Vote YES
              </button>
              <button className="flex-1 px-4 py-2 border border-destructive/30 text-destructive rounded-lg font-semibold hover:bg-destructive/10 transition">
                Vote NO
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
