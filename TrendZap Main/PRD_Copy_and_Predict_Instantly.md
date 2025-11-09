# TrendZap — Product Requirements Document (PRD)

Last updated: 2025-11-08

Summary
-------
TrendZap is a social media-driven prediction market that lets users "Copy & Predict Instantly": paste a TikTok, Instagram, YouTube, or X link and create prediction markets from real-time engagement metrics. Users stake TREND tokens, compete on leaderboards, and earn rewards for accurate forecasts. Markets are settled using on-chain proofs and batched settlement on Polygon for low-fee, fast finalization.

This PRD defines the product vision, user personas, MVP feature set, system architecture, data and integrations, token and smart contract design, security and compliance considerations, success metrics, and roadmap.

Assumptions
-----------
- "Polymarket" in the repository name refers to prediction-market-style functionality; primary blockchain layer for settlement is Polygon (PoS or zkEVM as a later option).
- Initial MVP will focus on YouTube first (highest-quality public API access), with X and others added as integrations as API access allows.
- The product offers an "instant" UI experience by creating markets off-chain and performing batched on-chain settlement to minimize user friction and gas fees.

Goals & Success Criteria
-----------------------
- Launch an MVP that demonstrates the core Copy & Predict flow for at least one platform (YouTube).
- Enable market creation from a pasted link within 3–5 seconds of user action (UI perceived instant).
- Achieve end-to-end settlement accuracy with a verifiable on-chain record for payouts.
- Support 1000 concurrent active users on MVP infra and process 1k market creations/day in the first month.
- Reach initial traction: 10k registered users and a monthly active user (MAU) retention rate >= 20% by month 3 after launch.

Primary User Personas
---------------------
- The Casual Predictor: crypto-native or social-media user who wants to bet small amounts on viral content. Values instant UX and low gas fees.
- The Power Forecaster: data-driven trader who uses analytics to create/resolve markets at scale. Values transparency and accurate settlement.
- The Creator / Analyst: content creator or community leader who wants to create markets around their content and engage fans.

Core Product Features (MVP)
---------------------------
1. Copy & Predict Instantly (MVP, YouTube-first)
	- Paste a YouTube link → detect video ID and metadata.
	- Fetch current metrics (views, likes, comments) via YouTube Data API.
	- Normalize metrics and show suggested market templates (binary: reach N views by T; numeric: predicted views at T; engagement ranking).
	- Create the market (off-chain market object and optimistic odds) and display market page immediately.

2. Wallet Connect & TREND token
	- Wallet connect integration (MetaMask, WalletConnect). TREND is an ERC-20 token on Polygon used for staking and payouts.
	- Off-chain deposit or meta-transaction flow for low-friction staking (see Token/Gas section).

3. Market Discovery & UX
	- Market feed with sorting (newest, trending, highest stake).
	- Market details page with live metrics, odds, comment thread, and bet entry UI.

4. Settlement & Payout
	- Scheduled or condition-based resolution using platform APIs as oracle sources.
	- Off-chain settlement engine verifies final metrics, computes payouts, and issues on-chain batch settlement transaction(s) for transparency.

5. Leaderboards & Rewards
	- Track top predictors (weekly/monthly) and distribute TREND token rewards.

6. Basic Anti-Fraud Measures (MVP)
	- Minimum stake threshold, rate-limiting market creation, and heuristic checks on abnormally fast metric spikes.

Nice-to-Have (post-MVP)
-----------------------
- Multi-platform support (X, Instagram, TikTok) with third-party provider integrations.
- Advanced market types (parimutuel, continuous AMM, liquidity pools).
- Creator tools: paid markets, whitelisting, authenticated webhooks for verification.
- Social features: shareable market widgets, communities, and tournaments.

