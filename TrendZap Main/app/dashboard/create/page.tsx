"use client"

import { useState } from "react"
import { ArrowRight, Loader, CheckCircle } from "lucide-react"
import Link from "next/link"
import AppNavbar from "@/components/app-navbar"
import MobileBottomNav from "@/components/mobile-bottom-nav"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Step = "link" | "details" | "stake" | "success"

interface PredictionData {
  socialLink: string
  platform: "twitter" | "tiktok" | "instagram" | "youtube"
  title: string
  metric: string
  timeframe: string
  image: string
}

export default function CreatePredictionPage() {
  const [step, setStep] = useState<Step>("link")
  const [loading, setLoading] = useState(false)
  const [prediction, setPrediction] = useState<PredictionData>({
    socialLink: "",
    platform: "twitter",
    title: "",
    metric: "Views",
    timeframe: "7 days",
    image: "",
  })
  const [stake, setStake] = useState(100)
  const [betType, setBetType] = useState<"yes" | "no">("yes")
  const [createdMarketId, setCreatedMarketId] = useState("")

  const metrics = ["Views", "Likes", "Comments", "Shares", "Retweets", "Followers"]
  const timeframes = ["24 hours", "7 days", "30 days", "60 days", "90 days"]

  const handleExtractLink = async () => {
    if (!prediction.socialLink) return

    setLoading(true)
    // Simulate API call to extract content from social media link
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock extracted data
    setPrediction((prev) => ({
      ...prev,
      title: "Will this post reach 1M engagement?",
      image: "https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400&h=300&fit=crop",
      platform: prediction.socialLink.includes("twitter")
        ? "twitter"
        : prediction.socialLink.includes("tiktok")
          ? "tiktok"
          : prediction.socialLink.includes("instagram")
            ? "instagram"
            : "youtube",
    }))
    setLoading(false)
    setStep("details")
  }

  const handleCreateMarket = async () => {
    setLoading(true)
    // Simulate API call to create market
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setCreatedMarketId(`market-${Date.now()}`)
    setLoading(false)
    setStep("stake")
  }

  const handlePlaceInitialStake = async () => {
    setLoading(true)
    // Simulate API call to place stake
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setStep("success")
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <AppNavbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Create a Prediction</h1>
          <p className="text-muted-foreground">Start a new market and be the first to stake</p>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          {(["link", "details", "stake", "success"] as const).map((s, i) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition ${
                (["link", "details", "stake", "success"] as const).indexOf(step) >= i ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Link Input */}
        {step === "link" && (
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <Label className="text-base mb-3 block">Paste Social Media Link</Label>
                <Input
                  placeholder="https://twitter.com/example/status/1234567890"
                  value={prediction.socialLink}
                  onChange={(e) => setPrediction((prev) => ({ ...prev, socialLink: e.target.value }))}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Supports Twitter, TikTok, Instagram, and YouTube links
                </p>
              </div>

              <Button onClick={handleExtractLink} disabled={!prediction.socialLink || loading} className="w-full h-12">
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Extracting content...
                  </>
                ) : (
                  <>
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Details */}
        {step === "details" && (
          <Card className="p-8">
            <div className="space-y-6">
              {/* Preview */}
              <div className="rounded-lg overflow-hidden bg-muted h-48">
                <img
                  src={prediction.image || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <div>
                <Label className="text-base mb-3 block">Prediction Title</Label>
                <Input
                  value={prediction.title}
                  onChange={(e) => setPrediction((prev) => ({ ...prev, title: e.target.value }))}
                  className="h-12"
                />
              </div>

              {/* Metric */}
              <div>
                <Label className="text-base mb-3 block">Metric</Label>
                <select
                  value={prediction.metric}
                  onChange={(e) => setPrediction((prev) => ({ ...prev, metric: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                >
                  {metrics.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeframe */}
              <div>
                <Label className="text-base mb-3 block">Timeframe</Label>
                <select
                  value={prediction.timeframe}
                  onChange={(e) => setPrediction((prev) => ({ ...prev, timeframe: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                >
                  {timeframes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep("link")} className="flex-1 h-12">
                  Back
                </Button>
                <Button onClick={handleCreateMarket} disabled={!prediction.title || loading} className="flex-1 h-12">
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      Create Market <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Initial Stake */}
        {step === "stake" && (
          <Card className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Market Created Successfully!</p>
                <h2 className="text-2xl font-bold">{prediction.title}</h2>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Be the First to Stake</h3>
                <div className="space-y-4">
                  {/* Bet Type */}
                  <div>
                    <Label className="text-sm mb-3 block">Your Prediction</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setBetType("yes")}
                        className={`p-3 rounded-lg font-semibold transition ${
                          betType === "yes"
                            ? "bg-green-600 text-white"
                            : "bg-card border border-border hover:border-primary"
                        }`}
                      >
                        YES 👍
                      </button>
                      <button
                        onClick={() => setBetType("no")}
                        className={`p-3 rounded-lg font-semibold transition ${
                          betType === "no"
                            ? "bg-red-600 text-white"
                            : "bg-card border border-border hover:border-primary"
                        }`}
                      >
                        NO 👎
                      </button>
                    </div>
                  </div>

                  {/* Stake Amount */}
                  <div>
                    <Label className="text-sm mb-3 block">Initial Stake Amount</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setStake(Math.max(10, stake - 50))}>
                        -$50
                      </Button>
                      <Input
                        type="number"
                        value={stake}
                        onChange={(e) => setStake(Math.max(10, Number.parseInt(e.target.value) || 10))}
                        className="text-center h-10"
                      />
                      <Button variant="outline" size="sm" onClick={() => setStake(stake + 50)}>
                        +$50
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Minimum: $10, Maximum: $10,000</p>
                  </div>

                  {/* Summary */}
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Your Stake</span>
                      <span className="font-bold">${stake}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Potential Payout</span>
                      <span className="font-bold text-green-500">${(stake * 2).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep("details")} className="flex-1 h-12">
                  Back
                </Button>
                <Button onClick={handlePlaceInitialStake} disabled={loading} className="flex-1 h-12">
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Placing Stake...
                    </>
                  ) : (
                    <>
                      Place Stake <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Success */}
        {step === "success" && (
          <Card className="p-8 text-center">
            <div className="space-y-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h2 className="text-3xl font-bold mb-2">Prediction Created!</h2>
                <p className="text-muted-foreground">
                  Your market has been created and your initial stake placed. Other users can now trade against your
                  prediction.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Market ID</span>
                  <span className="font-mono text-xs">{createdMarketId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Your Stake</span>
                  <span className="font-bold">${stake}</span>
                </div>
                <div className="flex justify-between">
                  <span>Position</span>
                  <span className="font-bold">{betType.toUpperCase()}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/dashboard/markets" className="flex-1">
                  <Button variant="outline" className="w-full h-12 bg-transparent">
                    Browse Markets
                  </Button>
                </Link>
                <Link href="/dashboard/portfolio" className="flex-1">
                  <Button className="w-full h-12">View Portfolio</Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </main>

      <MobileBottomNav />
    </div>
  )
}
