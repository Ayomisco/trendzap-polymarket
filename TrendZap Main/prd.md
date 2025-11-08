# TrendZap — Product Requirements Document (PRD)

Last updated: 2025-11-07

Overview
--------

TrendZap is a gamified prediction market web app that lets users predict social media outcomes (influencer virality, engagement metrics, trending topics) and earn platform tokens (TZP) for accurate predictions. The repository is a Next.js (app-router) React project with Tailwind CSS and a custom UI primitives library based on Radix. The experience targets both discovery (landing) and a dashboard for active market participation (markets, portfolio, leaderboard).

Goals
-----

- Build an engaging, low-friction prediction market experience for social trends.
- Provide clear, real-time market data and easy ways to make predictions and track portfolio performance.
- Encourage retention through tokens, leaderboards, and social features.
- Keep the architecture modular so frontend primitives (`components/ui`) are reusable and testable.

Success metrics
---------------

- Top-level: Daily Active Users (DAU), predictions/day, retention (D1/D7/D30).
- Prediction conversion: % of users who place at least one prediction within first session.
- Accuracy & settlements: average prediction accuracy; % of predictions settled on time.
- Economic: token circulation, average TZP earned per user.

User personas
-------------

- Casual user: visits to predict a hot topic quickly; expects simple UX and clear outcomes.
- Power predictor: frequently participates across markets, tracks portfolio and leaderboard.
- Curator/moderator: manages market definitions, resolves disputes.

Assumptions
-----------

- The frontend integrates with backend APIs to fetch market definitions, submit predictions, fetch portfolio and leaderboard data. (I did not find API route files in the repo scan; assume external service or next/api routes to be created.)
- Users sign in with or connect a wallet (UI references `walletAddress`), so wallet-based identity is part of the flow.

Key features (MVP)
------------------

1. Landing page
   - Marketing copy, CTA to join/connect wallet, high-level stats.
   - Component: `components/landing-page.tsx` (entry at `app/page.tsx`).

2. Markets listing & market detail
   - Browse trending markets with basic stats (probability, liquidity, volume).
   - View market detail with timeline, prediction options, historical outcomes.
   - Components: `components/markets-page.tsx`, `components/trending-markets.tsx`.

3. Make a prediction (Place bet)
   - Quick-add modal to place a prediction (stake TZP, choose option, expiration/duration).
   - Component: `components/quick-add-prediction.tsx`.

4. Portfolio
   - Track active/settled predictions, token balance (TZP), realized/unrealized P&L.
   - Component: `components/portfolio-page.tsx`, `components/your-portfolio.tsx`.

5. Leaderboard
   - Rank users by TZP, prediction accuracy, or cumulative wins.
   - Component: `components/leaderboard-page.tsx`, `components/leaderboard.tsx`.

6. Dashboard & navigation
   - Central layout with `TopNavbar`, `DashboardLayout` and global state for current page.
   - Components: `components/top-navbar.tsx`, `components/dashboard-layout.tsx`, `components/navigation.tsx`.

7. Notifications & Toasts
   - Lightweight toast system for success/errors (existing `hooks/use-toast.ts`).

8. Theme, accessibility
   - Theme provider and components in `components/theme-provider.tsx`. Ensure keyboard accessibility for market actions.

Data model & API contract (suggested)
-------------------------------------

Primary entities

- User
  - id (string)
  - walletAddress (string)
  - displayName, avatarUrl
  - tzpBalance (number)

- Market
  - id, title, description
  - type (binary/categorical), options: [{ id, label }]
  - startAt, resolveAt
  - status: open/closed/resolved
  - volume, impliedProbability, odds

- Prediction (Position)
  - id, userId, marketId, optionId
  - stake (number TZP), priceAtPlacement
  - createdAt, settledAt, result (win/lose/pending)

API endpoints (REST / GraphQL examples)

- GET /api/markets — list markets with pagination and filters
- GET /api/markets/:id — market detail, outcomes, history
- POST /api/predictions — place a prediction (body: marketId, optionId, stake)
- GET /api/users/:wallet/portfolio — user's active/settled positions and balances
- GET /api/leaderboard — sorted leaderboard data
- POST /api/markets/:id/resolve — (admin) resolve a market or support automated resolvers

Security & auth
----------------

- Use wallet signature challenge for authentication (sign a nonce). Avoid storing private keys.
- Rate limit prediction submissions to prevent spam and gaming.
- Validate all operations server-side (sufficient balance, market open, stake limits).

Front-end architecture & mapping to repo
---------------------------------------

- App root: `app/layout.tsx` — fonts, analytics, global CSS (`globals.css`).
- Landing page: `app/page.tsx` -> `components/landing-page.tsx`.
- Dashboard: client layout `components/dashboard-layout.tsx` + `components/top-navbar.tsx`.
- Core UI primitives: `components/ui/*` — Button, Input, Toast, Card, Table, etc.
- Utilities: `lib/utils.ts` exposes `cn()` helper for class merging.
- Hooks: `hooks/use-mobile.ts` (viewport), `hooks/use-toast.ts` (singleton toast manager).