User Flows (high-level)
-----------------------
1. Create market (Copy & Predict)
	- User pastes a video/post link → frontend parses platform and ID.
	- Frontend calls backend /api/preview with link.
	- Backend normalizes link, fetches metadata and metrics via platform API, returns suggested market templates and initial odds.
	- User customizes parameters (resolution time, threshold) and clicks Create.
	- Backend creates a market record (status=active, settlement: off-chain-config) and optionally enqueues on-chain settlement job.
	- UI shows the market immediately with a small badge: "Metrics verifying — odds may update".

2. Place bet
	- User connects wallet and approves TREND (if using on-chain staking) or deposits to off-chain staking balance.
	- User sets stake amount and confirms. If a meta-tx flow is used, the client signs a message and the relayer submits the tx to Polygon.

3. Resolve & Payout
	- At resolution time, worker fetches final metrics from the platform API, runs verification and anti-fraud heuristics.
	- If passed, settlement engine computes payouts, updates user balances, and queues a batched on-chain transaction for transparency.
	- Users can withdraw TREND to their wallet (on-chain), subject to cooldowns and anti-abuse rules.

Technical Architecture (overview)
--------------------------------
- Frontend: Next.js (App Router), React, UI components. Wallet support with Wagmi/ConnectKit.
- Backend API: Node.js (Express or Fastify), TypeScript. Responsible for link parsing, API aggregation, market lifecycle, and exposing REST/GraphQL endpoints.
- Workers / Queue: Redis + BullMQ (or RabbitMQ/Kafka) for asynchronous jobs (fetching metrics, resolution jobs, payouts, ingestion throttling).
- Database: PostgreSQL (primary), Redis (caching, rate-limits), ClickHouse (optional for analytics).
- Blockchain layer: Polygon (RPC via Alchemy/Infura/QuickNode). Ethers.js for contract interactions.
- Relayer & Meta-tx: A server-side relayer (optionally using EIP-2771 / account abstraction patterns) to cover gas for UX flows.
- Oracles & Data: Direct platform APIs (YouTube, X, etc.). Optionally use third-party providers for platforms where official APIs are unusable.

Data model (high-level)
-----------------------
- Market: id, platform, resource_id, type, parameters, created_at, resolution_time, status, settlement_tx, metadata_snapshot
- Bet: id, market_id, user_id, amount, outcome, created_at
- User: id, wallet_address, offchain_balance, kyc_status (optional), created_at
- MetricSnapshot: market_id, timestamp, views, likes, comments, raw_api_response

Platform Integrations & Data Sources
-----------------------------------
- YouTube Data API v3 (MVP): reliable public metrics (views, likes, comments) — requires API key and quota management.
- X (Twitter) API: engagement metrics if paid tier is available.
- Instagram Graph API: limited to Business/Creator accounts — plan for creator opt-in/verification flow.
- TikTok: limited public API; third-party providers or partner agreements preferred.
- Third-party metric providers (SocialBlade, CrowdTangle, commercial APIs) for additional coverage.

Smart Contract & Token Design (summary)
--------------------------------------
- TREND token: ERC-20 on Polygon for staking and rewards.
- Settlement contract (optional MVP): a simple contract that records settlement events and allows batched payouts. For trust-minimized operation this contract can hold pooled user funds and execute payouts according to signed attestations from the settlement engine.
- Relayer pattern: users sign EIP-712 messages; relayer aggregates and submits batched transactions; operator periodically publishes settlement proofs to the blockchain for audit.

Security, Fraud, and Trust
-------------------------
- Store raw API responses for each resolution to provide an auditable record.
- Use multiple metrics (views + likes + watch time where available) to detect synthetic spikes.
- Implement rate limits, CAPTCHA or anti-bot verification for market creation and large-stake actions.
- KYC and withdrawal controls for high-value accounts (jurisdiction dependent).
- Smart contract audits for any contract that custody user funds or executes payouts.

Compliance & Legal
------------------
- Legal review required for prediction-market and betting regulations in primary target jurisdictions. Consider geofencing or excluding regulated countries.
- Platform Terms of Service: ensure API usage complies with each platform's ToS; for scraping, obtain legal guidance and prefer partner integrations.

