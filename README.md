# Kleo Connect — React Frontend

A community engagement platform where users earn rewards for contributing data, content, and social engagement. Built with React, TypeScript, and Vite.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript 4.9 | Type safety |
| Vite 4 | Build tool & dev server |
| Tailwind CSS 3 | Styling |
| React Router 6 | Client-side routing |
| Vitest | Unit testing |
| ESLint + Prettier | Code quality |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables
cp .env.example .env
# Fill in your API keys and endpoints

# 3. Start development server
npm run dev
# Opens at http://localhost:5173

# 4. Run tests
npm test

# 5. Build for production
npm run build
```

## Project Structure

```
src/
├── App.tsx                 # Main app component with routing
├── main.tsx                # Entry point
├── config.ts               # App configuration & constants
├── interface.ts            # Shared TypeScript interfaces
├── utils.ts                # Utility functions
│
├── assets/                 # SVGs, images, fonts
├── stylesheets/            # CSS files
│
├── common/                 # Shared components
│   ├── charts/             # RadarChart, MultiProgressBar
│   ├── components/         # Navbar, Accordion, Alerts, KleoMate
│   ├── constants/          # BrowsingHistory, Events, SignupData, UrlData, Website
│   └── hooks/              # useBodyScroll, useDebounce, useFetch, usePhantomWallet
│
├── pages/                  # Page-level components
│   ├── dashboard/          # Main dashboard (Leaderboard, MyData, Referrals, Milestones)
│   ├── profile/            # User profile page
│   ├── signup/             # Signup flow with Authentication
│   └── PrivacyPolicy.tsx   # Privacy policy page
│
└── common/components/
    └── KleoMate.jsx        # Inline assistant/mascot component
```

## Key Components

### Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Main dashboard with leaderboard, data stats, referral table, milestones |
| `/profile` | Profile | User profile with settings and activity |
| `/signup` | Signup | Authentication via Particle Network or Phantom wallet |
| `/privacy-policy` | PrivacyPolicy | Legal/privacy information |

### Dashboard Sections

- **Leaderboard** — Top contributors ranked by points
- **My Data** — User-contributed data overview with quality scoring
- **Points & Data** — Points earned vs data contributed
- **Referrals** — Referral table with tracking
- **Milestones** — Achievement tracking with circular progress bars
- **Snapshot** — Historical data snapshots
- **Privacy** — Privacy controls

### Authentication

Supports two auth methods:
1. **Particle Network** — Web2+Web3 hybrid auth (email, social, phone)
2. **Phantom Wallet** — Solana wallet connection via `usePhantomWallet` hook

### Custom Hooks

| Hook | Description |
|------|-------------|
| `usePhantomWallet` | Solana Phantom wallet connection state |
| `useFetch` | Generic data fetching with loading/error states |
| `useDebounce` | Debounces rapidly changing values |
| `useBodyScroll` | Controls body scroll locking for modals |

## Configuration

Edit `src/config.ts` for app-wide settings:
- API endpoints
- Feature flags
- Contract addresses

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API endpoint |
| `VITE_PARTICLE_APP_ID` | Particle Network app ID |
| `VITE_PARTICLE_CLIENT_KEY` | Particle Network client key |
| `VITE_SOLANA_RPC` | Solana RPC endpoint |

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit with conventional commits: `git commit -m "feat: add new feature"`
4. Push and open a PR

## Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm test          # Run tests
npm run lint      # ESLint check
npm run preview   # Preview production build
```
