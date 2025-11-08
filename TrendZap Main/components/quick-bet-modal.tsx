"use client"

import { useState } from "react"
import { X, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuickBetModalProps {
  isOpen: boolean
  onClose: () => void
  marketTitle: string
  marketId: string
  yesPercentage: number
  betType: "yes" | "no"
  onBuyNow: (amount: number) => void
  onViewDetails: () => void
}

export function QuickBetModal({
  isOpen,
  onClose,
  marketTitle,
  marketId,
  yesPercentage,
  betType,
  onBuyNow,
  onViewDetails,
}: QuickBetModalProps) {
  const [stakeAmount, setStakeAmount] = useState(10)

  if (!isOpen) return null

  // Calculate potential winnings based on probability
  const noPercentage = 100 - yesPercentage
  const selectedPercentage = betType === "yes" ? yesPercentage : noPercentage
  const potentialWinnings = (stakeAmount * 100) / selectedPercentage

  const handleAmountChange = (value: number) => {
    if (value > 0 && value <= 1000) {
      setStakeAmount(value)
    }
  }

  const handleQuickBuy = () => {
    onBuyNow(stakeAmount)
    setStakeAmount(10)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card border border-border rounded-xl shadow-2xl p-6 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-card rounded transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Market Title */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Market</p>
          <p className="font-semibold line-clamp-2">{marketTitle}</p>
        </div>

        {/* Stake Input Section */}
        <div className="space-y-4 bg-background/50 rounded-lg p-4">
          {/* Amount Display */}
          <div>
            <p className="text-4xl font-bold">${stakeAmount}</p>
            <p className="text-xs text-muted-foreground mt-1">Stake Amount</p>
          </div>

          {/* Quick Adjustment Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => handleAmountChange(stakeAmount + 1)} className="flex-1">
              +1
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleAmountChange(stakeAmount + 10)} className="flex-1">
              +10
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleAmountChange(Math.max(1, stakeAmount - 1))}
              className="flex-1"
            >
              -1
            </Button>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="1"
            max="1000"
            value={stakeAmount}
            onChange={(e) => handleAmountChange(Number(e.target.value))}
            className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
          />

          {/* Min/Max Labels */}
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Min: $1</span>
            <span>Max: $1000</span>
          </div>
        </div>

        {/* Potential Winnings */}
        <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-1">To win</p>
          <p className="text-2xl font-bold text-primary">${potentialWinnings.toFixed(2)}</p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          {/* Quick Buy Button */}
          <Button
            onClick={handleQuickBuy}
            className={`w-full py-6 font-semibold text-lg rounded-lg transition ${
              betType === "yes"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Buy {betType === "yes" ? "Yes" : "No"}
          </Button>

          {/* View Details Link */}
          <Button
            onClick={() => {
              onViewDetails()
              onClose()
            }}
            variant="ghost"
            className="w-full group"
          >
            View Details & More Options
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
          </Button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground text-center">
          By clicking Buy, you agree to our terms and conditions
        </p>
      </div>
    </div>
  )
}

export default QuickBetModal
