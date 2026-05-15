# Kleo Connect

Kleo Connect is a React frontend for creating and managing a user-owned Kleo profile. The app guides a user through signup, wallet/social account connection, profile setup, data-card creation, rewards, privacy controls, and dashboard views.

The project is built with Vite, React 18, TypeScript, Tailwind CSS, React Router, Web3 wallet libraries, map/chart UI packages, and Vitest.

## Tech stack

- React 18 + React DOM
- TypeScript 4.9
- Vite 4
- Tailwind CSS 3
- React Router 6
- Vitest for tests
- ESLint + Prettier + Husky + commitlint
- Web3 integrations: Web3.js, MetaMask provider detection, Irys SDK, Helia/IPFS-related packages
- UI/data libraries: D3, Chart.js, Recharts, Leaflet, React Google Maps, dnd-kit

## Repository structure

```text
.
├── assets/                 # Static documentation/demo assets
├── src/
│   ├── App.tsx             # Route definitions and top-level auth/profile flow
│   ├── main.tsx            # React app entrypoint
│   ├── App.css             # Global app styles
│   ├── assets/             # Images, fonts, SVGs, animation files used by UI
│   ├── common/             # Shared config, constants, hooks, interfaces, utilities
│   └── pages/              # Route-level pages: signup, profile, privacy policy
├── __tests__/              # Vitest tests
├── index.html              # Vite HTML shell
├── package.json            # Scripts and dependencies
├── tailwind.config.js      # Tailwind theme and plugin config
├── vite.config.ts          # Vite build/test configuration and polyfills
└── tsconfig.json           # TypeScript configuration
```

## Prerequisites

- Node.js 18.x or newer
- npm 9.x or newer
- A browser wallet such as MetaMask for wallet-dependent flows

## Environment variables

Copy the example file before running locally:

```bash
cp .env.example .env
```

Fill in the values required for the backend/API and third-party integrations used by your environment. Keep secrets out of git.

## Local setup

Install dependencies:

```bash
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Vite prints the local URL in the terminal. The default is usually `http://localhost:5173`.

## Available scripts

```bash
npm run dev      # Start local development server
npm run build    # Create a production build in dist/
npm run serve    # Preview the production build on port 3000
npm run lint     # Run ESLint over TS/TSX/JS files
npm run test     # Run Vitest
```

## Build and preview

```bash
npm run build
npm run serve
```

The preview server runs the compiled Vite output and is useful for checking routing, static assets, and production-only build issues before deployment.

## Testing

Run the test suite with:

```bash
npm run test
```

Tests live in `__tests__/` and use Vitest. Add tests for shared utilities, hooks, and route-level behavior when changing core flows.

## Linting and formatting

Run linting before opening a pull request:

```bash
npm run lint
```

Formatting is handled by Prettier. Commit messages are expected to follow Conventional Commits because the repo includes commitlint and Husky hooks.

Examples:

```text
feat: add profile reward card
fix: handle missing wallet address
docs: document local setup
```

## Key application flows

- `/` checks the local auth/profile state and redirects to signup or profile.
- `/signup/:step` renders the multi-step signup flow.
- `/profile/:address` renders a public/user profile.
- `/my-data/:address` is available when the user is logged in.
- `/privacy` renders the privacy policy.

`src/App.tsx` owns the top-level route wiring and initial user state. Shared request/config logic lives under `src/common/`.

## Contribution guidelines

1. Create a focused branch for each change.
2. Run `npm install` after pulling dependency changes.
3. Keep route-level code in `src/pages/` and reusable logic in `src/common/`.
4. Prefer typed interfaces for data passed between components and API hooks.
5. Do not commit `.env`, API keys, wallet private keys, or generated build output.
6. Run `npm run lint` and `npm run test` before opening a pull request.
7. Use Conventional Commits for commit messages.

## Deployment notes

This is a Vite single-page app. A typical deployment runs:

```bash
npm install
npm run build
```

Then serve the generated `dist/` directory with static hosting. Configure the host to route unknown paths back to `index.html` so React Router pages work on refresh.

## License

This project is licensed under the terms in [LICENSE](LICENSE).
