# Kleo Connect

A web3 social discovery platform that connects users through geolocation, blockchain identity, and data visualization.

Built with React 18, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18, React Router 6 |
| Language | TypeScript 4.9 |
| Build | Vite 4 |
| Styling | Tailwind CSS 3, Emotion |
| Web3 | Web3.js, MetaMask, Irys (Arweave) |
| IPFS | Helia |
| Charts | Recharts, Chart.js, D3 |
| Maps | Leaflet, Google Maps |
| Testing | Vitest |
| Linting | ESLint, Prettier, commitlint |
| Hooks | Husky |

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your API keys (see below)

# 3. Start dev server
npm run dev

# 4. Open http://localhost:5173
```

### Required Environment Variables

```env
VITE_GOOGLE_MAPS_API_KEY=   # For map features
VITE_GOOGLE_CLIENT_ID=      # For Google OAuth
VITE_LINKEDIN_CLIENT_ID=    # For LinkedIn OAuth
```

## Project Structure

```
src/
├── common/
│   ├── charts/        # Chart components (Recharts, Chart.js, D3)
│   ├── components/    # Shared UI components (buttons, modals, inputs)
│   ├── hooks/         # Custom React hooks (useWeb3, useGeoLocation)
│   ├── config.ts      # App configuration and constants
│   ├── constants/     # Enums and constant values
│   ├── interface.ts   # TypeScript type definitions
│   └── utils.ts       # Helper functions
├── pages/
│   ├── profile/       # User profile pages
│   ├── signup/        # Authentication flow
│   └── PrivacyPolicy/ # Legal pages
├── assets/            # Static assets (images, icons)
├── App.tsx            # Root component with routing
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run serve` | Preview production build |
| `npm run test` | Run tests |
| `npm run lint` | Lint codebase |

## Key Features

- **Web3 Wallet Connect** — MetaMask integration via `@metamask/detect-provider`
- **Geolocation Maps** — Interactive maps with Leaflet and Google Maps
- **Data Charts** — D3/Recharts visualizations for user data
- **IPFS Storage** — Decentralized file storage via Helia
- **Social Auth** — Google OAuth and LinkedIn login
- **Drag & Drop** — Sortable lists with `@dnd-kit`

## Architecture

### Routing

React Router 6 with lazy-loaded pages under `src/pages/`. Each page directory contains its own components and styles.

### State Management

Local component state via React hooks. Web3 state managed through custom hooks in `src/common/hooks/`.

### Styling

Tailwind CSS utility classes for most styling, Emotion for dynamic styles, and `classnames` for conditional class logic.

## Contributing

1. Fork the repo and create a branch: `git checkout -b feat/my-feature`
2. Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages
3. Run `npm run lint` and `npm run test` before pushing
4. Open a PR with a description of your changes

## License

MIT
