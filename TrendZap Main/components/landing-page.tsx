"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, TrendingUp, Zap, Target, Wallet, BarChart3, Sparkles, Users, Trophy } from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { generateOrganizationSchema, generateWebApplicationSchema, generateWebPageSchema } from "@/lib/structured-data"

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 })
  
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const heroOpacity = useTransform(scrollProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollProgress, [0, 0.2], [1, 0.95])
  const heroY = useTransform(scrollProgress, [0, 0.2], [0, -50])
  
  // Structured data for SEO
  const structuredData = {
    organization: generateOrganizationSchema(),
    webApp: generateWebApplicationSchema(),
    webpage: generateWebPageSchema({
      title: 'TrendZap - Predict the Pulse of Social Media',
      description: 'Turn social media into prediction rewards',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://trendzap.vercel.app',
    }),
  }
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
      const data = await res.json()
      
      if (res.ok && data.success) {
        setStatusMsg(data.message || "Thanks — you're on the waitlist!")
        setName("")
        setEmail("")
        setPlatformInterest("")
        setTimeout(() => {
          setShowWaitlist(false)
          setStatusMsg(null)
        }, 2000)
      } else {
        setStatusMsg(data.error || "Submission failed — try again.")
      }
    } catch (err) {
      setStatusMsg("Network error — please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.webApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData.webpage) }}
      />
      
      {/* Animated Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[60] origin-left"
        style={{ scaleX: scrollProgress }}
      />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 z-50 w-full bg-background/40 backdrop-blur-xl border-b border-white/5"
      >
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src="/trendzap_logo.png" alt="TrendZap" width={120} height={120} />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10">
            {["Home", "Roadmap"].map((item, idx) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => {
                  if (item === "Roadmap") {
                    window.location.href = "/roadmap"
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition rounded-full hover:bg-white/10"
              >
                {item}
              </motion.button>
            ))}
          </div>

          {/* Auth / Waitlist CTA */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(168, 85, 247, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window?.dispatchEvent(new CustomEvent('open-waitlist'))}
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/50 transition text-sm"
            >
              Join Waitlist
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section with Glassmorphic Glow */}
      <motion.section 
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative pt-32 md:pt-40 pb-20 px-4 overflow-hidden"
      >
        {/* Animated Background Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 opacity-40 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-transparent to-cyan-600 blur-3xl rounded-full"></div>
        </motion.div>

        <div className="relative container mx-auto max-w-4xl">
          <motion.div 
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Top Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={heroInView ? { scale: 1 } : { scale: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition backdrop-blur-sm"
            >
              <motion.div 
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-accent"
              />
              <p className="text-xs md:text-sm font-medium text-foreground/80">Coming Soon</p>
            </motion.div>

            {/* Hero Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <motion.span 
                  initial={{ opacity: 0, x: -50 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="block text-white"
                >
                  Turn Social Media into
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                  className="block gradient-text text-5xl md:text-7xl lg:text-8xl"
                >
                  Prediction Rewards
                </motion.span>
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed"
              >
                Copy a social link, predict engagement metrics, and win tokens for accurate forecasts. Gamified
                prediction markets for influencer content.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window?.dispatchEvent(new CustomEvent('open-waitlist'))}
                className="px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-primary/40 transition flex items-center justify-center gap-2 group"
              >
                Join Waitlist 
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 border border-white/10 text-foreground rounded-full font-semibold hover:bg-white/5 transition"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          <div className="mt-24 relative">
            {/* Center Glow */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-2xl"
            />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-tr from-primary to-secondary rounded-full blur-lg opacity-50"
            />
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer"
            >
              <TrendingUp className="w-8 h-8 text-primary" />
            </motion.div>

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
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ delay: 1 + idx * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group relative p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition overflow-hidden cursor-pointer"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"
                  />
                  <div className="relative space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-medium text-foreground/60">{item.platform}</p>
                        <p className="text-sm text-foreground/80 mt-1">{item.metric}</p>
                      </div>
                      <motion.div 
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                        className="text-2xl"
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    <div className="flex items-end justify-between pt-2 border-t border-white/5">
                      <p className="text-lg font-bold text-white">{item.value}</p>
                      <div className="px-2 py-1 bg-accent/20 border border-accent/50 rounded-full">
                        <p className="text-xs font-semibold text-accent">{item.percentage}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        ref={featuresRef}
        className="py-20 md:py-28 px-4 border-t border-white/5"
      >
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 mb-16"
          >
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold text-primary/80 uppercase tracking-wider"
            >
              How It Works
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={featuresInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-4xl md:text-5xl font-bold"
            >
              Unlock Prediction
              <br />
              <span className="gradient-text">Market Rewards</span>
            </motion.h2>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Zap,
                title: "Copy & Predict Instantly",
                description: "Paste any TikTok, Instagram, YouTube, or X link directly into TrendZap. Our AI extracts real-time metrics and creates markets instantly.",
                gradient: "from-primary/30 to-secondary/20",
                borderColor: "border-primary/30",
                iconColor: "text-primary",
                delay: 0,
              },
              {
                icon: Target,
                title: "Stake & Compete",
                description: "Place bets on viewership, engagement, viral potential, and more. Compete on global leaderboards and win monthly token rewards.",
                gradient: "from-white/5 to-white/5",
                borderColor: "border-white/10",
                iconColor: "text-secondary",
                delay: 0.1,
              },
              {
                icon: Wallet,
                title: "Earn Real Tokens",
                description: "Win TREND tokens for accurate predictions. Built on Polygon for instant settlement with zero gas fees. Withdraw anytime.",
                gradient: "from-white/5 to-white/5",
                borderColor: "border-white/10",
                iconColor: "text-accent",
                delay: 0.2,
              },
              {
                icon: BarChart3,
                title: "Track Performance",
                description: "Real-time portfolio tracking, win/loss analytics, and detailed market insights. Monitor your predictions across all platforms.",
                gradient: "from-white/5 to-white/5",
                borderColor: "border-white/10",
                iconColor: "text-primary",
                delay: 0.3,
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                animate={featuresInView ? { opacity: 1, x: 0 } : { opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                transition={{ delay: feature.delay + 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative group col-span-1 p-8 bg-gradient-to-br ${feature.gradient} backdrop-blur-lg border ${feature.borderColor} rounded-3xl overflow-hidden transition hover:border-white/20 cursor-pointer`}
              >
                <motion.div 
                  animate={{ 
                    opacity: hoveredCard === idx ? 0.4 : 0.1,
                    scale: hoveredCard === idx ? 1.1 : 1,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"
                />
                <div className="relative space-y-4">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center"
                  >
                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </motion.div>
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        ref={ctaRef}
        className="py-20 md:py-28 px-4 border-t border-white/5"
      >
        <div className="container mx-auto max-w-2xl text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-4xl md:text-5xl font-bold"
            >
              Ready to Predict?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={ctaInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-foreground/70"
            >
              Join thousands of predictors earning tokens by forecasting the next viral moment. No experience needed.
            </motion.p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-6"
          >
            {/* Discord */}
            {[
              {
                name: "Discord",
                href: "https://discord.gg/your-invite",
                color: "#5865F2",
                path: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.844-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.0371A19.7363 19.7363 0 003.683 4.3698.0699.0699 0 003.15 5.11c.0012.0018.012.0183.0317.0411a13.0914 13.0914 0 00-.1934 2.4687c0 4.1926 2.6688 8.0477 6.0428 9.1236a.0824.0824 0 00.0893-.0276c.465-.6393.8731-1.3162 1.21-2.0247a.076.076 0 00-.0416-.1057c-.652-.2476-1.27-.5495-1.84-.8923a.0743.0743 0 01-.0076-.1255c.1238-.0943.2473-.1923.3658-.2914a.0734.0734 0 01.0776-.0105c3.796 1.7343 8.28 1.7343 12.0614 0a.0734.0734 0 01.0786.0095c.1185.099.242.1971.366.2914a.0743.0743 0 01-.0066.1255c-.569.3428-1.187.6447-1.839.8923a.076.076 0 00-.0407.1067c.342.7085.7502 1.3854 1.2142 2.0247a.082.082 0 00.0893.0286c3.374-1.0759 6.0428-4.931 6.0428-9.1236 0-.829-.1475-1.6438-.4328-2.4128a.0614.0614 0 00-.03-.0392zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.419 2.157-2.419 1.2108 0 2.178.1 2.1569 2.419 0 1.3333-.9556 2.419-2.1569 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.419 2.1569-2.419 1.2108 0 2.178.1 2.1569 2.419 0 1.3333-.9461 2.419-2.1569 2.419z",
              },
              {
                name: "X",
                href: "https://x.com/yourhandle",
                color: "#FFFFFF",
                path: "M22.162 5.656c-.64.284-1.328.476-2.048.562.736-.44 1.3-1.136 1.568-1.968-.688.408-1.448.704-2.256.864C18.94 4.208 17.64 3.75 16.24 3.75c-1.888 0-3.416 1.616-3.416 3.608 0 .28.032.556.092.82-2.84-.136-5.36-1.536-7.048-3.656-.296.48-.468 1.036-.468 1.632 0 1.128.592 2.12 1.492 2.704-.56-.016-1.088-.176-1.552-.432v.048c0 1.552 1.08 2.856 2.512 3.152-.48.128-1.0.168-1.52.064.428 1.36 1.664 2.36 3.132 2.392-1.176.92-2.656 1.472-4.264 1.472-.276 0-.548-.016-.816-.048 1.516.976 3.32 1.544 5.256 1.544 6.312 0 9.776-5.544 9.776-10.336v-.472c.68-.496 1.2-1.12 1.64-1.824-.596.264-1.232.44-1.896.52z",
              },
              {
                name: "Telegram",
                href: "https://t.me/yourchannel",
                color: "#2AABEE",
                path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.47 7.2l-1.88 8.84c-.14.66-.5.82-.99.52l-2.74-2.02-1.32 1.27c-.15.15-.28.28-.57.28l.2-2.85 5.18-4.68c.23-.2-.05-.31-.36-.11l-6.4 4.03-2.76-.86c-.6-.2-.61-.6.12-.89L15.3 7.6c.52-.2.98.12.88.6z",
              },
            ].map((social, idx) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.8 + idx * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ color: social.color }}>
                  <path d={social.path} />
                </svg>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-8 px-4 border-t border-white/5 bg-white/2"
      >
        <div className="container mx-auto text-center text-foreground/50 text-sm">
          <p>© 2025 TrendZap. Predicting the future of social media. Built on Polymarket.</p>
        </div>
      </motion.footer>
      {/* Waitlist Modal */}
      {showWaitlist && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowWaitlist(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 w-full max-w-md bg-background/95 border border-white/10 rounded-2xl p-6"
          >
            <motion.h3 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold mb-2"
            >
              Join the TrendZap Waitlist
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-foreground/70 mb-4"
            >
              Enter your details and we'll notify you when we launch.
            </motion.p>
            <form onSubmit={submitWaitlist} className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-sm text-foreground/70">Name (optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-white/3 border border-white/10 rounded-md outline-none focus:border-primary/50 transition"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="text-sm text-foreground/70">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full px-3 py-2 bg-white/3 border border-white/10 rounded-md outline-none focus:border-primary/50 transition"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <label className="text-sm text-foreground/70">Platform interest (optional)</label>
                <input
                  type="text"
                  value={platformInterest}
                  onChange={(e) => setPlatformInterest(e.target.value)}
                  placeholder="e.g. YouTube, TikTok"
                  className="mt-1 w-full px-3 py-2 bg-white/3 border border-white/10 rounded-md outline-none focus:border-primary/50 transition"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-between pt-2"
              >
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-md disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Join Waitlist"}
                </motion.button>
                <motion.button 
                  type="button" 
                  onClick={() => setShowWaitlist(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm text-foreground/60 hover:text-foreground transition"
                >
                  Cancel
                </motion.button>
              </motion.div>
              {statusMsg && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-foreground/70 mt-2"
                >
                  {statusMsg}
                </motion.p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
