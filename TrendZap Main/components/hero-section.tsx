"use client"

import { TrendingUp } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden py-20">
      {/* Gradient background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/50 bg-primary/10">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-semibold">Real-Time Trend Forecasting</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
          Predict the Pulse of Social Media
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Turn your social media intuition into profits. Predict viral moments, engagement metrics, and trending
          content. Win tokens for accurate predictions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50K+</div>
            <p className="text-sm text-muted-foreground">Active Predictions</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary">$2.5M</div>
            <p className="text-sm text-muted-foreground">Total Volume</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">12,890</div>
            <p className="text-sm text-muted-foreground">Top Predictors</p>
          </div>
        </div>
      </div>
    </div>
  )
}
