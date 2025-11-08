"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link2, Loader2 } from "lucide-react"

interface CreatePredictionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePredictionModal({ open, onOpenChange }: CreatePredictionModalProps) {
  const [step, setStep] = useState(1)
  const [socialLink, setSocialLink] = useState("")
  const [metric, setMetric] = useState("views")
  const [targetValue, setTargetValue] = useState("")
  const [timeframe, setTimeframe] = useState("24h")
  const [isLoading, setIsLoading] = useState(false)

  const handleExtractContent = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep(2)
    }, 1500)
  }

  const handleCreateMarket = async () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
      setStep(1)
      setSocialLink("")
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Prediction Market</DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Paste a social media link to get started</p>

            <div className="space-y-2">
              <Label htmlFor="social-link">Social Media Link</Label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="social-link"
                  placeholder="https://twitter.com/... or https://tiktok.com/..."
                  value={socialLink}
                  onChange={(e) => setSocialLink(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Button onClick={handleExtractContent} disabled={!socialLink || isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Extracting...
                </>
              ) : (
                "Extract Content"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Set up your prediction parameters</p>

            <div className="space-y-2">
              <Label>What do you want to predict?</Label>
              <Tabs value={metric} onValueChange={setMetric}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="views">Views</TabsTrigger>
                  <TabsTrigger value="likes">Likes</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target">Target Value</Label>
              <Input
                id="target"
                type="number"
                placeholder="e.g., 1000000"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Timeframe</Label>
              <Tabs value={timeframe} onValueChange={setTimeframe}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7 days</TabsTrigger>
                  <TabsTrigger value="30d">30 days</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleCreateMarket} disabled={!targetValue || isLoading} className="flex-1">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Market"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
