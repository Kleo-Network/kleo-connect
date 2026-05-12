# Kleo Connect

Kleo Connect is a React frontend for onboarding users into the Kleo profile experience, connecting social accounts, collecting profile metadata, and showing profile progress, referrals, milestones, privacy controls, and data-quality views.

The app is built with Vite, React 18, TypeScript, Tailwind CSS, React Router, Web3 integrations, social OAuth helpers, and visualization libraries such as D3, Chart.js, and Recharts.

## Tech Stack

- React 18 with TypeScript
- Vite 4 for local development and production builds
- Tailwind CSS 3 for styling
- React Router 6 for route management
- Vitest for tests
- Web3, Irys, Helia, and wallet/social provider integrations

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

   If `.env.example` is not present in your checkout, create `.env.local` and add only the provider keys you need for the workflow you are testing.

3. Start the development server:

   ```bash
   npm run dev
   ```

Vite prints the local URL after startup. The app redirects unauthenticated users into the signup flow.

## Environment Variables

The app reads provider configuration through `import.meta.env` in `src/common/config.ts`.

Common variables include:

```text
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

Only expose values with the `VITE_` prefix when they are safe to ship to the browser. Do not commit `.env.local` or production secrets.

## Project Structure

```text
src/
  App.tsx                         # top-level route definitions and auth redirect logic
  main.tsx                        # React app entrypoint
  common/
    config.ts                     # environment-backed provider config
    hooks/                        # shared hooks such as useFetch
    constants/                    # shared app constants and seed data
  pages/
    signup/                       # onboarding and account-connection flow
    profile/                      # profile dashboard, referrals, milestones, privacy, data views
    PrivacyPolicy/                # privacy policy page
  assets/                         # images, fonts, SVGs, dashboard assets
  index.css                       # global Tailwind entry
__tests__/                        # Vitest tests
assets/                           # README/demo screenshots and design assets
```

## App Routes

- `/` redirects users based on whether a token-backed profile exists.
- `/signup/:step` renders the signup/onboarding flow.
- `/profile/:address` renders the profile dashboard.
- `/my-data/:address` renders data details for logged-in users.
- `/privacy` renders the privacy policy.

## Development Commands

```bash
npm run dev      # start Vite dev server
npm run build    # create production build
npm run serve    # preview production build on port 3000
npm run lint     # run ESLint
npm run test     # run Vitest
```

## Testing

Run the test suite with:

```bash
npm run test -- --run
```

Use `-- --run` in CI or one-off verification so Vitest exits instead of entering watch mode.

## Build And Deployment

Create a production build:

```bash
npm run build
```

The compiled app is written to `dist/` and can be deployed to any static hosting platform that supports single-page apps. Configure your host to route unknown paths back to `index.html` so React Router can handle client-side routes.

## Contribution Guidelines

1. Keep feature code close to its route or profile/signup component group.
2. Add shared utilities under `src/common/` only when they are reused by more than one feature area.
3. Keep provider keys and OAuth credentials in environment variables.
4. Run `npm run test -- --run` and `npm run build` before opening a PR.
5. For UI changes, include a short before/after note or screenshot in the PR description.

## Troubleshooting

- If provider login fails, confirm the matching `VITE_*` value is present and allowed for the current redirect URL.
- If routes 404 after deployment, configure static hosting fallback to `index.html`.
- If tests hang locally, run `npm run test -- --run` instead of plain `npm run test`.
- If wallet or upload flows fail, verify `VITE_RPC_URL`, `VITE_KLEO_THIRDWEB_CLIENT_KEY`, and `VITE_UPLOAD_API_DOMAIN`.