UX flows
---------

1. Onboard (first-time)
   - Visit landing page -> click Connect -> wallet popup -> sign challenge -> view dashboard/markets.

2. Find & place a prediction
   - Browse markets -> open market -> click Predict -> quick-add modal -> enter stake -> confirm -> toast success.

3. Track portfolio
   - View active predictions and token balance -> view historical performance -> withdraw or claim earned TZP.

4. Leaderboard & social
   - View leaderboard -> click profile -> see recent winning predictions; share outcome links.

Non-functional requirements
---------------------------

- Performance: 95th percentile page load < 2s for core pages on mobile/desktop (CDN and optimized assets).
- Scalability: backend supports thousands of concurrent users; use caching for market lists.
- Availability: critical endpoints (GET /api/markets, GET /api/leaderboard) 99.9% SLA.
- Observability: logs, metrics (predictions/day, settlements), error reporting (Sentry or similar).

Testing & QA
------------

- Unit tests for key components and hooks (`use-toast`, `use-mobile`, `cn`).
- Integration tests for prediction flow (place -> settle -> portfolio update). Use Cypress or Playwright for e2e.
- Contract tests for API endpoints (happy path + common errors: insufficient balance, market closed).

Milestones & roadmap
---------------------

Phase 0 — Foundation (0–2 weeks)
- Implement market list, market detail, and quick prediction placement UX.
- Wire basic APIs (stubs if backend missing) and wallet auth flow.

Phase 1 — Core marketplace (2–6 weeks)
- Portfolio and leaderboard. Token accounting, settlements engine (or integration with backend).
- Add analytics and UX polish; accessibility audits.

Phase 2 — Growth & social features (6–12 weeks)
- Social sharing, challenges, referral incentives, tournaments.
- Moderation tools and market creation flows.

Operational considerations
-------------------------

- Settlement: markets must be resolvable via trusted data sources or manual admin tools; implement dispute mechanisms.
- Token economics: minting, distribution, burn/fees. Add on-chain or off-chain ledger depending on product strategy.

Risks & mitigations
--------------------

- Risk: Users game markets or use bots.
  - Mitigation: rate limit, KYC for high-volume accounts, anomaly detection.

- Risk: Ambiguous market resolution.
  - Mitigation: strict market wording, trusted data sources, manual arbitration UI.

- Risk: Wallet UX friction.
  - Mitigation: support multiple wallet connectors; provide clear onboarding and testnets for first-time users.

Developer notes & file map (what I inspected)
---------------------------------------------

- `package.json` — Next 16, React 19, Tailwind, Radix packages.
- `next.config.mjs` — typescript.ignoreBuildErrors = true, images.unoptimized = true.
- `app/layout.tsx`, `app/page.tsx` — root layout, landing page mounting point.
- `components/` — main UI pieces: `landing-page.tsx`, `dashboard-home.tsx`, `dashboard-layout.tsx`, `top-navbar.tsx`, `navigation.tsx`, `quick-add-prediction.tsx`, `markets-page.tsx`, `portfolio-page.tsx`, `leaderboard-page.tsx`, `theme-provider.tsx`, `trending-markets.tsx`, `your-portfolio.tsx`.
- `components/ui/*` — UI primitives (Button, Input, Toast, Card, etc.) — key to consistent design.
- `hooks/use-mobile.ts` — mobile breakpoint hook.
- `hooks/use-toast.ts` — toast manager (singleton pattern).
- `lib/utils.ts` — `cn()` helper.

Open questions / decisions needed
--------------------------------

1. Backend: Do you have an existing API/service for markets and settlements, or should we design the backend here? 
2. Auth model: wallet-only auth or email/password fallback? Are we integrating an on-chain token (blockchain) or an off-chain TZP ledger?
3. Settlement oracle: automated resolvers (3rd-party feed) vs. manual admin reconciliation?

Next steps
-----------

1. Confirm backend & auth approach (wallet-only vs hybrid).
2. Wire basic API endpoints or stubs so frontend pages can be end-to-end tested.
3. Implement the prediction placement flow and add e2e tests (happy path + insufficient balance).

Appendix A — Acceptance criteria (MVP)
------------------------------------

- Users can connect a wallet and view their TZP balance.
- Users can browse markets and place a prediction (stake TZP) and see the new position in their portfolio.
- Markets can be resolved and settled; portfolio reflects results and leaderboard updates.

Appendix B — Quick developer run notes
-------------------------------------

Typical local dev (assumes dependencies installed):

```bash
# install packages (pnpm recommended if using workspace lockfile)
pnpm install

# dev server
pnpm dev
```

If you want, I can next: produce a separate technical design doc describing the backend API contracts in detail, or start implementing missing API stubs and wire the prediction flow. Tell me which you'd prefer.

— End of PRD
