# Kleo Connect

Kleo Connect is a Vite + React + TypeScript frontend for Kleo user onboarding, wallet/profile flows, and connected data cards. The app lets users sign up, connect supported web accounts, view their profile, and inspect their data dashboard.

## Tech stack

- React 18 + React Router 6
- TypeScript 4.9
- Vite 4
- Tailwind CSS 3
- Vitest
- ESLint + Prettier + Husky + Commitlint

## Prerequisites

- Node.js 18.x (matches the CI workflow)
- npm 9+ or Yarn

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

3. Fill the provider keys that your flow needs. The app can start with empty values, but OAuth, map, wallet, upload, and redirect flows need their corresponding `VITE_*` settings.

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open the URL printed by Vite, usually `http://localhost:5173`.

## Environment variables

The frontend reads configuration from `.env` through `import.meta.env`. Keep secrets out of Git and use `.env.example` only as a template.

Common groups:

- `VITE_GOOGLE_*` - Google OAuth configuration
- `VITE_CALENDLY_*` - Calendly integration configuration
- `VITE_INSTAGRAM_*`, `VITE_LINKEDIN_*`, `VITE_TWITTER_*`, `VITE_GITHUB_CLIENTID` - social connection keys
- `VITE_GOOGLE_MAP_KEY` - map rendering
- `VITE_RPC_URL` - blockchain RPC endpoint
- `VITE_REDIRECTED_URL` - app redirect URL used after external auth flows
- `VITE_KLEO_THIRDWEB_CLIENT_KEY`, `VITE_KLEO_THIRDWEB_SECRET` - Thirdweb configuration
- `VITE_UPLOAD_API_DOMAIN` - decentralized upload API host

## Project structure

```text
.
├── assets/                 # README screenshots and static documentation assets
├── src/
│   ├── App.tsx             # Route definitions and top-level auth/profile state
│   ├── main.tsx            # React root and BrowserRouter setup
│   ├── common/
│   │   ├── charts/         # Shared chart components
│   │   ├── components/     # Shared UI components
│   │   ├── constants/      # Static signup, event, URL, and website data
│   │   ├── hooks/          # Reusable hooks for fetches, wallet, debounce, scroll
│   │   ├── config.ts       # Environment-backed app configuration
│   │   ├── interface.ts    # Shared TypeScript interfaces
│   │   └── utils.ts        # Shared helper functions
│   └── pages/
│       ├── PrivacyPolicy/  # Privacy policy route
│       ├── profile/        # Public profile and My Data screens
│       └── signup/         # Multi-step signup/onboarding flow
├── __tests__/              # Vitest tests
├── .github/workflows/      # CI: lint, build, test
├── tailwind.config.js      # Tailwind theme and plugin configuration
└── vite.config.ts          # Vite and polyfill configuration
```

## Available scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Create production build in dist/
npm run serve    # Preview the production build on port 3000
npm run lint     # Run ESLint over JS/TS/TSX files
npm run test     # Run Vitest
```

## Routing overview

- `/` redirects users to `/signup/0` unless an authenticated user token is present.
- `/signup/:step` renders the onboarding flow.
- `/profile/:address` renders a profile page for a wallet/address.
- `/my-data/:address` renders the data dashboard for logged-in users.
- `/privacy` renders the privacy policy.

## Build, test, and deployment

Before opening a pull request, run:

```bash
npm run lint
npm run build
npm run test
```

Deploy the generated `dist/` directory to any static hosting provider that supports single-page applications. Configure the host to serve `index.html` for unknown routes so React Router paths work after refresh.

## Contributing

1. Fork the repository and create a branch from `production`.
2. Keep changes focused and small.
3. Run lint, build, and tests locally.
4. Open a pull request with a clear summary, validation notes, and screenshots for UI changes.
5. Follow Conventional Commits for commit messages when possible, for example `docs: update project readme`.

## License

This project is licensed under the terms in [LICENSE](LICENSE).
