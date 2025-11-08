"use client"

import { ArrowUpRight, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import AppNavbar from "@/components/app-navbar"
import MobileBottomNav from "@/components/mobile-bottom-nav"

export default function MarketDetailPage({ params }: { params: { id: string } }) {
  const market = {
    id: params.id,
    title: "Will Trump create Bitcoin reserve in first 100 days?",
    description:
      "This market resolves YES if Donald Trump announces and implements a Bitcoin reserve for the US government within the first 100 days of his presidency.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
    platform: "twitter",
    socialLink: "https://twitter.com/BitcoinBTC/status/1234567890",
    yesOdds: 72,
    noOdds: 28,
    volume: "$4.2M",
    participants: 12847,
    comments: 3421,
    endsAt: "2025-02-15T23:59:59Z",
    createdAt: "2025-01-08T10:30:00Z",
  }

  const chartData = [
    { time: "Day 1", yes: 65, no: 35 },
    { time: "Day 2", yes: 68, no: 32 },
    { time: "Day 3", yes: 70, no: 30 },
    { time: "Day 4", yes: 72, no: 28 },
  ]

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <AppNavbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <img
            src={market.image || "/placeholder.svg"}
            alt={market.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                <span className="capitalize">{market.platform}</span>
                <span>•</span>
                <span>Created {new Date(market.createdAt).toLocaleDateString()}</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{market.title}</h1>
              <p className="text-muted-foreground">{market.description}</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button asChild>
                <a href={market.socialLink} target="_blank" rel="noopener noreferrer">
                  View Post <ArrowUpRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Odds */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Current Odds</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-6 rounded-lg bg-green-500/10 border border-green-500/50">
                  <p className="text-green-400 font-semibold mb-2">YES</p>
                  <p className="text-4xl font-bold text-green-500 mb-2">{market.yesOdds}%</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Buy YES</Button>
                </div>
                <div className="text-center p-6 rounded-lg bg-red-500/10 border border-red-500/50">
                  <p className="text-red-400 font-semibold mb-2">NO</p>
                  <p className="text-4xl font-bold text-red-500 mb-2">{market.noOdds}%</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Buy NO</Button>
                </div>
              </div>
            </Card>

            {/* Chart */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Odds History</h2>
              <div className="space-y-4">
                {chartData.map((point, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-sm font-medium">{point.time}</p>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <div className="flex items-end gap-2">
                          <div className="flex-1 h-8 rounded bg-green-500/50" style={{ width: `${point.yes}%` }} />
                          <span className="text-sm">{point.yes}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Comments */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Community Discussion</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="pb-4 border-b border-border last:border-b-0">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold">User {i}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Great market! I think YES is likely given recent political trends.
                        </p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <button className="hover:text-foreground">👍 24</button>
                          <button className="hover:text-foreground">💬 Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Stats */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">Market Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Volume</span>
                  <span className="font-bold">{market.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-bold">{market.participants.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Comments</span>
                  <span className="font-bold">{market.comments.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-muted-foreground">Ends</span>
                  <span className="font-bold">{new Date(market.endsAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Card>

            {/* Info */}
            <Card className="p-6">
              <h3 className="font-bold mb-4">About This Market</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Built on Polygon blockchain</p>
                <p>• Liquidity-based AMM pricing</p>
                <p>• Oracle-verified resolution</p>
                <p>• No fees on withdrawals</p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  )
}