Operational & Monitoring Requirements
-----------------------------------
- Logging: API calls to platforms, worker job results, settlement decisions, and on-chain txs.
- Monitoring: Prometheus + Grafana for infra; Sentry for frontend/backend errors.
- Alerts: failed settlements, queue backlogs, abnormal metric changes.

Acceptance Criteria (MVP)
------------------------
1. Paste a YouTube link → market preview returns normalized metrics in < 3s.
2. Market created and visible immediately in the UI; at least one user can stake using TREND (via off-chain deposit or meta-tx flow).
3. Settlement job resolves market based on YouTube API results and updates user balances correctly.
4. Batched settlement transaction is recorded on Polygon with a reference to market IDs and snapshots.
5. Basic anti-fraud heuristics flag suspicious markets and prevent immediate settlement without review.

Metrics & KPIs
--------------
- Time-to-market-create (user paste → market visible): target < 5s
- Average settlement accuracy (manual audits vs automated): target >= 99% for resolved markets
- MAU (month 1): 10k users (target)
- Average stake per market: target (configurable) — used to estimate liquidity and fees
- Number of markets created per day: target 1k/day initially

Roadmap & Milestones
--------------------
Phase 0 — Discovery (1 week)
- Secure YouTube API key, test data fetching, confirm required fields.

Phase 1 — MVP (3–5 weeks)
- Implement link preview endpoint and normalization.
- Implement market DB models and off-chain market creation.
- Basic staking flow (off-chain balances) and wallet connect.
- Settlement worker and batched on-chain settlement proof.
- Basic UI for create, market page, bet flow, leaderboards.

Phase 2 — Platform expansion (6–10 weeks)
- Add X and partner APIs; create provider abstraction layer.
- Add anti-fraud ML heuristics and KYC flows for high-value users.

Phase 3 — Trust-minimized markets (12+ weeks)
- Design and deploy on-chain market contracts (AMM or orderbook).
- Integrate relayer and gas sponsorship for seamless UX.

Risks & Mitigations
-------------------
- Risk: API rate limits or data unavailability. Mitigation: caching, tiered providers, paid APIs, graceful degradation.
- Risk: regulatory classification as gambling. Mitigation: legal review, geofencing, user eligibility, and careful market design.
- Risk: fraudulent metrics or manipulation. Mitigation: multi-metric verification, delayed settlement windows, manual review for edge cases.

Open Questions
--------------
1. Will TREND be initially minted and distributed centrally (team-managed) or via an on-chain token sale? Treasury model will affect incentives and payouts.
2. Which third-party provider(s) are acceptable for TikTok/Instagram metrics at scale? Budgetary constraints may apply.
3. What is the desired dispute resolution process — community arbitration, admin review, or algorithmic settlement only?

Appendix A — Example API call (YouTube)
-------------------------------------
GET https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id={VIDEO_ID}&key={API_KEY}

Response (trimmed):
{
  "items": [
	 {
		"id": "{VIDEO_ID}",
		"snippet": { "title": "...", "channelTitle": "...", "publishedAt": "..." },
		"statistics": { "viewCount": "12345", "likeCount": "678", "commentCount": "90" }
	 }
  ]
}

Appendix B — Minimal market JSON (example)
------------------------------------------
{
  "id": "mkt_01",
  "platform": "youtube",
  "resource_id": "VIDEO_ID",
  "type": "binary",
  "parameters": { "threshold": 100000, "resolution_time": "2025-11-10T00:00:00Z" },
  "odds": { "yes": 0.55, "no": 0.45 },
  "status": "active"
}

Closing
-------
This PRD gives a complete blueprint to implement TrendZap's Copy & Predict experience with a practical YouTube-first MVP and a clear pathway to expand to other platforms and trust-minimized on-chain markets. Next steps: review this PRD with stakeholders, approve the MVP scope, and begin building the link ingestion + market engine (Phase 1).

Contact & owners
----------------
- Product owner: (assign)
- Engineering lead: (assign)
- Legal / Compliance: (assign)

