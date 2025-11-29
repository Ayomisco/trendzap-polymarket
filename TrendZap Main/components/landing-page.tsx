"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, TrendingUp, Zap, Target, Wallet, BarChart3 } from "lucide-react"

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [platformInterest, setPlatformInterest] = useState("")
  const [statusMsg, setStatusMsg] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const open = () => setShowWaitlist(true)
    window?.addEventListener?.("open-waitlist", open as EventListener)
    return () => window?.removeEventListener?.("open-waitlist", open as EventListener)
  }, [])

  async function submitWaitlist(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setStatusMsg(null)
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name || null, email, platform: platformInterest || null, createdAt: new Date().toISOString() }),
      })
      if (res.ok) {
        setStatusMsg("Thanks — you’re on the waitlist!")
        setName("")
        setEmail("")
        setPlatformInterest("")
        setTimeout(() => setShowWaitlist(false), 1200)
      } else {
        const body = await res.json().catch(() => ({}))
        setStatusMsg(body?.error || "Submission failed — try again.")
      }
    } catch (err) {
      setStatusMsg("Network error — please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-background/40 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              {/* <Zap className="w-5 h-5 text-white" /> 
            </div> */}
                        <img src="/trendzap_logo.png" alt="" width={120} height={120} />

            {/* <span className="text-xl font-bold gradient-text hidden sm:inline">TrendZap</span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10">
            {["Home", "roadmap"].map((item) => (
              <button
                key={item}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition rounded-full hover:bg-white/10"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Auth / Waitlist CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window?.dispatchEvent(new CustomEvent('open-waitlist'))}
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/50 transition text-sm"
            >
              Join Waitlist
            </button>
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
              <p className="text-xs md:text-sm font-medium text-foreground/80">Coming Soon</p>
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
              <button
                onClick={() => window?.dispatchEvent(new CustomEvent('open-waitlist'))}
                className="px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-primary/40 transition flex items-center justify-center gap-2 group"
              >
                Join Waitlist <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
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
          {/* <div className="mt-12 text-center">
            <button
              onClick={() => window?.dispatchEvent(new CustomEvent('open-waitlist'))}
              className="inline-block px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-primary/40 transition"
            >
              Join Waitlist
            </button>
          </div> */}
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 md:py-20 px-4 border-t border-white/5">
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
      </section> */}

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-2xl text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Predict?</h2>
            <p className="text-lg text-foreground/70">
              Join thousands of predictors earning tokens by forecasting the next viral moment. No experience needed.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
            {/* Discord */}
            <a
              href="https://discord.gg/your-invite"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#5865F2]">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.844-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.0371A19.7363 19.7363 0 003.683 4.3698.0699.0699 0 003.15 5.11c.0012.0018.012.0183.0317.0411a13.0914 13.0914 0 00-.1934 2.4687c0 4.1926 2.6688 8.0477 6.0428 9.1236a.0824.0824 0 00.0893-.0276c.465-.6393.8731-1.3162 1.21-2.0247a.076.076 0 00-.0416-.1057c-.652-.2476-1.27-.5495-1.84-.8923a.0743.0743 0 01-.0076-.1255c.1238-.0943.2473-.1923.3658-.2914a.0734.0734 0 01.0776-.0105c3.796 1.7343 8.28 1.7343 12.0614 0a.0734.0734 0 01.0786.0095c.1185.099.242.1971.366.2914a.0743.0743 0 01-.0066.1255c-.569.3428-1.187.6447-1.839.8923a.076.076 0 00-.0407.1067c.342.7085.7502 1.3854 1.2142 2.0247a.082.082 0 00.0893.0286c3.374-1.0759 6.0428-4.931 6.0428-9.1236 0-.829-.1475-1.6438-.4328-2.4128a.0614.0614 0 00-.03-.0392zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.419 2.157-2.419 1.2108 0 2.178.1 2.1569 2.419 0 1.3333-.9556 2.419-2.1569 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.419 2.1569-2.419 1.2108 0 2.178.1 2.1569 2.419 0 1.3333-.9461 2.419-2.1569 2.419z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M22.162 5.656c-.64.284-1.328.476-2.048.562.736-.44 1.3-1.136 1.568-1.968-.688.408-1.448.704-2.256.864C18.94 4.208 17.64 3.75 16.24 3.75c-1.888 0-3.416 1.616-3.416 3.608 0 .28.032.556.092.82-2.84-.136-5.36-1.536-7.048-3.656-.296.48-.468 1.036-.468 1.632 0 1.128.592 2.12 1.492 2.704-.56-.016-1.088-.176-1.552-.432v.048c0 1.552 1.08 2.856 2.512 3.152-.48.128-1.0.168-1.52.064.428 1.36 1.664 2.36 3.132 2.392-1.176.92-2.656 1.472-4.264 1.472-.276 0-.548-.016-.816-.048 1.516.976 3.32 1.544 5.256 1.544 6.312 0 9.776-5.544 9.776-10.336v-.472c.68-.496 1.2-1.12 1.64-1.824-.596.264-1.232.44-1.896.52z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="text-[#2AABEE]">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.47 7.2l-1.88 8.84c-.14.66-.5.82-.99.52l-2.74-2.02-1.32 1.27c-.15.15-.28.28-.57.28l.2-2.85 5.18-4.68c.23-.2-.05-.31-.36-.11l-6.4 4.03-2.76-.86c-.6-.2-.61-.6.12-.89L15.3 7.6c.52-.2.98.12.88.6z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/5 bg-white/2">
        <div className="container mx-auto text-center text-foreground/50 text-sm">
          <p>© 2025 TrendZap. Predicting the future of social media. Built on Polymarket.</p>
        </div>
      </footer>
      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowWaitlist(false)} />
          <div className="relative z-10 w-full max-w-md bg-background/95 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-2">Join the TrendZap Waitlist</h3>
            <p className="text-sm text-foreground/70 mb-4">Enter your details and we’ll notify you when we launch.</p>
            <form onSubmit={submitWaitlist} className="space-y-3">
              <div>
                <label className="text-sm text-foreground/70">Name (optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-white/3 border border-white/10 rounded-md outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-foreground/70">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-white/3 border border-white/10 rounded-md outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-foreground/70">Platform interest (optional)</label>
                <input
                  type="text"
                  value={platformInterest}
                  onChange={(e) => setPlatformInterest(e.target.value)}
                  placeholder="e.g. YouTube, TikTok"
                  className="mt-1 w-full px-3 py-2 bg-white/3 border border-white/10 rounded-md outline-none"
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-md"
                >
                  {submitting ? "Submitting..." : "Join Waitlist"}
                </button>
                <button type="button" onClick={() => setShowWaitlist(false)} className="text-sm text-foreground/60">
                  Cancel
                </button>
              </div>
              {statusMsg && <p className="text-sm text-foreground/70 mt-2">{statusMsg}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
