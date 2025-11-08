"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Zap, TrendingUp, Users, Shield } from "lucide-react"

export default function LandingPage() {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glassmorphic border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold gradient-text">TrendZap</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground/70 hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition">
              How It Works
            </a>
            <a href="#faq" className="text-foreground/70 hover:text-foreground transition">
              FAQ
            </a>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6 mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <p className="text-sm font-semibold text-primary">
                Powered by Polygon • Real-Time Predictions • Social Gaming
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Predict the <span className="gradient-text">Pulse of Social Media</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              TrendZap gamifies social media virality. Predict engagement metrics, viewership numbers, and viral
              potential. Win tokens for accurate predictions. Real-time influencer data meets prediction markets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition flex items-center justify-center gap-2"
              >
                Start Predicting <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="px-8 py-3 border border-primary/30 text-primary rounded-lg font-semibold hover:bg-primary/10 transition">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20">
            {[
              { number: "50K+", label: "Active Predictions" },
              { number: "$2.5M", label: "Total Volume" },
              { number: "8K+", label: "Community Players" },
            ].map((stat, i) => (
              <div key={i} className="glassmorphic p-6 rounded-lg text-center hover:border-primary/50 transition">
                <div className="text-3xl font-bold gradient-text">{stat.number}</div>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why TrendZap?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Instant Market Creation",
                description: "Paste any social media link and create a prediction market in seconds. No tedious setup.",
              },
              {
                icon: TrendingUp,
                title: "Real-Time Virality Metrics",
                description: "Live engagement tracking powered by X, YouTube, TikTok, and Instagram APIs.",
              },
              {
                icon: Users,
                title: "Compete & Earn",
                description: "Battle on leaderboards and earn tokens for accurate predictions. Monthly rewards.",
              },
              {
                icon: Shield,
                title: "Polygon-Powered",
                description: "Secure, low-fee transactions on Polygon blockchain. Full wallet integration.",
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <div key={i} className="glassmorphic p-6 rounded-lg space-y-3">
                  <Icon className="w-8 h-8 text-primary" />
                  <h3 className="font-bold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>

          <div className="space-y-8">
            {[
              { step: 1, title: "Connect Wallet", description: "Link your Polygon wallet in one click" },
              {
                step: 2,
                title: "Add Content",
                description: "Paste a social media link from TikTok, Instagram, YouTube, or X",
              },
              {
                step: 3,
                title: "Create Market",
                description: "Set metrics to predict (views, likes, shares, viral score)",
              },
              { step: 4, title: "Place Bets", description: "Stake tokens on YES/NO outcomes" },
              {
                step: 5,
                title: "Earn Rewards",
                description: "Win tokens for accurate predictions and climb leaderboards",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-t border-border">
        <div className="container mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Predict?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of predictors earning tokens by forecasting social media trends.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border text-center text-muted-foreground">
        <div className="container mx-auto">
          <p>© 2025 TrendZap. Powered by Polygon. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
