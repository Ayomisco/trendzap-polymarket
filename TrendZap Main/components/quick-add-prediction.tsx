"use client"

import { useState } from "react"
import { X, Link2, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuickAddPredictionProps {
  onClose: () => void
  defaultOpen?: boolean
}

export default function QuickAddPrediction({ onClose, defaultOpen = false }: QuickAddPredictionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [url, setUrl] = useState("")
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [extractedData, setExtractedData] = useState<{
    platform: string
    author: string
    content: string
    thumbnail: string
  } | null>(null)

  const handleClose = () => {
    setIsOpen(false)
    setStep(1)
    setUrl("")
    setExtractedData(null)
    onClose()
  }

  const handlePasteUrl = async () => {
    setLoading(true)
    setTimeout(() => {
      setExtractedData({
        platform: "tiktok",
        author: "@trendingcreator",
        content: "New trending dance challenge - will it hit 10M views in 24h?",
        thumbnail: "/tiktok-thumbnail.png",
      })
      setStep(2)
      setLoading(false)
    }, 1000)
  }

  const handleCreateMarket = () => {
    setStep(3)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glassmorphic max-w-md w-full rounded-lg p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">Create Prediction</h2>
          <button onClick={handleClose} className="text-muted-foreground hover:text-foreground transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Paste Social Media Link</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">
                  <Link2 className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="https://tiktok.com/@creator/video/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Works with TikTok, Instagram, YouTube, Twitter</p>
            </div>

            <Button
              onClick={handlePasteUrl}
              disabled={!url || loading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-primary"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Extract Content"
              )}
            </Button>
          </div>
        )}

        {step === 2 && extractedData && (
          <div className="space-y-4">
            <div className="bg-card/50 rounded-lg p-4 border border-border">
              <div className="flex gap-3">
                <img
                  src={extractedData.thumbnail || "/placeholder.svg"}
                  alt="content"
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-primary/20 text-primary uppercase">
                      {extractedData.platform}
                    </span>
                  </div>
                  <p className="text-sm font-semibold">{extractedData.author}</p>
                  <p className="text-xs text-muted-foreground">{extractedData.content}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">What do you want to predict?</label>
              <div className="space-y-2">
                {["Will reach 10M+ views", "Engagement rate > 5%", "Trending for 24h+", "Custom metric"].map(
                  (option) => (
                    <button
                      key={option}
                      onClick={handleCreateMarket}
                      className="w-full p-3 text-left rounded border border-border hover:border-primary/50 hover:bg-primary/5 transition text-sm"
                    >
                      {option}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent/50 rounded-lg p-4">
              <p className="text-sm font-semibold mb-2">Market Created! 🎉</p>
              <p className="text-xs text-muted-foreground">
                Your prediction is now live. Make your first bet to get started.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold">Your Stake (TZP)</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-2 bg-input border border-border rounded-lg focus:outline-none focus:border-primary/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button className="border border-border hover:bg-card">Predict YES</Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Predict NO</Button>
            </div>

            <Button onClick={handleClose} variant="outline" className="w-full mt-4 bg-transparent">
              Close & Return to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
