# Kleo Connect

Kleo Connect is the React frontend for Kleo Network's user onboarding and profile experience. It lets users connect social and wallet accounts, complete onboarding, view profile data quality, track Kleo points, manage referrals, and share activity snapshots.

The application is built with Vite, React 18, TypeScript, React Router, Tailwind CSS, Chart.js, and several Web3/social integrations.

![Dashboard](assets/Dashboard.png)

## Features

- Multi-step signup and authentication flow.
- Profile dashboard with points, activity quality, milestones, referrals, privacy, and leaderboard sections.
- Wallet helpers for Phantom and Web3 integrations.
- Social connection configuration for Google, GitHub, LinkedIn, Instagram, Twitter, and Calendly.
- Data fetching against the Kleo API at `https://fastapi.kleo.network/api/v1`.
- Tailwind-based responsive UI with local fonts and image assets.

## Tech Stack

- React 18
- TypeScript 4.9
- Vite 4
- React Router 6
- Tailwind CSS 3
- Chart.js and Recharts
- Vitest
- ESLint and Prettier

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A browser wallet such as Phantom when testing wallet-dependent flows

### Install Dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file in the project root for local integration keys. Vite only exposes variables prefixed with `VITE_`.

```bash
VITE_GOOGLE_OAUTH_CLIENT_ID=
VITE_GOOGLE_OAUTH_CLIENT_SECRET=
VITE_CALENDLY_INTEGRATION_API_KEY=
VITE_CALENDLY_CLIENT_SECRET=
VITE_CALENDLY_WEBHOOK_SIGNING_KEY=
VITE_INSTAGRAM_APPLICATION_ID=
VITE_INSTAGRAM_APP_SECRET=
VITE_LINKEDIN_APPLICATION_ID=
VITE_LINKEDIN_APPLICATION_SECRET=
VITE_TWITTER_APPLICATION_ID=
VITE_TWITTER_KEY=
VITE_TWITTER_SECRET=
VITE_TWITTER_CLIENT_ID=
VITE_GITHUB_CLIENTID=
VITE_GOOGLE_MAP_KEY=
VITE_RPC_URL=
VITE_REDIRECTED_URL=
VITE_KLEO_THIRDWEB_CLIENT_KEY=
VITE_KLEO_THIRDWEB_SECRET=
VITE_UPLOAD_API_DOMAIN=
```

Most screens render without every key populated, but authentication, social linking, map, upload, and wallet workflows require their matching provider credentials.

### Run Locally

```bash
npm run dev
```

Vite serves the app at `http://localhost:5173` by default.

### Build

```bash
npm run build
```

The production build is written to `dist/`.

### Preview Production Build

```bash
npm run serve
```

This runs `vite preview` on port `3000`.

## Project Structure

```text
.
|-- assets/                     # README screenshots and diagrams
|-- src/
|   |-- App.tsx                 # Top-level routes and session bootstrap
|   |-- main.tsx                # React root and BrowserRouter setup
|   |-- common/
|   |   |-- charts/             # Reusable chart components
|   |   |-- components/         # Shared UI components
|   |   |-- config.ts           # Vite environment variable mapping
|   |   |-- constants/          # Static UI and onboarding data
|   |   |-- hooks/              # Fetch, wallet, debounce, and scroll helpers
|   |   `-- interface.ts        # Shared TypeScript interfaces
|   |-- pages/
|   |   |-- PrivacyPolicy/      # Privacy policy route
|   |   |-- profile/            # Dashboard, points, data, referrals, privacy
|   |   `-- signup/             # Signup and onboarding flows
|   `-- assets/                 # Fonts, icons, images, animations, styles
|-- __tests__/                  # Vitest tests
|-- package.json                # Scripts and dependencies
|-- tailwind.config.js          # Tailwind theme and utilities
|-- tsconfig.json               # TypeScript compiler configuration
`-- vite.config.ts              # Vite build configuration
```

## Key Modules

- `src/App.tsx` initializes user state, checks the stored auth token, fetches the user profile, and defines public/private routes.
- `src/common/hooks/useFetch.ts` wraps calls to the Kleo API and attaches the stored auth token when present.
- `src/pages/signup` contains the onboarding and authentication UI.
- `src/pages/profile` contains the signed-in dashboard and validates that the route address, local storage address, and extension address match.
- `src/common/config.ts` centralizes provider credentials read from Vite environment variables.
- `src/common/hooks/usePhantomWallet.ts` provides Phantom wallet connect, disconnect, signing, and transaction helpers.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build. |
| `npm run serve` | Preview the production build on port `3000`. |
| `npm run lint` | Run ESLint on JS/TS source files. |
| `npm run test` | Run the Vitest test suite. |

## Testing and Quality Checks

Run the checks that match your change before opening a pull request:

```bash
npm run lint
npm run test
npm run build
```

If you add new components or hooks, add focused Vitest coverage when possible and manually exercise the relevant route in the browser.

## Deployment

1. Install dependencies with `npm install`.
2. Configure the required `VITE_*` environment variables in the deployment provider.
3. Build with `npm run build`.
4. Deploy the generated `dist/` directory to a static host such as Vercel, Netlify, Cloudflare Pages, or an equivalent CDN-backed static hosting service.
5. Configure SPA fallback routing so deep links such as `/signup/0` and `/profile/:address` return `index.html`.

## Contributing

1. Pick an open issue and confirm the expected behavior before starting.
2. Create a focused branch from `production`.
3. Keep changes scoped to the issue and avoid unrelated formatting churn.
4. Use existing patterns for hooks, routes, Tailwind classes, and API calls.
5. Run the relevant checks before submitting a pull request.
6. In the pull request description, include the issue number, what changed, and the commands you ran.

## License

This project is licensed under the terms in [LICENSE](LICENSE).
