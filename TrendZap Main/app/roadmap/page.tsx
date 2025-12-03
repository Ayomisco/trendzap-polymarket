"use client"

import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import { 
  Rocket, 
  Sparkles, 
  Code, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Globe, 
  Target,
  Award,
  LineChart,
  Wallet,
  CheckCircle2,
  Clock,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"

interface Milestone {
  id: number
  phase: string
  date: string
  title: string
  description: string
  icon: any
  status: "completed" | "in-progress" | "upcoming"
  features: string[]
  color: string
  gradient: string
}

const milestones: Milestone[] = [
  {
    id: 1,
    phase: "Phase 1",
    date: "Nov 15 - Nov 30, 2025",
    title: "Foundation & Core Infrastructure",
    description: "Building the groundwork for TrendZap's prediction marketplace",
    icon: Code,
    status: "in-progress",
    features: [
      "Smart contract architecture on Polygon",
      "Landing page & waitlist system",
      "Social media integration framework",
      "User authentication system",
      "Basic UI/UX design implementation"
    ],
    color: "#A855F7",
    gradient: "from-purple-500 to-purple-700"
  },
  {
    id: 2,
    phase: "Phase 2",
    date: "Dec 1 - Dec 20, 2025",
    title: "Prediction Engine & Platform Launch",
    description: "Core prediction marketplace functionality goes live",
    icon: Rocket,
    status: "upcoming",
    features: [
      "Real-time social media metrics extraction",
      "Prediction market creation & resolution",
      "Token economy & reward system",
      "User dashboard & portfolio tracking",
      "Beta launch with early adopters"
    ],
    color: "#3B82F6",
    gradient: "from-blue-500 to-blue-700"
  },
  {
    id: 3,
    phase: "Phase 3",
    date: "Dec 21 - Jan 10, 2026",
    title: "Community & Gamification",
    description: "Engaging features to build a thriving prediction community",
    icon: Users,
    status: "upcoming",
    features: [
      "Global leaderboards & rankings",
      "Achievement & badge system",
      "Social sharing & referrals",
      "Community challenges & tournaments",
      "Mobile-responsive improvements"
    ],
    color: "#10B981",
    gradient: "from-green-500 to-green-700"
  },
  {
    id: 4,
    phase: "Phase 4",
    date: "Jan 11 - Feb 15, 2026",
    title: "Scale & Advanced Features",
    description: "Expanding capabilities and preparing for mass adoption",
    icon: TrendingUp,
    status: "upcoming",
    features: [
      "AI-powered prediction insights",
      "Advanced analytics & market trends",
      "Multi-chain support expansion",
      "Influencer partnerships program",
      "Public launch & marketing campaign"
    ],
    color: "#F59E0B",
    gradient: "from-amber-500 to-amber-700"
  }
]

const associations = [
  { name: "Polygon", logo: "🔷", description: "Layer 2 Scaling Solution" },
  { name: "Chainlink", logo: "🔗", description: "Decentralized Oracle Network" },
  { name: "The Graph", logo: "📊", description: "Indexing Protocol" },
  { name: "IPFS", logo: "🌐", description: "Decentralized Storage" },
  { name: "WalletConnect", logo: "🔐", description: "Web3 Wallet Protocol" },
  { name: "Vercel", logo: "▲", description: "Deployment Platform" }
]

export default function RoadmapPage() {
  const { scrollYProgress } = useScroll()
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null)
  
  const heroRef = useRef(null)
  const timelineRef = useRef(null)
  const associationsRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const timelineInView = useInView(timelineRef, { once: false, amount: 0.1 })
  const associationsInView = useInView(associationsRef, { once: false, amount: 0.3 })
  
  return (
    <div className="min-h-screen bg-background overflow-hidden">
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
          <Link href="/">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/trendzap_logo.png" alt="TrendZap" width={120} height={120} />
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-md rounded-full px-2 py-1.5 border border-white/10">
            {[
              { name: "Home", href: "/" },
              { name: "Roadmap", href: "/roadmap" }
            ].map((item, idx) => (
              <Link key={item.name} href={item.href}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`px-4 py-2 text-sm font-medium transition rounded-full ${
                    item.name === "Roadmap" 
                      ? "text-foreground bg-white/10" 
                      : "text-foreground/80 hover:text-foreground hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </motion.button>
              </Link>
            ))}
          </div>

          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border border-white/10 text-foreground rounded-full font-semibold hover:bg-white/5 transition text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pt-32 md:pt-40 pb-20 px-4 overflow-hidden"
      >
        {/* Animated Background */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 opacity-30 pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-3xl rounded-full"></div>
        </motion.div>

        <div className="relative container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>
            <span className="text-sm font-medium text-foreground/80">Product Roadmap 2025-2026</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="block text-white">Building the Future of</span>
            <span className="block gradient-text text-5xl md:text-7xl lg:text-8xl">Social Predictions</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          >
            Our journey from concept to the world's premier prediction marketplace for social media content
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-2xl mx-auto"
          >
            {[
              { label: "Development Phases", value: "4", icon: Rocket },
              { label: "Weeks Timeline", value: "13", icon: Clock },
              { label: "Key Features", value: "20+", icon: Target }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.8 + idx * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <p className="text-xs md:text-sm text-foreground/60 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-20 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold text-primary/80 uppercase tracking-wider mb-4"
            >
              Development Timeline
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={timelineInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-4xl md:text-5xl font-bold"
            >
              Our <span className="gradient-text">Journey to Launch</span>
            </motion.h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent origin-top hidden md:block"
            />

            <div className="space-y-12 md:space-y-24">
              {milestones.map((milestone, idx) => {
                const isLeft = idx % 2 === 0
                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                    animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -100 : 100 }}
                    transition={{ delay: 0.2 * idx, duration: 0.8 }}
                    onMouseEnter={() => setHoveredMilestone(milestone.id)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                    className={`relative md:grid md:grid-cols-2 gap-8 items-center ${isLeft ? '' : 'md:grid-flow-dense'}`}
                  >
                    {/* Content Card */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className={`${isLeft ? 'md:col-start-1' : 'md:col-start-2'} relative group`}
                    >
                      <motion.div
                        animate={{ 
                          opacity: hoveredMilestone === milestone.id ? 0.2 : 0,
                          scale: hoveredMilestone === milestone.id ? 1.1 : 1,
                        }}
                        className={`absolute inset-0 bg-gradient-to-br ${milestone.gradient} blur-2xl rounded-3xl`}
                      />
                      
                      <div className={`relative p-6 md:p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:border-white/20 transition overflow-hidden`}>
                        {/* Status Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
                              milestone.status === 'completed' 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : milestone.status === 'in-progress'
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}
                          >
                            {milestone.status === 'completed' ? (
                              <CheckCircle2 className="w-3 h-3" />
                            ) : milestone.status === 'in-progress' ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              >
                                <Zap className="w-3 h-3" />
                              </motion.div>
                            ) : (
                              <Clock className="w-3 h-3" />
                            )}
                            {milestone.status === 'completed' ? 'Completed' : 
                             milestone.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                          </motion.div>
                          <span className="text-xs text-foreground/50">{milestone.date}</span>
                        </div>

                        {/* Icon & Phase */}
                        <div className="flex items-start gap-4 mb-4">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.2 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 rounded-2xl bg-white/10 border border-white/20"
                            style={{ color: milestone.color }}
                          >
                            <milestone.icon className="w-6 h-6" />
                          </motion.div>
                          <div>
                            <p className="text-sm font-semibold text-foreground/60">{milestone.phase}</p>
                            <h3 className="text-xl md:text-2xl font-bold mt-1">{milestone.title}</h3>
                          </div>
                        </div>

                        <p className="text-foreground/70 mb-6">{milestone.description}</p>

                        {/* Features List */}
                        <div className="space-y-2">
                          {milestone.features.map((feature, featureIdx) => (
                            <motion.div
                              key={featureIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={timelineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ delay: 0.2 * idx + 0.1 * featureIdx }}
                              className="flex items-start gap-2 text-sm text-foreground/70"
                            >
                              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    {/* Center Node */}
                    <div className={`hidden md:block ${isLeft ? 'md:col-start-2' : 'md:col-start-1'}`}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={timelineInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: 0.2 * idx + 0.4, type: "spring", stiffness: 200 }}
                        className="flex justify-center"
                      >
                        <motion.div
                          whileHover={{ scale: 1.3, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-xl opacity-50 rounded-full"></div>
                          <div className="relative w-12 h-12 rounded-full bg-background border-4 border-white/20 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                          </div>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Associations Section */}
      <motion.section 
        ref={associationsRef}
        className="py-20 px-4 border-t border-white/5"
      >
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={associationsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={associationsInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold text-primary/80 uppercase tracking-wider mb-4"
            >
              Technology Partners
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={associationsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-4xl md:text-5xl font-bold"
            >
              Built with <span className="gradient-text">Best-in-Class</span> Tools
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {associations.map((partner, idx) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={associationsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.1 * idx, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:border-white/20 transition text-center group cursor-pointer"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  className="text-4xl mb-3"
                >
                  {partner.logo}
                </motion.div>
                <h4 className="text-sm font-semibold mb-1">{partner.name}</h4>
                <p className="text-xs text-foreground/50">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-white/5">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-4xl md:text-5xl font-bold"
            >
              Join Us on This Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-foreground/70"
            >
              Be part of the future of social media predictions. Get early access and exclusive benefits.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-primary/40 transition inline-flex items-center gap-2"
                >
                  Join Waitlist
                  <Sparkles className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
    </div>
  )
}
