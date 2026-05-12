# Kleo Connect

Kleo Connect is a React frontend for onboarding users into the Kleo ecosystem, connecting social and wallet identities, and giving users a profile dashboard where they can review activity, privacy, referrals, rewards, and personal data.

The app is built with Vite, React 18, TypeScript, React Router, Tailwind CSS, and Vitest.

![Kleo Connect dashboard](assets/Dashboard.png)

## Features

- Multi-step signup and onboarding flow
- Profile pages with user data, privacy, referrals, leaderboard, and rewards views
- Social and wallet connection support
- Google Maps, charts, calendar heatmaps, and dashboard visualizations
- Local development with Vite and TypeScript

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Vitest
- ESLint and Prettier
- Husky and Commitlint

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer

### Installation

```bash
git clone https://github.com/Kleo-Network/kleo-connect.git
cd kleo-connect
npm install
```

### Environment Variables

Create a local environment file from the example:

```bash
cp .env.example .env
```

Fill in the values required for the integrations you are testing. The app reads the following Vite variables:

| Variable | Purpose |
| --- | --- |
| `VITE_GOOGLE_OAUTH_CLIENT_ID` | Google OAuth client ID |
| `VITE_GOOGLE_OAUTH_CLIENT_SECRET` | Google OAuth client secret |
| `VITE_CALENDLY_INTEGRATION_API_KEY` | Calendly API key |
| `VITE_CALENDLY_CLIENT_SECRET` | Calendly client secret |
| `VITE_CALENDLY_WEBHOOK_SIGNING_KEY` | Calendly webhook signing key |
| `VITE_INSTAGRAM_APPLICATION_ID` | Instagram app ID |
| `VITE_INSTAGRAM_APP_SECRET` | Instagram app secret |
| `VITE_LINKEDIN_APPLICATION_ID` | LinkedIn app ID |
| `VITE_LINKEDIN_APPLICATION_SECRET` | LinkedIn app secret |
| `VITE_TWITTER_APPLICATION_ID` | X/Twitter app ID |
| `VITE_TWITTER_KEY` | X/Twitter API key |
| `VITE_TWITTER_SECRET` | X/Twitter API secret |
| `VITE_TWITTER_CLIENT_ID` | X/Twitter client ID |
| `VITE_GITHUB_CLIENTID` | GitHub OAuth client ID |
| `VITE_GOOGLE_MAP_KEY` | Google Maps API key |
| `VITE_RPC_URL` | RPC URL used by wallet/upload integrations |
| `VITE_REDIRECTED_URL` | OAuth redirect URL |
| `VITE_KLEO_THIRDWEB_CLIENT_KEY` | Thirdweb client key |
| `VITE_KLEO_THIRDWEB_SECRET` | Thirdweb secret |
| `VITE_UPLOAD_API_DOMAIN` | Decentralized upload API host |

Leave unused values blank when working on UI-only changes.

### Run Locally

```bash
npm run dev
```

Vite starts the app at the local URL printed in your terminal, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build in `dist/`.

```bash
npm run serve
```

Previews the production build locally on port `3000`.

```bash
npm run lint
```

Runs ESLint across JavaScript, TypeScript, and TSX files.

```bash
npm run test
```

Runs the Vitest test suite.

## Project Structure

```text
kleo-connect/
|-- assets/                 # README and product screenshots
|-- src/
|   |-- assets/             # App images, icons, animations, and fonts
|   |-- common/
|   |   |-- charts/         # Shared chart components
|   |   |-- components/     # Shared UI components
|   |   |-- constants/      # Static data used by onboarding and profile views
|   |   |-- hooks/          # Shared React hooks
|   |   |-- config.ts       # Environment variable mapping
|   |   |-- interface.ts    # Shared TypeScript interfaces
|   |   `-- utils.ts        # Shared utility functions
|   |-- pages/
|   |   |-- PrivacyPolicy/  # Privacy policy route
|   |   |-- profile/        # Profile, data, privacy, referral, and reward views
|   |   `-- signup/         # Signup and onboarding flow
|   |-- App.tsx             # Route configuration and user bootstrap
|   |-- main.tsx            # React application entry point
|   `-- index.css           # Global styles and Tailwind imports
|-- package.json            # Scripts and dependencies
|-- tailwind.config.js      # Tailwind configuration
|-- tsconfig.json           # TypeScript configuration
`-- vite.config.ts          # Vite configuration
```

## Application Flow

`src/App.tsx` owns the top-level routes and checks local storage for an auth token. Users without a token are redirected to `/signup/0`. Logged-in users are routed to their profile page at `/profile/:address`, and authenticated users can also access `my-data/:address`.

The signup flow lives in `src/pages/signup`, while the profile dashboard and related subviews live in `src/pages/profile`.

## Development Notes

- Keep shared UI in `src/common/components`.
- Keep reusable data-fetching and browser behavior in `src/common/hooks`.
- Add new route-level screens under `src/pages`.
- Prefer typed interfaces in `src/common/interface.ts` or close to the component that owns the data shape.
- Use Tailwind utility classes for layout and styling unless a component already has a local stylesheet.
- Do not commit real API keys, wallet keys, OAuth secrets, or `.env` files.

## Testing and Quality Checks

Before opening a pull request, run:

```bash
npm run lint
npm run test
npm run build
```

For UI changes, also start the app with `npm run dev` and manually check the affected route in a browser.

## Deployment

This is a Vite single-page app. A production deployment should:

1. Install dependencies with `npm install`.
2. Build the static assets with `npm run build`.
3. Serve the generated `dist/` directory from the hosting provider.

Make sure production environment variables are configured in the hosting platform before deploying.

## Contributing

1. Fork the repository and create a focused branch.
2. Make the smallest change that fully solves the issue.
3. Run lint, tests, and build checks before opening a pull request.
4. Include screenshots or a short recording for visible UI changes.
5. Link the relevant issue in the pull request description.

Please follow Conventional Commits for commit messages, for example:

```text
docs: improve project README
feat: add profile privacy setting
fix: handle missing auth token
```

## License

This project is licensed under the terms in [LICENSE](LICENSE).
