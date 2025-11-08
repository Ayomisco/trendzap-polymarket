"use client"
import { useState } from "react"
import Link from "next/link"
import { Heart, MessageCircle, Zap, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"

interface MarketCardProps {
  id: string
  title: string
  image: string
  yesPercentage: number
  platform: "twitter" | "tiktok" | "instagram" | "youtube"
  volume: string
  comments: number
  metric: string
  socialLink: string
}

export function MarketCard({
  id,
  title,
  image,
  yesPercentage,
  platform,
  volume,
  comments,
  metric,
  socialLink,
}: MarketCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [showQuickBet, setShowQuickBet] = useState(false)
  const [betType, setBetType] = useState<"yes" | "no">("yes")
  const [stake, setStake] = useState(10)

  const noPercentage = 100 - yesPercentage
  const potentialWinnings = (stake * (100 / yesPercentage)).toFixed(2)

  const handleBet = (type: "yes" | "no") => {
    setBetType(type)
    setShowQuickBet(true)
  }

  const handleConfirmBet = () => {
    console.log(`[v0] User placed ${betType} bet for $${stake} on market ${id}`)
    setShowQuickBet(false)
  }

  return (
    <Link href={`/dashboard/market/${id}`}>
      <Card className="group cursor-pointer overflow-hidden bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 flex flex-col h-full">
        {/* Image Section */}
        <div className="relative w-full h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-background to-card flex-shrink-0">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Probability Circle */}
          <div className="absolute top-3 right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-500/20 to-green-500/10 border-2 border-green-500 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <div className="text-sm sm:text-lg font-bold text-green-400">{yesPercentage}%</div>
              <div className="text-xs text-green-400/80">Chance</div>
            </div>
          </div>

          {/* External Link Button */}
          <Link href={socialLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 left-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
            >
              <ExternalLink className="w-4 h-4 text-white" />
            </button>
          </Link>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 space-y-4 flex-grow flex flex-col">
          {/* Title */}
          <h3 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-primary transition flex-grow">
            {title}
          </h3>

          {/* Metric Badge */}
          <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary w-fit">{metric}</div>

          {/* Quick Bet or Yes/No Buttons */}
          {!showQuickBet ? (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleBet("yes")
                }}
                className="px-3 py-2 bg-green-600/80 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition"
              >
                Yes 👍
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleBet("no")
                }}
                className="px-3 py-2 bg-red-600/80 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition"
              >
                No 👎
              </button>
            </div>
          ) : (
            <div className="space-y-3 p-3 bg-card border border-border rounded-lg">
              <div className="space-y-2">
                <label className="text-xs font-semibold">Stake Amount</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setStake(Math.max(1, stake - 10))
                    }}
                    className="px-2 py-1 bg-primary/20 hover:bg-primary/30 rounded text-xs"
                  >
                    -10
                  </button>
                  <input
                    type="number"
                    value={stake}
                    onChange={(e) => setStake(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 px-2 py-1 bg-background border border-border rounded text-sm text-center"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setStake(stake + 10)
                    }}
                    className="px-2 py-1 bg-primary/20 hover:bg-primary/30 rounded text-xs"
                  >
                    +10
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">To win ${potentialWinnings}</p>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleConfirmBet()
                }}
                className={`w-full py-2 text-white text-sm font-semibold rounded-lg transition ${
                  betType === "yes" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                Buy {betType.toUpperCase()} for ${stake}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowQuickBet(false)
                }}
                className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Footer Stats */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground border-t border-border pt-3">
            <div className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span>{volume}</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
                className="hover:text-primary transition"
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current text-destructive" : ""}`} />
              </button>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
