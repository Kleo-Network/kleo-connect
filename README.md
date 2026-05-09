# Kleo Connect

Kleo Connect is the React frontend for the Kleo user onboarding and profile experience. The app lets users sign up, connect social and wallet accounts, complete onboarding tasks, view their profile, and review their personal data dashboard.

The frontend is built with Vite, React 18, TypeScript, React Router, Tailwind CSS, and Vitest. It talks to the Kleo API through the shared `useFetch` hook in `src/common/hooks/useFetch.ts`.

## Tech Stack

- React 18 with TypeScript
- Vite for local development and production builds
- React Router for page routing
- Tailwind CSS for utility styling
- Vitest for tests
- ESLint and Prettier for code quality
- Web3, MetaMask, Phantom, and social OAuth integration libraries

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 8 or newer
- Access to any OAuth, wallet, map, RPC, or upload service credentials needed for the feature you are testing

This repository includes `package-lock.json`, so `npm ci` is the recommended install command for reproducible local setup.

### Installation

```bash
git clone https://github.com/Kleo-Network/kleo-connect.git
cd kleo-connect
npm ci
```

### Environment Variables

Create a local `.env` file from the example:

```bash
cp .env.example .env
```

Fill only the values needed for the workflow you are testing. Vite exposes only variables prefixed with `VITE_`.

| Variable | Used for |
| --- | --- |
| `VITE_GOOGLE_OAUTH_CLIENT_ID` / `VITE_GOOGLE_OAUTH_CLIENT_SECRET` | Google OAuth onboarding |
| `VITE_CALENDLY_INTEGRATION_API_KEY` / `VITE_CALENDLY_CLIENT_SECRET` / `VITE_CALENDLY_WEBHOOK_SIGNING_KEY` | Calendly integration |
| `VITE_INSTAGRAM_APPLICATION_ID` / `VITE_INSTAGRAM_APP_SECRET` | Instagram connection |
| `VITE_LINKEDIN_APPLICATION_ID` / `VITE_LINKEDIN_APPLICATION_SECRET` | LinkedIn connection |
| `VITE_TWITTER_APPLICATION_ID` / `VITE_TWITTER_KEY` / `VITE_TWITTER_SECRET` / `VITE_TWITTER_CLIENT_ID` | X/Twitter connection |
| `VITE_GITHUB_CLIENTID` | GitHub connection |
| `VITE_GOOGLE_MAP_KEY` | Google Maps widgets |
| `VITE_RPC_URL` | Blockchain RPC provider |
| `VITE_REDIRECTED_URL` | OAuth redirect destination |
| `VITE_SOLANA_PRIVATE_KEY` / `VITE_POLYGONE_PRIVATE_KEY` | Wallet-related local integration values |
| `VITE_KLEO_THIRDWEB_CLIENT_KEY` / `VITE_KLEO_THIRDWEB_SECRET` | Thirdweb integration, referenced from `src/common/config.ts` |
| `VITE_UPLOAD_API_DOMAIN` | Decentralized upload service host |

The default API base URL is currently defined in `src/common/hooks/useFetch.ts`:

```ts
export const baseUrl = 'https://fastapi.kleo.network/api/v1'
```

Change that value locally if you need to point the frontend at a local API during backend development.

## Development

Start the Vite dev server:

```bash
npm run dev
```

