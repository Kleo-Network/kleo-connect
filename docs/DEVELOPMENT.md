# Development Guide

This guide covers local setup, validation, and release checks for Kleo Connect.

## Local Setup

1. Install Node.js 18 or newer. Node 20 is recommended.
2. Install npm dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

4. Fill in the provider credentials required for the flow you are testing.
5. Start Vite:

   ```bash
   npm run dev
   ```

## Environment Variables

The environment variables are mapped in `src/common/config.ts`.

| Variable | Used for |
| --- | --- |
| `VITE_GOOGLE_OAUTH_CLIENT_ID` | Google OAuth client id. |
| `VITE_GOOGLE_OAUTH_CLIENT_SECRET` | Google OAuth client secret. |
| `VITE_CALENDLY_INTEGRATION_API_KEY` | Calendly API integration key. |
| `VITE_CALENDLY_CLIENT_SECRET` | Calendly OAuth client secret. |
| `VITE_CALENDLY_WEBHOOK_SIGNING_KEY` | Calendly webhook signature validation. |
| `VITE_INSTAGRAM_APPLICATION_ID` | Instagram application id. |
| `VITE_INSTAGRAM_APP_SECRET` | Instagram app secret. |
| `VITE_LINKEDIN_APPLICATION_ID` | LinkedIn application id. |
| `VITE_LINKEDIN_APPLICATION_SECRET` | LinkedIn application secret. |
| `VITE_TWITTER_APPLICATION_ID` | Twitter application id. |
| `VITE_TWITTER_KEY` | Twitter API key. |
| `VITE_TWITTER_SECRET` | Twitter API secret. |
| `VITE_TWITTER_CLIENT_ID` | Twitter OAuth client id. |
| `VITE_GITHUB_CLIENTID` | GitHub OAuth client id. |
| `VITE_GOOGLE_MAP_KEY` | Google Maps browser API key. |
| `VITE_RPC_URL` | RPC endpoint used by Irys and wallet-related flows. |
| `VITE_REDIRECTED_URL` | Redirect URL used by connection flows. |
| `VITE_KLEO_THIRDWEB_CLIENT_KEY` | Thirdweb client key. |
| `VITE_KLEO_THIRDWEB_SECRET` | Thirdweb secret. |
| `VITE_UPLOAD_API_DOMAIN` | Decentralized upload API host. |

Do not commit `.env` files. Commit only safe examples such as `.env.example`.

## Common Development Tasks

### Add a Dashboard Component

1. Add the component under `src/pages/profile/components/`.
2. Keep API calls in a hook or colocated effect using `useFetch`.
3. Add any shared types to `src/common/interface.ts` or keep local types near the component if they are not reused.
4. Add route-level composition in `src/pages/profile/index.tsx`.
5. Validate the responsive layout at desktop and narrower widths.

### Add a Shared Hook

1. Place the hook under `src/common/hooks/`.
2. Keep browser globals such as `window.kleoConnect`, `window.solana`, and `localStorage` guarded so rendering does not fail before those APIs exist.
3. Return explicit loading, success, and error state where the UI needs it.

### Add Provider Configuration

1. Add the variable to `.env.example`.
2. Map it in `src/common/config.ts`.
3. Document the variable in this file.
4. Avoid hard-coding secrets in source files.

## Validation Commands

Use these checks before submitting behavior changes:

```bash
npm run test -- --run
npm run build
npm run lint
```

For documentation-only work, run:

```bash
git diff --check
```

## Manual QA Checklist

- `/` redirects to `/signup/0` when no token is stored.
- `/signup/0` shows the extension install/sign-in flow.
- The sign-in button is disabled until `window.kleoConnect` is detected.
- A successful extension sign-in stores `address` and `token`.
- `/profile/:address` redirects back to signup if the URL, local storage, and extension addresses do not match.
- The profile dashboard renders points, data quality, milestones, referrals, leaderboard, privacy, and banner sections when API data is available.
- The referral copy button writes the referral URL to the clipboard.
- The activity share flow uploads the chart image and opens a Twitter intent.

## Deployment Checklist

- Run `npm run build` and confirm `dist/` is generated.
- Configure all required `VITE_*` variables in the hosting provider.
- Serve the app with an SPA fallback to `index.html`.
- Confirm direct visits to `/signup/0`, `/profile/:address`, and `/privacy`.
- Confirm static assets load from the configured deployment base path.
