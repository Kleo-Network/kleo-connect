# Kleo Connect

Kleo Connect is the web profile and onboarding app for Kleo Network. It lets users authenticate with the Kleo browser extension, view their Kleo profile, inspect activity and data-quality signals, track milestones, manage referrals, and share profile activity.

The app is built with Vite, React, TypeScript, Tailwind CSS, and the Kleo API.

![Dashboard](assets/Dashboard.png)

## Features

- Extension-based sign-in through `window.kleoConnect.signIn`
- Profile routing by wallet address at `/profile/:address`
- Signup and onboarding flow at `/signup/:step`
- Kleo points, data quantity, data quality, milestones, referrals, privacy, and leaderboard views
- Activity graph upload and Twitter share flow
- Phantom wallet helper hook for Solana wallet interactions
- Vite node polyfills for browser-compatible Web3 dependencies

## Tech Stack

- React 18
- React Router 6
- TypeScript 4.9
- Vite 4
- Tailwind CSS
- Chart.js and Recharts
- Web3, Phantom wallet, Irys, Helia, and related browser crypto tooling
- Vitest

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A browser that can run the Kleo extension
- Optional: Phantom wallet for Solana wallet flows

### Install

```bash
npm install
```

### Configure Environment

Vite exposes only variables prefixed with `VITE_`. Create a local `.env` file when you need integrations that depend on external services:

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

The API base URL is currently defined in `src/common/hooks/useFetch.ts`:

```text
https://fastapi.kleo.network/api/v1
```

### Run Locally

```bash
npm run dev
```

The Vite dev server starts with `--host`, so it is available on localhost and on your local network address.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run serve
```

### Test

```bash
npm run test
```

### Lint

```bash
npm run lint
```

## App Flow

1. `src/main.tsx` mounts the React app inside `BrowserRouter`.
2. `src/App.tsx` checks local storage for the auth token and routes users.
3. New users are sent to `/signup/0`.
4. Signed-in users are routed to `/profile/:address`.
5. `src/pages/profile/index.tsx` waits for `window.kleoConnect`, calls `signIn`, and verifies that the URL address, local storage address, and extension address match.
6. Profile components fetch user data, graph data, leaderboard data, referrals, and privacy metrics from the Kleo API.

## Project Structure

```text
src/
  App.tsx                         App routing and auth state
  main.tsx                        React entry point
  common/
    components/                   Shared UI components
    constants/                    Static profile and dashboard data
    hooks/                        Fetch, wallet, debounce, and scroll hooks
    charts/                       Chart components
    config.ts                     Vite environment variable mapping
  pages/
    signup/                       Onboarding and authentication flow
    profile/                      Profile dashboard and profile widgets
    PrivacyPolicy/                Privacy policy page
  assets/                         Images, fonts, animations, and styles
```

## Authentication Notes

The profile page depends on the Kleo browser extension injecting `window.kleoConnect`. When the extension is ready, the app maps `window.signIn` to `window.kleoConnect.signIn` and validates the active address before rendering a profile.

If validation fails, the user is redirected to `/signup/0`.

## API Notes

`useFetch` automatically adds the local `token` value as the `Authorization` header. Common API paths include:

- `user/get-user/{address}`
- `user/get-user-graph/{address}`
- `user/upload_activity_chart`

## Contributing

1. Fork the repository.
2. Create a branch from `main`.
3. Install dependencies with `npm install`.
4. Make a focused change.
5. Run the relevant checks:

```bash
npm run lint
npm run test
npm run build
```

6. Open a pull request with a clear summary, screenshots for UI changes, and any test notes.
