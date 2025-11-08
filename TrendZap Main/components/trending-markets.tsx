"use client"

import { TrendingUp, File as Fire, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TrendingMarkets() {
  const markets = [
    {
      id: 1,
      title: "#FYP Challenge hits 50M views by Friday",
      platform: "tiktok",
      volume: "125K TZP",
      odds: { yes: "1.85", no: "2.15" },
      participants: 1240,
      timeLeft: "3d 12h",
      trend: "+18%",
      hot: true,
    },
    {
      id: 2,
      title: "Instagram Reels engagement avg > 8%",
      platform: "instagram",
      volume: "89K TZP",
      odds: { yes: "2.05", no: "1.95" },
      participants: 892,
      timeLeft: "5d 6h",
      trend: "+5%",
      hot: false,
    },
    {
      id: 3,
      title: "@topinfluencer reaches 100M followers",
      platform: "twitter",
      volume: "234K TZP",
      odds: { yes: "1.65", no: "2.35" },
      participants: 2156,
      timeLeft: "2d 18h",
      trend: "+42%",
      hot: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Trending Markets</h2>
          <p className="text-sm text-muted-foreground mt-1">Hottest predictions right now</p>
        </div>
        <Button variant="outline" className="border-border hover:border-primary/50 bg-transparent">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {markets.map((market) => (
          <div
            key={market.id}
            className={`glassmorphic p-6 rounded-lg border transition hover:border-primary/50 group cursor-pointer relative ${
              market.hot ? "border-primary/30 bg-primary/5" : "border-border"
            }`}
          >
            {market.hot && (
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20">
                  <Fire className="w-3 h-3 text-primary" />
                  <span className="text-xs font-bold text-primary">TRENDING</span>
                </div>
              </div>
            )}

            <div className="mb-4">
              <div className="inline-block px-2 py-1 rounded text-xs font-bold uppercase bg-secondary/20 text-secondary mb-2">
                {market.platform}
              </div>
              <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition">
                {market.title}
              </h3>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {market.participants.toLocaleString()}
                </div>
                <div className="text-accent font-bold">{market.trend}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-card/50 p-2 rounded border border-border/50">
                  <p className="text-xs text-muted-foreground">YES</p>
                  <p className="font-bold text-primary text-sm">{market.odds.yes}</p>
                </div>
                <div className="bg-card/50 p-2 rounded border border-border/50">
                  <p className="text-xs text-muted-foreground">NO</p>
                  <p className="font-bold text-secondary text-sm">{market.odds.no}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border/50">
              <span>{market.volume}</span>
              <span>{market.timeLeft}</span>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              Place Bet
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
