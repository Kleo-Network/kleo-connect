# Kleo Connect Frontend

Kleo Connect is the React frontend for the Kleo browser extension experience. It signs users in through the Kleo Chrome extension, stores the authenticated wallet address and token locally, and renders profile, activity, data quality, milestone, referral, leaderboard, privacy, and "My Data" views for the connected account.

The app is built with Vite, React 18, TypeScript, Tailwind CSS, React Router, Chart.js, Recharts, React Leaflet, wallet utilities, and the Kleo API.

![Kleo dashboard screenshot](assets/screenshot.png)

## Table of Contents

- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Application Routes](#application-routes)
- [Project Structure](#project-structure)
- [Key Workflows](#key-workflows)
- [Testing and Quality Checks](#testing-and-quality-checks)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- The Kleo Connect Chrome extension for authenticated profile flows
- Access to any API keys required by the integrations you are testing

The repository includes `package-lock.json`, so npm is the recommended package manager for reproducible installs.

## Quick Start

```bash
git clone https://github.com/Kleo-Network/kleo-connect.git
cd kleo-connect
npm install
cp .env.example .env
npm run dev
```

Vite starts the app with `--host`, so it is available on the printed local and network URLs. The default local URL is usually `http://localhost:5173`.

For the full sign-in flow, install the Kleo Connect extension from the Chrome Web Store and make sure `window.kleoConnect` is available in the browser tab running the app.

## Environment Variables

All client-side environment variables must use the `VITE_` prefix so Vite exposes them to the frontend bundle.

Copy `.env.example` to `.env` and fill in only the values needed for the feature you are running:

| Variable | Used for |
| --- | --- |
| `VITE_GOOGLE_OAUTH_CLIENT_ID` | Google OAuth integration |
| `VITE_GOOGLE_OAUTH_CLIENT_SECRET` | Google OAuth integration |
| `VITE_CALENDLY_INTEGRATION_API_KEY` | Calendly integration |
| `VITE_CALENDLY_CLIENT_SECRET` | Calendly integration |
| `VITE_CALENDLY_WEBHOOK_SIGNING_KEY` | Calendly webhook verification |
| `VITE_INSTAGRAM_APPLICATION_ID` | Instagram integration |
| `VITE_INSTAGRAM_APP_SECRET` | Instagram integration |
| `VITE_LINKEDIN_APPLICATION_ID` | LinkedIn integration |
| `VITE_LINKEDIN_APPLICATION_SECRET` | LinkedIn integration |
| `VITE_TWITTER_APPLICATION_ID` | Twitter/X integration |
| `VITE_TWITTER_KEY` | Twitter/X integration |
| `VITE_TWITTER_SECRET` | Twitter/X integration |
| `VITE_TWITTER_CLIENT_ID` | Twitter/X OAuth client |
| `VITE_GITHUB_CLIENTID` | GitHub integration |
| `VITE_GOOGLE_MAP_KEY` | Google Maps features |
| `VITE_RPC_URL` | Irys or blockchain RPC calls |
| `VITE_REDIRECTED_URL` | OAuth redirection target |
| `VITE_UPLOAD_API_DOMAIN` | Decentralized upload host |
| `VITE_KLEO_THIRDWEB_CLIENT_KEY` | Thirdweb client configuration |
| `VITE_KLEO_THIRDWEB_SECRET` | Thirdweb client configuration |

The shared config object lives in `src/common/config.ts`. API calls currently use the production base URL in `src/common/hooks/useFetch.ts`:

```ts
export const baseUrl = 'https://fastapi.kleo.network/api/v1'
```

For local backend testing, change that value to your local API URL before running the frontend.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Runs the TypeScript compiler and creates the production build in `dist/`.

```bash
npm run serve
```

Serves the production build locally with Vite Preview on port 3000.

```bash
npm run lint
```

Runs ESLint across JavaScript and TypeScript source files.

```bash
npm test
```

Runs the Vitest test suite.

## Application Routes

Routes are defined in `src/App.tsx`.

| Route | Purpose |
| --- | --- |
| `/` | Redirects authenticated users to their profile and unauthenticated users to signup |
| `/signup/:step` | Extension install check and Kleo sign-in flow |
| `/profile/:address` | Authenticated profile dashboard |
| `/my-data/:address` | Authenticated user data page |
| `/privacy` | Privacy policy |
| `*` | Fallback redirect based on authentication state |

Authentication state is read from `localStorage` using the `token` and `address` values set during extension sign-in.

## Project Structure

```text
.
├── assets/                  # README and template screenshots
├── src/
│   ├── assets/              # App images, SVGs, fonts, and animations
│   ├── common/
│   │   ├── charts/          # Shared chart components
│   │   ├── components/      # Shared UI components such as Navbar and alerts
│   │   ├── constants/       # Static signup, browsing, event, and website data
│   │   ├── hooks/           # Fetch, wallet, debounce, and body-scroll hooks
│   │   ├── config.ts        # Environment-backed integration config
│   │   ├── interface.ts     # Shared TypeScript interfaces
│   │   └── utils.ts         # Formatting and URL helper functions
│   ├── pages/
│   │   ├── PrivacyPolicy/   # Privacy policy page
│   │   ├── profile/         # Dashboard and profile subcomponents
│   │   └── signup/          # Onboarding and extension sign-in flow
│   ├── App.tsx              # Top-level routes and auth redirect logic
│   └── main.tsx             # React root and BrowserRouter setup
├── __tests__/               # Vitest tests
├── index.html               # Vite HTML entrypoint
├── tailwind.config.js       # Tailwind theme and utilities
├── vite.config.ts           # Vite plugins, aliases, and polyfills
└── package.json             # Scripts and dependencies
```

## Key Workflows

### Extension Sign-In

The signup flow in `src/pages/signup/Onboarding/Authentication/index.tsx` checks whether `window.kleoConnect` exists. When the extension is installed, the Sign In button calls `window.signIn()`, stores the returned `address` and `token` in `localStorage`, and redirects to `/profile/:address`.

### Profile Validation

The profile page in `src/pages/profile/index.tsx` waits for `window.kleoConnect`, calls the extension sign-in method, and verifies that the address from the URL, local storage, and extension all match. If they do not match, the user is redirected back to signup.

### API Requests

Shared API behavior is implemented in `src/common/hooks/useFetch.ts`. The hook prepends the Kleo API base URL, adds the local auth token as the `Authorization` header, tracks loading/error/success state, and exposes a manual `fetchData` function for follow-up requests.

### Dashboard Features

The profile dashboard composes cards and charts from `src/pages/profile/components/`, including points and data quantity, data quality, milestones, snapshots, referrals, leaderboard state, privacy controls, and activity graph sharing.

## Testing and Quality Checks

Run the same checks before opening a pull request:

```bash
npm run lint
npm test
npm run build
```

`npm run build` is the most complete local verification because it runs TypeScript compilation before producing the Vite production bundle.

## Deployment

1. Configure the production environment variables in the hosting provider.
2. Run `npm install`.
3. Run `npm run build`.
4. Deploy the generated `dist/` directory.
5. Configure the host to serve `index.html` for unknown routes, because this is a single-page React app using browser routing.

The current Vite base path is `/` in `vite.config.ts`. Update `base` if the app is deployed under a subpath.

## Contributing

1. Create a feature branch from `production`.
2. Keep changes focused on one issue or feature.
3. Follow the existing React, TypeScript, Tailwind, and hook patterns.
4. Prefer shared helpers in `src/common/` over duplicating logic in page components.
5. Run lint, tests, and build locally before submitting.
6. Open a pull request with a clear summary, linked issue, and verification notes.

The project uses Conventional Commits through commitlint, so commit messages should use prefixes such as `feat:`, `fix:`, `docs:`, `refactor:`, or `test:`.

## Troubleshooting

### The Sign In button stays disabled

The app only enables sign-in after the Kleo extension exposes `window.kleoConnect`. Install the extension, refresh the page, and use the "I have already installed" button if the page loaded before the extension was available.

### Profile redirects back to signup

The profile route validates the URL address, local storage address, and extension address. Clear local storage, sign in again, and make sure the profile URL matches the active extension account.

### API calls fail locally

Confirm the backend base URL in `src/common/hooks/useFetch.ts`, the required `VITE_` variables, and the token stored in local storage. The default base URL points to the production Kleo API.

### Build errors mention missing environment values

Make sure `.env` exists and contains every variable needed by the feature being built. Vite only exposes variables that start with `VITE_`.
