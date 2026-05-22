# Kleo Connect

Kleo Connect is a Vite + React + TypeScript frontend for the Kleo Network.
It focuses on onboarding, profile views, privacy pages, and data-oriented UI
that talks to the Kleo backend API.

## What it includes

- Multi-step signup and onboarding flow
- Public profile pages
- Personal data / "my data" views
- Privacy policy page
- Leaderboard, referral, snapshot, and data-quality components
- Shared hooks for fetch, wallet, debounce, scroll, and body-lock behavior

## Tech stack

- React 18
- React Router 6
- Vite 4
- TypeScript
- Tailwind CSS 3
- Emotion
- Vitest
- ESLint + Prettier

## Prerequisites

- Node.js 18+
- npm
- Access to the Kleo API backend at `https://fastapi.kleo.network/api/v1`
- A local `.env` file based on `.env.example`

## Getting started

```bash
git clone https://github.com/KshitijKoranne/kleo-connect.git
cd kleo-connect
npm install
cp .env.example .env
```

Then fill in the environment variables you need for local development.
Some values can stay blank if you only want to run the UI locally.

## Environment variables

The project reads config from Vite environment variables in `src/common/config.ts`.
See `.env.example` for the full list.
The most important groups are:

- OAuth / social login keys
- Maps and wallet-related keys
- Redirect URL for auth flows
- Upload/API host settings

## Available scripts

```bash
npm run dev      # Start the Vite dev server
npm run build    # Build production assets
npm run serve    # Preview the production build on port 3000
npm run lint     # Run ESLint
npm run test     # Run Vitest
npm run prepare  # Install Husky hooks
```

## Project structure

- `src/App.tsx` — top-level routes and login gating
- `src/main.tsx` — React entry point
- `src/pages/signup` — onboarding flow
- `src/pages/profile` — profile views and data widgets
- `src/pages/PrivacyPolicy` — privacy policy page
- `src/common/components` — shared UI components
- `src/common/hooks` — fetch, wallet, debounce, scroll helpers
- `src/common/constants` — shared data and labels
- `src/common/charts` — charts used in the profile experience
- `assets` — static images and screenshots
- `__tests__` — test files

## Local development notes

- The app currently fetches data from the Kleo API backend.
- If you change API URLs or auth redirects, update `src/common/hooks/useFetch.ts` and `src/common/config.ts` accordingly.
- The default route sends logged-in users to their profile and new users to the signup flow.

## Build and deployment

The production build is generated into `dist/`.
You can deploy that output to any static hosting provider.
Make sure the deployed environment has the correct Vite env vars and that the backend API URL and redirect URL match the target environment.

## Contributing

1. Create a branch from `production`.
2. Keep changes small and focused.
3. Run `npm run lint` and `npm run test` before opening a PR.
4. Open the PR against `production`.

## License

See [`LICENSE`](LICENSE).
