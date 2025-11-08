"use client"

import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  onAddPrediction: () => void
}

export default function Navigation({ onAddPrediction }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphic border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Zap className="w-8 h-8 text-primary neon-glow-primary" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">TrendZap</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm hover:text-primary transition">
              Markets
            </a>
            <a href="#" className="text-sm hover:text-primary transition">
              Portfolio
            </a>
            <a href="#" className="text-sm hover:text-primary transition">
              Leaderboard
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-muted-foreground">Balance</div>
              <div className="text-lg font-bold text-accent">2,450 TZP</div>
            </div>
            <Button
              onClick={onAddPrediction}
              className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-primary"
            >
              <Zap className="w-4 h-4 mr-2" />
              Predict
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
