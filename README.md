# Kleo Connect

Kleo Connect is a React application for building a portable social data profile. It guides users through signup, connects social and wallet data sources, shows a public profile, and gives users a dashboard for reviewing their data quality, rewards, referrals, and connected data cards.

The app is built with Vite, React, TypeScript, Tailwind CSS, and Web3/social integrations. It is intended to run as a browser client that talks to the Kleo backend APIs and third-party OAuth providers.

![Dashboard](assets/Dashboard.png)

## Features

- Onboarding and signup flow for new Kleo users
- Public profile pages under `/profile/:address`
- Authenticated data dashboard under `/my-data/:address`
- Social integrations for Google, Instagram, LinkedIn, X/Twitter, and GitHub
- Wallet-related configuration for Solana, Polygon, RPC, and profile data flows
- Data quality, referrals, leaderboard, rewards, and snapshot UI modules
- React Router based page routing
- Tailwind CSS styling with reusable components and charts

## Tech stack

- React 18
- TypeScript 4.9
- Vite 4
- React Router 6
- Tailwind CSS 3
- Vitest
- ESLint and Prettier
- Web3, MetaMask/provider helpers, Irys, Helia/IPFS-related packages
- OAuth integrations for supported social providers

## Repository structure

```text
.
├── assets/                 # README and product screenshots
├── src/
│   ├── App.tsx             # Top-level routing and login state handling
│   ├── assets/             # App icons, images, fonts, and animations
│   ├── common/
│   │   ├── charts/         # Shared chart components
│   │   ├── components/     # Shared UI components such as Navbar and alerts
│   │   ├── constants/      # Signup, browsing, event, URL, and website constants
│   │   ├── hooks/          # Shared hooks for fetch, wallet, debounce, and scroll behavior
│   │   ├── config.ts       # Shared runtime/config helpers
│   │   └── utils.ts        # Shared utilities
│   ├── pages/
│   │   ├── PrivacyPolicy/  # Privacy policy page
│   │   ├── profile/        # Profile, dashboard, referrals, leaderboard, and My Data views
│   │   └── signup/         # Signup and onboarding flow
│   ├── main.tsx            # React application entry point
│   └── index.css           # Global styles
├── __tests__/              # Vitest tests
├── .env.example            # Required environment variable names
├── package.json            # Scripts and dependencies
├── tailwind.config.js      # Tailwind configuration
└── vite.config.ts          # Vite configuration
```

## Prerequisites

Use a Node.js version compatible with the dependencies in this project. Node 18 or Node 20 is recommended for local development.

You will also need npm. The repository includes a `package-lock.json`, so npm is the safest package manager to use for reproducible installs.

## Getting started

1. Clone the repository:

```bash
git clone https://github.com/Kleo-Network/kleo-connect.git
cd kleo-connect
```

