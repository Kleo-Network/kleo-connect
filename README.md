# Kleo Connect Frontend

React + TypeScript frontend for the Kleo user onboarding and profile experience. The app routes users through signup/authentication, then into a dashboard-style profile with points, referrals, milestones, data-quality views, leaderboard state, privacy pages, and sharing flows.

## What this project does

Kleo Connect appears to power the client-side experience for a user-facing Kleo product. From the current codebase, the frontend handles:

- signup and onboarding flows
- wallet / identity-aware profile routing
- profile dashboard and points display
- leaderboard and referral views
- privacy policy and privacy-related profile views
- graph-based activity visualizations and share actions
- calls to the Kleo backend API at `https://fastapi.kleo.network/api/v1`

## Tech stack

- React 18
- TypeScript
- Vite 4
- React Router 6
- Tailwind CSS
- Chart.js / react-chartjs-2 / Recharts / D3
- Leaflet / Google Maps integrations
- Web3-related integrations including MetaMask and Phantom helpers

## Main user flows

### 1. Entry and routing

The app boots from `src/main.tsx`, mounts `App`, and wraps everything in `BrowserRouter`.

`src/App.tsx` controls the high-level flow:

- `/` redirects users to signup or their profile depending on local auth state
- `/signup/:step` serves the onboarding flow
- `/profile/:address` serves the logged-in dashboard
- `/my-data/:address` is available for logged-in users
- `/privacy` shows the privacy policy

### 2. Signup / onboarding

The signup area lives under `src/pages/signup/`.

Important files:
- `src/pages/signup/index.tsx`
- `src/pages/signup/Onboarding/Authentication/index.tsx`
- `src/pages/signup/Onboarding/Particle/*`

Responsibilities include:
- rendering onboarding UI
- handling login / auth handoff
- transitioning the user into their profile page after successful login

### 3. Profile dashboard

The profile area lives under `src/pages/profile/`.

Important files:
- `src/pages/profile/index.tsx`
- `src/pages/profile/components/PointsAndData.tsx`
- `src/pages/profile/components/DataQuality.tsx`
- `src/pages/profile/components/Leaderboard.tsx`
- `src/pages/profile/components/Referrals.tsx`
- `src/pages/profile/components/Snapshot.tsx`
- `src/pages/profile/components/Privacy.tsx`
- `src/pages/profile/components/MyData.tsx`
- `src/pages/profile/components/mileStones/*`

Current profile/dashboard behavior in the code includes:
- validating the current address against local storage and extension-provided state
- fetching user records from the backend
- fetching activity graph data
- uploading/share flows for graph snapshots
- rendering milestones, referrals, leaderboard, and privacy-related sections

## API behavior

The shared fetch hook lives in:
- `src/common/hooks/useFetch.ts`

Current defaults from that hook:
- base API URL: `https://fastapi.kleo.network/api/v1`
- bearer-like auth value is read from `localStorage.getItem('token')`
- requests are made with the native `fetch` API

Examples of endpoints referenced in the current frontend:
- `user/get-user/{address}`
- `user/get-user-graph/{address}`
- `user/top-users?limit=20&address={address}`
- `user/referrals/{address}`
- `user/upload_activity_chart`

## Environment variables

The app reads multiple environment variables from `import.meta.env` in `src/common/config.ts`.

Known variables referenced by the current code:

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

Create a local `.env` file before running the app if your workflow depends on these integrations.

## Getting started

### Prerequisites

- Node.js 18+ recommended
- npm (or adapt commands for yarn if preferred)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

By default the Vite dev server is configured with `--host`, so it will bind beyond localhost.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run serve
```

### Run tests

```bash
npm run test
```

### Lint

```bash
npm run lint
```

## Project structure

```text
.
├── assets/                       # screenshots and static repo assets
├── src/
│   ├── assets/                   # application images, icons, fonts, animations
│   ├── common/
│   │   ├── charts/               # shared chart components
│   │   ├── components/           # shared UI such as Navbar, Alerts, Accordion
│   │   ├── config.ts             # env-backed integration config
│   │   ├── constants/            # app constants and typed data shapes
│   │   ├── hooks/                # shared hooks like useFetch, useDebounce
│   │   ├── interface.ts          # shared interfaces
│   │   └── utils.ts              # shared utilities
│   ├── pages/
│   │   ├── PrivacyPolicy/        # privacy policy page
│   │   ├── profile/              # dashboard, referrals, leaderboard, milestones
│   │   └── signup/               # onboarding and authentication flows
│   ├── App.tsx                   # top-level routes and auth-aware redirects
│   ├── main.tsx                  # app bootstrap
│   └── index.css                 # global styles
├── funding.json
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Notes on local development

A few parts of the current UI depend on external runtime state that may not exist in a clean local environment:

- local storage values such as `token` and `address`
- backend responses from the Kleo API
- browser extension / wallet-related objects like `window.kleoConnect`
- third-party OAuth and upload credentials supplied via environment variables

If those are missing, some authenticated screens or integrations may redirect or fail until the required state is mocked or configured.

## Build, test, and deployment notes

Current package scripts:

```json
{
  "dev": "vite --host",
  "build": "vite build",
  "serve": "vite preview --port 3000",
  "lint": "eslint . --ext .ts,.tsx,.js",
  "test": "vitest"
}
```

Suggested production workflow:
1. install dependencies
2. define required `.env` values
3. run `npm run lint`
4. run `npm run build`
5. preview or deploy the generated `dist/` output behind your preferred static hosting layer

## Contributing

If you want to contribute:

1. fork the repository
2. create a feature or fix branch
3. make focused changes
4. run lint/tests/build locally when possible
5. open a PR with a clear summary, screenshots if UI changed, and any setup notes reviewers need

## Documentation gaps that still exist

This README now covers setup, structure, routing, API usage, and scripts, but future improvements could still include:

- a real `.env.example`
- screenshots for signup, dashboard, referrals, and leaderboard states
- API contract documentation per endpoint
- component-level docs for major profile modules
- deployment-specific instructions for the production hosting environment
