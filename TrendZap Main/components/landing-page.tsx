"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, TrendingUp, Zap, Target, Wallet, BarChart3 } from "lucide-react"

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-background/40 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:inline">TrendZap</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10">
            {["Home", "Explore", "Markets", "Leaderboard"].map((item) => (
              <button
                key={item}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition rounded-full hover:bg-white/10"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition hidden sm:block">
              Login
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/50 transition text-sm"
            >
              Connect Wallet
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Glassmorphic Glow */}
      <section className="relative pt-32 md:pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-transparent to-cyan-600 blur-3xl rounded-full"></div>
        </div>

        <div className="relative container mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <p className="text-xs md:text-sm font-medium text-foreground/80">Live on Polygon Network</p>
            </div>

            {/* Hero Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white">Turn Social Media into</span>
                <span className="block gradient-text text-5xl md:text-7xl lg:text-8xl">Prediction Rewards</span>
              </h1>
              <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                Copy a social link, predict engagement metrics, and win tokens for accurate forecasts. Gamified
                prediction markets for influencer content.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/dashboard"
                className="px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-primary/40 transition flex items-center justify-center gap-2 group"
              >
                Start Predicting <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </Link>
              <button className="px-8 py-3.5 border border-white/10 text-foreground rounded-full font-semibold hover:bg-white/5 transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="mt-24 relative">
            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-tr from-primary to-secondary rounded-full blur-lg opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>

            {/* Integration Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                {
                  platform: "TikTok",
                  metric: "Views Predicted",
                  value: "2.5M+",
                  percentage: "+45%",
                  icon: "🎬",
                  color: "from-black to-gray-700",
                },
                {
                  platform: "Instagram",
                  metric: "Engagement Rate",
                  value: "18.5K",
                  percentage: "+32%",
                  icon: "📸",
                  color: "from-pink-600 to-purple-600",
                },
                {
                  platform: "YouTube",
                  metric: "Video Views",
                  value: "890K",
                  percentage: "+56%",
                  icon: "🎥",
                  color: "from-red-600 to-red-700",
                },
                {
                  platform: "X (Twitter)",
                  metric: "Retweets",
                  value: "150K",
                  percentage: "+28%",
                  icon: "𝕏",
                  color: "from-gray-800 to-black",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-secondary/0 group-hover:from-primary/10 group-hover:to-secondary/10 transition"></div>
                  <div className="relative space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-foreground/60">{item.platform}</p>
                        <p className="text-sm text-foreground/80 mt-1">{item.metric}</p>
                      </div>
                      <div className="text-2xl">{item.icon}</div>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-white/5">
                      <p className="text-lg font-bold text-white">{item.value}</p>
                      <div className="px-2 py-1 bg-accent/20 border border-accent/50 rounded-full">
                        <p className="text-xs font-semibold text-accent">{item.percentage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="space-y-4 mb-16">
            <p className="text-sm font-semibold text-primary/80 uppercase tracking-wider">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Unlock Prediction
              <br />
              <span className="gradient-text">Market Rewards</span>
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group col-span-1 p-8 bg-gradient-to-br from-primary/30 to-secondary/20 backdrop-blur-lg border border-primary/30 rounded-3xl overflow-hidden transition hover:border-primary/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent group-hover:from-primary/40 transition opacity-50"></div>
              <div className="relative space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center group-hover:bg-primary/30 transition">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Copy & Predict Instantly</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Paste any TikTok, Instagram, YouTube, or X link directly into TrendZap. Our AI extracts real-time
                  metrics and creates markets instantly.
                </p>
              </div>
            </div>

            <div
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:border-white/20 hover:bg-white/10 transition"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition">
                  <Target className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold">Stake & Compete</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Place bets on viewership, engagement, viral potential, and more. Compete on global leaderboards and
                  win monthly token rewards.
                </p>
              </div>
            </div>

            <div
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:border-white/20 hover:bg-white/10 transition"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition">
                  <Wallet className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-bold">Earn Real Tokens</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Win TREND tokens for accurate predictions. Built on Polygon for instant settlement with zero gas fees.
                  Withdraw anytime.
                </p>
              </div>
            </div>

            <div
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl hover:border-white/20 hover:bg-white/10 transition"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 transition">
                  <BarChart3 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Track Performance</h3>
                <p className="text-foreground/70 leading-relaxed">
                  Real-time portfolio tracking, win/loss analytics, and detailed market insights. Monitor your
                  predictions across all platforms.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-primary/40 transition"
            >
              Try Prediction Markets Today
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Predictions" },
              { number: "$2.5M", label: "Total Volume" },
              { number: "8K+", label: "Predictors" },
              { number: "24/7", label: "Live Markets" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.number}</div>
                <p className="text-sm md:text-base text-foreground/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-2xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Predict?</h2>
            <p className="text-lg text-foreground/70">
              Join thousands of predictors earning tokens by forecasting the next viral moment. No experience needed.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-primary/40 transition"
          >
            Connect Wallet & Start Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5 bg-white/2">
        <div className="container mx-auto text-center text-foreground/50 text-sm">
          <p>© 2025 TrendZap. Predicting the future of social media. Built on Polygon.</p>
        </div>
      </footer>
    </div>
  )
}
