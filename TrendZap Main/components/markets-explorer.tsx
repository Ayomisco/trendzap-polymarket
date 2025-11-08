"use client"

import { useState } from "react"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MarketCard } from "@/components/market-card"
import { CreatePredictionModal } from "@/components/create-prediction-modal"

const CATEGORIES = [
  { id: "all", label: "All Markets", icon: "📊" },
  { id: "trending", label: "Trending Now", icon: "🔥" },
  { id: "twitter", label: "Twitter/X", icon: "𝕏" },
  { id: "tiktok", label: "TikTok", icon: "🎵" },
  { id: "instagram", label: "Instagram", icon: "📸" },
  { id: "youtube", label: "YouTube", icon: "📺" },
  { id: "engagement", label: "Engagement", icon: "💬" },
  { id: "views", label: "Views", icon: "👁️" },
]

const MOCK_MARKETS = [
  {
    id: "1",
    title: "Will this TikTok reach 1M views in 24 hours?",
    image: "/placeholder.svg?key=0ru0h",
    yesPercentage: 74,
    platform: "tiktok" as const,
    volume: "$4.6m",
    comments: 330,
    liked: false,
    metric: "Video Views",
  },
  {
    id: "2",
    title: "Will this tweet get over 50k likes?",
    image: "/placeholder.svg?key=dvh8z",
    yesPercentage: 34,
    platform: "twitter" as const,
    volume: "$4.6m",
    comments: 330,
    liked: false,
    metric: "Tweet Engagement",
  },
  {
    id: "3",
    title: "Will Instagram post reach top 10 trending?",
    image: "/placeholder.svg?key=r62n9",
    yesPercentage: 64,
    platform: "instagram" as const,
    volume: "$4.6m",
    comments: 330,
    liked: false,
    metric: "Post Reach",
  },
  {
    id: "4",
    title: "Will YouTube video get 500k views in a week?",
    image: "/placeholder.svg?key=mekk4",
    yesPercentage: 34,
    platform: "youtube" as const,
    volume: "$4.6m",
    comments: 330,
    liked: false,
    metric: "Video Views",
  },
]

interface MarketsExplorerProps {
  onCreatePrediction?: () => void
}

function MarketsExplorer({ onCreatePrediction }: MarketsExplorerProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("categories-scroll")
    if (container) {
      const scrollAmount = 300
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="space-y-8">
      {/* Create Prediction CTA */}
      <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-lg border border-primary/20 p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Want to create a prediction?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Paste a social media link to start a new prediction market and earn rewards!
        </p>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Prediction
        </Button>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground">CATEGORIES</h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 hover:bg-card rounded transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 hover:bg-card rounded transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          id="categories-scroll"
          className="flex gap-2 overflow-x-auto scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                activeCategory === category.id
                  ? "bg-accent text-accent-foreground font-semibold"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Markets Grid */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">EXPLORE MARKETS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_MARKETS.map((market) => (
            <MarketCard key={market.id} {...market} />
          ))}
        </div>
      </div>

      {/* Create Prediction Modal */}
      <CreatePredictionModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  )
}

export default MarketsExplorer
