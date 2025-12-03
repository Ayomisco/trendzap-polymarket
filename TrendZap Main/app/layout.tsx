import type React from "react"
import type { Metadata, Viewport } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://trendzap.vercel.app"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' }
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TrendZap - Predict the Pulse of Social Media",
    template: "%s | TrendZap"
  },
  description:
    "Turn social media into prediction rewards. Copy a link, predict engagement metrics, and win tokens for accurate forecasts. Gamified prediction markets for influencer content on TikTok, Instagram, YouTube, and X.",
  keywords: [
    "prediction market",
    "social media predictions",
    "TikTok predictions",
    "Instagram analytics",
    "YouTube views prediction",
    "crypto predictions",
    "blockchain prediction market",
    "Polygon",
    "Web3",
    "influencer analytics",
    "viral content prediction",
    "engagement prediction",
    "social trading",
    "prediction tokens"
  ],
  authors: [{ name: "TrendZap Team" }],
  creator: "TrendZap",
  publisher: "TrendZap",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TrendZap",
    title: "TrendZap - Predict the Pulse of Social Media",
    description:
      "Turn social media into prediction rewards. Copy a link, predict engagement, and win tokens for accurate forecasts on TikTok, Instagram, YouTube, and X.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TrendZap - Social Media Prediction Market",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrendZap - Predict the Pulse of Social Media",
    description:
      "Turn social media into prediction rewards. Win tokens for accurate forecasts on influencer content.",
    images: [`${siteUrl}/og-image.png`],
    creator: "@trendzap",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
