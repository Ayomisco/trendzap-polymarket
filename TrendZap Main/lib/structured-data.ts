export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TrendZap',
    description: 'Social media prediction marketplace built on blockchain',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://trendzap.vercel.app',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://trendzap.vercel.app'}/trendzap_logo.png`,
    sameAs: [
      'https://twitter.com/trendzap',
      'https://discord.gg/trendzap',
      'https://t.me/trendzap',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@trendzap.io',
    },
  }
}

export function generateWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'TrendZap',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Turn social media into prediction rewards. Predict engagement metrics on TikTok, Instagram, YouTube, and X to win tokens.',
    featureList: [
      'Social media prediction markets',
      'Real-time engagement tracking',
      'Blockchain-based rewards',
      'Multi-platform support (TikTok, Instagram, YouTube, X)',
      'Leaderboards and gamification',
    ],
  }
}

export function generateWebPageSchema(page: { title: string; description: string; url: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'TrendZap',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://trendzap.vercel.app',
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
