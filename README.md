# Kleo Connect

Kleo Connect is the React frontend for the Kleo Network profile and onboarding experience. It helps users install the Kleo browser extension, sign in, view Kleo XP, inspect data-quality signals, share activity snapshots, and manage referrals from a browser-based dashboard.

![Kleo Connect dashboard](assets/Dashboard.png)

## Tech Stack

- React 18 and TypeScript
- Vite 4
- React Router 6
- Tailwind CSS
- Chart.js, Recharts, and React Chart.js 2
- Vitest
- ESLint and Prettier
- Solana, wallet, upload, and social-provider integrations

## Quick Start

### Prerequisites

- Node.js 18 or newer. Node 20 is recommended for local builds.
- npm 9 or newer.
- A Chromium browser when testing the Kleo extension sign-in flow.
- Access to any provider credentials needed for the workflow you are testing.

### Install

```bash
npm install
```

If you only need to inspect docs or run commands that do not execute dependency postinstall scripts, `npm install --ignore-scripts` can be useful in restricted local environments.

### Configure

Copy the example environment file and fill in the credentials you need:

```bash
cp .env.example .env
```

Vite only exposes variables prefixed with `VITE_`. The frontend reads those variables from [src/common/config.ts](src/common/config.ts).

Most screens can render without every provider key, but social linking, maps, wallet, upload, and third-party flows require the matching credentials.

### Run Locally

```bash
npm run dev
```

Vite starts the app at `http://localhost:5173` by default.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with host binding enabled. |
| `npm run build` | Type-check and build the production app into `dist/`. |
| `npm run serve` | Preview the production build on port `3000`. |
| `npm run lint` | Run ESLint against JavaScript and TypeScript sources. |
| `npm run test` | Run the Vitest test suite. |

## Project Structure

```text
.
|-- assets/                     # Repository-level README images and diagrams
|-- docs/                       # Project documentation for contributors
|-- src/
|   |-- App.tsx                 # Route table and session bootstrap
|   |-- main.tsx                # React root and BrowserRouter setup
|   |-- common/
|   |   |-- charts/             # Shared chart wrappers
|   |   |-- components/         # Shared UI such as Navbar, Alert, Accordion
|   |   |-- constants/          # Signup, browsing, URL, event, and site data
|   |   |-- hooks/              # API, wallet, debounce, and scroll helpers
|   |   |-- config.ts           # Environment variable mapping
|   |   `-- interface.ts        # Shared TypeScript interfaces
|   |-- pages/
|   |   |-- PrivacyPolicy/      # Privacy route
|   |   |-- profile/            # Dashboard, data quality, referrals, privacy
|   |   `-- signup/             # Extension-based onboarding and sign-in
|   `-- assets/                 # Fonts, icons, images, animations, CSS
|-- __tests__/                  # Vitest tests
|-- package.json                # npm scripts and dependencies
|-- tailwind.config.js          # Tailwind theme extensions and utilities
|-- tsconfig.json               # TypeScript configuration
`-- vite.config.ts              # Vite plugins, aliases, and env prefix
```

## Runtime Flow

The app uses `localStorage` for the current `token` and `address`.

1. `src/App.tsx` checks the stored token and routes users to `/signup/0` or `/profile/:address`.
2. `src/pages/signup/Onboarding/Authentication/index.tsx` checks for the Kleo extension on `window.kleoConnect` and calls `signIn()`.
3. On successful sign-in, the extension returns an address and token, which are stored locally before navigating to the profile route.
4. `src/pages/profile/index.tsx` validates the URL address against local storage and the extension-provided address before rendering the dashboard.
5. Dashboard components fetch profile, graph, referral, leaderboard, and upload data through `src/common/hooks/useFetch.ts`.

The API base URL is currently `https://fastapi.kleo.network/api/v1`.

## Documentation

- [Development Guide](docs/DEVELOPMENT.md)
- [Frontend Architecture](docs/FRONTEND_ARCHITECTURE.md)
- [.env.example](.env.example)

## Validation

Run the checks that match your change before opening a pull request:

```bash
npm run test -- --run
npm run build
npm run lint
```

For documentation-only changes, also run:

```bash
git diff --check
```

## Deployment

Kleo Connect builds as a static single-page app.

1. Configure the required `VITE_*` variables in your hosting provider.
2. Run `npm run build`.
3. Deploy the generated `dist/` directory.
4. Configure SPA fallback routing so direct visits to `/signup/0`, `/profile/:address`, and `/privacy` return `index.html`.

## Contributing

1. Branch from `production`.
2. Keep changes focused on one issue.
3. Follow the existing React, hook, route, and Tailwind patterns.
4. Add or update tests when behavior changes.
5. Run the relevant validation commands.
6. In the pull request, include the issue link, a summary of the change, and the commands you ran.

## License

This project is licensed under the terms in [LICENSE](LICENSE).
