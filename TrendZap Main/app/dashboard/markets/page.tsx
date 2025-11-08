"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AppNavbar from "@/components/app-navbar"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { MarketCard } from "@/components/market-card"

const PLATFORMS = ["All", "Twitter", "TikTok", "Instagram", "YouTube"]
const CATEGORIES = ["Trending", "Top Volume", "Most Commented", "Ending Soon", "New Markets"]

// Mock market data
const MOCK_MARKETS = Array.from({ length: 48 }, (_, i) => ({
  id: `market-${i + 1}`,
  title: [
    "Will this tweet hit 1M likes?",
    "TikTok video to reach 10M views?",
    "Instagram post to get 100K comments?",
    "YouTube video trending #1?",
    "Twitter thread viral in 24h?",
  ][i % 5],
  image: [
    "https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1633356122544-f134324ef6d8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552960562-daf630e7271b?w=400&h=300&fit=crop",
  ][i % 5],
  yesPercentage: Math.floor(Math.random() * (75 - 25 + 1)) + 25,
  platform: ["twitter", "tiktok", "instagram", "youtube"][i % 4] as any,
  volume: `$${Math.floor(Math.random() * (50 - 1 + 1)) + 1}k`,
  comments: Math.floor(Math.random() * 500),
  metric: ["Views", "Likes", "Comments", "Shares"][i % 4],
  socialLink: "https://twitter.com/example",
}))

export default function MarketsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("Trending")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const filteredMarkets = MOCK_MARKETS.filter((market) => {
    const platformMatch = selectedPlatform === "All" || market.platform.toLowerCase() === selectedPlatform.toLowerCase()
    const searchMatch = market.title.toLowerCase().includes(searchQuery.toLowerCase())
    return platformMatch && searchMatch
  })

  const totalPages = Math.ceil(filteredMarkets.length / itemsPerPage)
  const paginatedMarkets = filteredMarkets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <AppNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search markets..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>

        {/* Platform Filter */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              onClick={() => {
                setSelectedPlatform(platform)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                selectedPlatform === platform
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border hover:border-primary/50"
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 border-b border-border">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category)
                setCurrentPage(1)
              }}
              className={`px-4 py-2 whitespace-nowrap transition ${
                selectedCategory === category
                  ? "text-primary border-b-2 border-primary -mb-px"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {paginatedMarkets.map((market) => (
            <MarketCard key={market.id} {...market} socialLink={market.socialLink} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              size="sm"
              className="min-w-10"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </main>

      <MobileBottomNav />
    </div>
  )
}