2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
cp .env.example .env
```

4. Fill in the environment variables needed for the integrations you want to test.

5. Start the development server:

```bash
npm run dev
```

The Vite development server starts with host binding enabled. Open the local URL printed in the terminal.

## Environment variables

The app reads Vite-prefixed environment variables from `.env` files. Keep private credentials out of Git.

| Variable | Purpose |
| --- | --- |
| `VITE_GOOGLE_OAUTH_CLIENT_ID` | Google OAuth client ID |
| `VITE_GOOGLE_OAUTH_CLIENT_SECRET` | Google OAuth client secret |
| `VITE_CALENDLY_INTEGRATION_API_KEY` | Calendly integration API key |
| `VITE_CALENDLY_CLIENT_SECRET` | Calendly client secret |
| `VITE_CALENDLY_WEBHOOK_SIGNING_KEY` | Calendly webhook signing key |
| `VITE_INSTAGRAM_APPLICATION_ID` | Instagram application ID |
| `VITE_INSTAGRAM_APP_SECRET` | Instagram app secret |
| `VITE_LINKEDIN_APPLICATION_ID` | LinkedIn application ID |
| `VITE_LINKEDIN_APPLICATION_SECRET` | LinkedIn application secret |
| `VITE_TWITTER_APPLICATION_ID` | X/Twitter application ID |
| `VITE_TWITTER_KEY` | X/Twitter API key |
| `VITE_TWITTER_SECRET` | X/Twitter API secret |
| `VITE_TWITTER_CLIENT_ID` | X/Twitter OAuth client ID |
| `VITE_GITHUB_CLIENTID` | GitHub OAuth client ID |
| `VITE_GOOGLE_MAP_KEY` | Google Maps API key |
| `VITE_SOLANA_PRIVATE_KEY` | Solana private key for local integration testing |
| `VITE_POLYGONE_PRIVATE_KEY` | Polygon private key for local integration testing |
| `VITE_RPC_URL` | RPC endpoint used by Web3 flows |
| `VITE_REDIRECTED_URL` | OAuth redirect URL |

> Security note: Vite exposes `VITE_*` values to browser code. Do not put production secrets or high-value private keys in a frontend `.env` file. Use test credentials locally and move sensitive operations to a backend service when possible.

## Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run serve    # Preview the production build on port 3000
npm run lint     # Run ESLint over TS, TSX, and JS files
npm run test     # Run Vitest
```

## Application flow

### Routing

Routes are defined in `src/App.tsx`:

- `/` redirects users based on local login/profile state
- `/signup/:step` renders the signup and onboarding flow
- `/privacy` renders the privacy policy
- `/profile/:address` renders a public profile
- `/my-data/:address` renders the authenticated user data dashboard

The app stores lightweight login state in `localStorage`, including token and address values used by the profile and data flows.

### Shared data access

`src/common/hooks/useFetch.ts` centralizes API calls used by the app. Components use this hook to call backend endpoints, process successful responses, and update view state.

### Main page areas

- `src/pages/signup/` handles account onboarding and social connection steps.
- `src/pages/profile/` contains the profile page plus dashboard modules such as data quality, points, referrals, leaderboard, privacy, snapshots, and My Data.
- `src/common/components/` contains reusable UI building blocks shared across pages.

## Testing and validation

Run the test suite:

```bash
npm run test -- --run
```

Run a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

If linting reports existing repository-wide style issues, keep feature or documentation changes scoped and avoid introducing new lint errors.

## Deployment

Build the app before deployment:

```bash
npm run build
```

The generated `dist/` directory can be deployed to static hosting providers such as Vercel, Netlify, Cloudflare Pages, or an object storage/CDN setup.

For production deployments:

1. Configure OAuth redirect URLs in each provider dashboard.
2. Set the required `VITE_*` environment variables in the hosting provider.
3. Verify backend API and RPC endpoints are reachable from the browser.
4. Run `npm run build` in CI before publishing.
5. Smoke test signup, profile routing, and data dashboard access after deploy.

## Contributing

1. Fork the repository.
2. Create a branch with a clear name, for example `docs/readme-project-guide` or `fix/profile-routing`.
3. Make a focused change.
4. Run the relevant checks:

```bash
npm run test -- --run
npm run build
npm run lint
```

5. Open a pull request with:
   - a short summary of the change
   - screenshots for UI changes
   - test/build results
   - any setup notes reviewers need

## Troubleshooting

### `npm install` fails on a native dependency

Some dependencies may run native install scripts. If install issues appear on a newer Node.js version, retry with Node 18 or Node 20.

### OAuth redirect does not complete

Check that the provider dashboard redirect URL matches `VITE_REDIRECTED_URL` and the local or deployed app URL exactly.

### Profile or My Data page redirects unexpectedly

Confirm that `localStorage` contains the expected `token` and `address` values and that the backend user endpoint is reachable.

### Build works locally but integrations fail in production

Confirm that all required `VITE_*` variables are configured in the hosting provider and that provider dashboards allow the production domain.

## License

This project is licensed under the terms in [LICENSE](LICENSE).
