import { Metadata } from "next"
import LandingPage from "@/components/landing-page"

export const metadata: Metadata = {
  title: "TrendZap - Predict the Pulse of Social Media",
  description: "Turn social media into prediction rewards. Copy a link, predict engagement metrics, and win tokens for accurate forecasts. Gamified prediction markets for influencer content on TikTok, Instagram, YouTube, and X.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return <LandingPage />
}
