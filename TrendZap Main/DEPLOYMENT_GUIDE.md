# Quick Deployment Guide 🚀

## Deploy to Vercel (Recommended)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Optimized TrendZap with SEO, performance, and waitlist"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_SITE_URL`: Your production URL (e.g., https://trendzap.com)
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
5. Click "Deploy"

### Step 3: Configure Database (Neon)
1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to Vercel environment variables as `DATABASE_URL`
5. The waitlist table will be created automatically on first API call

### Step 4: Custom Domain (Optional)
1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_SITE_URL` environment variable

## Test Your Deployment

### 1. Check Waitlist Functionality
- Visit your site
- Click "Join Waitlist"
- Submit the form
- Verify success message

### 2. Verify SEO
```bash
# Check sitemap
curl https://your-domain.com/sitemap.xml

# Check robots.txt
curl https://your-domain.com/robots.txt

# Check manifest
curl https://your-domain.com/manifest.webmanifest
```

### 3. Test Social Sharing
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### 4. Run Lighthouse Audit
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Run audit for:
   - Performance
   - SEO
   - Best Practices
   - Accessibility

## Post-Deployment

### Submit to Search Engines
1. **Google Search Console**
   - Add property: https://search.google.com/search-console
   - Verify ownership
   - Submit sitemap: `https://your-domain.com/sitemap.xml`

2. **Bing Webmaster Tools**
   - Add site: https://www.bing.com/webmasters
   - Verify ownership
   - Submit sitemap

### Monitor Performance
- Vercel Analytics: Check in Vercel dashboard
- Speed Insights: Real-time metrics in Vercel
- Google Search Console: Search performance

### Social Media Setup
1. Create accounts for TrendZap:
   - Twitter/X: @trendzap
   - Discord: Create server
   - Telegram: Create channel
2. Update social links in components/landing-page.tsx
3. Add links to footer

## Local Development

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
pnpm dev

# Open browser
open http://localhost:3000
```

## Production Build Test

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Open browser
open http://localhost:3000
```

## Troubleshooting

### Waitlist not working
- Check DATABASE_URL is set in Vercel
- Verify Neon database is accessible
- Check API logs in Vercel dashboard

### SEO tags not showing
- Verify NEXT_PUBLIC_SITE_URL is set
- Check page source (View Page Source)
- Clear browser cache

### Images not loading
- Check image paths in public folder
- Verify image optimization settings
- Check browser console for errors

### Animations laggy
- Reduce animation complexity
- Check device performance
- Disable animations on slow devices

## Support

For issues or questions:
- Check build logs in Vercel
- Review SEO_OPTIMIZATION_REPORT.md
- Check Next.js documentation: https://nextjs.org/docs

---

**Your site is ready to go live! 🎉**
