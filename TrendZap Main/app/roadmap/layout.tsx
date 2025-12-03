import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Roadmap",
  description: "TrendZap's development roadmap from November 2025 to February 2026. Follow our journey from foundation to launch as we build the world's premier prediction marketplace for social media content.",
  alternates: {
    canonical: "/roadmap",
  },
  openGraph: {
    title: "TrendZap Product Roadmap 2025-2026",
    description: "Follow our journey from foundation to launch. 4 phases, 13 weeks, building the future of social media predictions.",
  },
}

export default function RoadmapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