Vite prints the local URL in the terminal. The app usually runs on `http://localhost:5173` unless that port is already occupied.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run serve` | Preview the production build on port `3000` |
| `npm run lint` | Run ESLint across JavaScript and TypeScript files |
| `npm test` | Run the Vitest test suite |
| `npm run prepare` | Install Husky git hooks |

## Project Structure

```text
.
|-- __tests__/                 # Vitest tests
|-- assets/                    # Repository-level screenshots and static docs assets
|-- src/
|   |-- assets/                # App images, dashboard icons, stylesheets, fonts, animation data
|   |-- common/
|   |   |-- charts/            # Shared chart components
|   |   |-- components/        # Shared UI components such as Navbar, Accordion, and Alerts
|   |   |-- constants/         # Shared data models and static content
|   |   |-- hooks/             # Reusable React hooks, including API access and wallet helpers
|   |   |-- config.ts          # Vite environment-variable mapping
|   |   |-- interface.ts       # Shared TypeScript interfaces
|   |   `-- utils.ts           # Shared utility functions
|   |-- pages/
|   |   |-- PrivacyPolicy/     # Privacy policy route
|   |   |-- profile/           # User profile, leaderboard, rewards, referrals, and data views
|   |   `-- signup/            # Multi-step signup and onboarding flow
|   |-- App.tsx                # Top-level routing and logged-in state handling
|   |-- main.tsx               # React entry point
|   `-- index.css              # Global styles and Tailwind imports
|-- tailwind.config.js         # Tailwind theme and plugin configuration
|-- vite.config.ts             # Vite, React, SVG, and node polyfill configuration
|-- package.json               # Scripts and dependencies
`-- package-lock.json          # Locked npm dependency graph
```

## Application Routes

Routes are defined in `src/App.tsx`.

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | Redirect | Sends authenticated users to their profile and unauthenticated users to signup |
| `/signup/:step` | `src/pages/signup` | Multi-step onboarding flow |
| `/profile/:address` | `src/pages/profile` | Public or authenticated profile view |
| `/my-data/:address` | `MyData` | Authenticated personal data dashboard |
| `/privacy` | `PrivacyPolicy` | Privacy policy page |
| `*` | Redirect/Profile fallback | Redirects unauthenticated users home, otherwise shows profile |

Authentication state is currently derived from `localStorage` values such as `token` and `address`.

## Key Workflows

### API Requests

Use `src/common/hooks/useFetch.ts` for API requests. The hook:

- prefixes requests with `baseUrl`
- adds the `Authorization` header from `localStorage.token`
- exposes `FetchStatus` values for loading and error states
- supports aborting an in-flight request before a new manual request starts

Example:

```ts
const { fetchData, data, status, error } = useFetch<UserData>()

fetchData('user/get-user/{address}', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
})
```

### User Data

The shared `UserData` shape lives in `src/common/constants/SignupData.ts`. `App.tsx` initializes a fallback user object, fetches the persisted user by address, and passes the user state into signup onboarding.

### Styling

Most styles use Tailwind utilities directly in components. Global styling and font imports live in `src/index.css` and `src/App.css`; Tailwind theme configuration lives in `tailwind.config.js`.

### Assets

App assets are under `src/assets`. Shared image constants, dashboard illustrations, font files, and Lottie JSON files are kept there so page components can import them with relative paths.

## Testing

Run the test suite with:

```bash
npm test
```

The current test setup uses Vitest. New business logic should be covered with focused unit tests under `__tests__/` or colocated tests if the project adopts that convention later.

## Build and Preview

Create a production build:

```bash
npm run build
```

Preview the built app locally:

```bash
npm run serve
```

The preview server runs on port `3000` by default.

## Deployment Notes

This is a static Vite frontend. A production deployment should:

1. Install dependencies with `npm ci`.
2. Provide all required `VITE_` environment variables at build time.
3. Run `npm run build`.
4. Serve the generated `dist/` directory through a static host or CDN.
5. Configure SPA fallback routing so deep links such as `/profile/:address` and `/signup/:step` resolve to `index.html`.

Because Vite embeds `VITE_` values into the client bundle, do not put private server-only secrets in frontend environment variables.

## Contributing

1. Create a focused branch from `production`.
2. Install dependencies with `npm ci`.
3. Keep UI, hook, and config changes scoped to the feature or bug being addressed.
4. Run `npm run lint`, `npm test`, and `npm run build` before opening a pull request when possible.
5. Use clear commit messages. The repository includes commitlint and Husky, so Conventional Commit-style messages are preferred.
6. In the pull request description, summarize the user-facing change, list test/build commands run, and call out any environment variables or backend assumptions.

## Troubleshooting

- If OAuth flows redirect incorrectly, confirm `VITE_REDIRECTED_URL` and provider callback URLs match the local or deployed origin.
- If API calls fail locally, check the `baseUrl` value in `src/common/hooks/useFetch.ts` and confirm the backend accepts the current `Authorization` token.
- If wallet-dependent flows fail, verify the browser wallet extension is installed and the matching RPC or private-key values are configured for your local environment.
- If a deep link works locally but not after deployment, configure the static host to serve `index.html` for unknown routes.
