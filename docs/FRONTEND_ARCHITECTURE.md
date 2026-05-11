# Frontend Architecture

Kleo Connect is a Vite single-page app. The core application state is small: authentication data is stored in browser local storage, and page data is fetched from the Kleo API as each dashboard section mounts.

## Entry Points

| File | Role |
| --- | --- |
| `src/main.tsx` | Mounts the React app and wraps it in `BrowserRouter`. |
| `src/App.tsx` | Checks stored session state and defines the route table. |
| `src/index.css` | Loads global styles, Tailwind layers, fonts, and base CSS. |
| `vite.config.ts` | Enables React, SVG React components, and Node polyfills needed by Web3 packages. |

## Routes

| Route | Component | Purpose |
| --- | --- | --- |
| `/` | `Navigate` from `App.tsx` | Sends signed-in users to profile and unsigned users to signup. |
| `/signup/:step` | `src/pages/signup` | Runs the extension-based onboarding flow. |
| `/profile/:address` | `src/pages/profile` | Renders the user dashboard after address validation. |
| `/privacy` | `src/pages/PrivacyPolicy/PrivacyPolicy.tsx` | Shows privacy policy content. |
| `/my-data/:address` | `MyData` | Shows data details for signed-in users. |

## Authentication and Session Flow

The active signup route uses `src/pages/signup/Onboarding/Authentication`.

1. The component checks for `window.kleoConnect`.
2. If the extension is missing, it links users to the Chrome Web Store listing.
3. If the extension exists, clicking Sign In calls `window.signIn()`.
4. The returned `address` and `token` are stored in `localStorage`.
5. The app navigates to `/profile/:address`.

`src/pages/profile/index.tsx` performs an additional guard before rendering the dashboard. It compares:

- the `:address` route parameter,
- the address stored in `localStorage`,
- the address returned by the extension sign-in method.

If those values do not match, the user is sent back to `/signup/0`.

## API Access

`src/common/hooks/useFetch.ts` is the shared fetch wrapper. It:

- prefixes requests with `https://fastapi.kleo.network/api/v1`,
- reads the stored token from `localStorage`,
- attaches the token as an `Authorization` header,
- exposes `data`, `status`, `error`, and `fetchData`,
- aborts an in-flight request before starting a manually triggered one.

Important frontend endpoints include:

| Endpoint | Used by | Purpose |
| --- | --- | --- |
| `user/get-user/{address}` | `App.tsx`, profile page | Fetch user profile metadata and dashboard values. |
| `user/get-user-graph/{address}` | Profile page | Fetch activity labels and percentages for the data-quality chart. |
| `user/upload_activity_chart` | Profile page | Upload a chart snapshot before opening the Twitter share intent. |
| `user/referrals/{address}` | `Referrals` | Fetch referral rows for the current user. |
| `user/top-users?limit=20&address={address}` | `Leaderboard` | Fetch leaderboard rows and the user's relative rank. |
| `auth/create_jwt_authentication` | Legacy onboarding component | Authenticate a signed Phantom wallet message. |

## Dashboard Composition

The profile page composes these main sections:

- `PointsAndData` formats Kleo XP and total data quantity.
- `DataQuality` renders the radar chart and data-quality percentage.
- `Milestones` renders progress milestones and exposes the share action.
- `Snapshot` displays the user's current profile snapshot.
- `Referrals` renders the referral link and referral table.
- `Leaderboard` loads top users and reports the highest Kleo point value back to the profile page for data-quality percentage calculations.
- `Privacy` displays privacy-related counters.
- `LeaderBoardBanner` renders the leaderboard callout banner.

The profile page has separate layout branches for extra-large screens and smaller screens. Keep both branches in sync when adding dashboard cards.

## Configuration

Provider configuration is centralized in `src/common/config.ts`. Add new provider keys there, then document the matching `VITE_*` variable in `.env.example` and `docs/DEVELOPMENT.md`.

## Assets and Styling

- Tailwind content scanning is configured in `tailwind.config.js`.
- Shared colors, fonts, shadows, and scrollbar utilities live in the Tailwind theme extension.
- SVG imports use `vite-plugin-svgr`, which allows imports such as `import { ReactComponent as Icon } from './icon.svg'`.
- Images, SVGs, JSON animations, fonts, and stylesheet fragments are stored under `src/assets/`.

## Legacy and Alternate Flows

The repository still contains older Phantom and Particle wallet helpers under `src/pages/signup/Onboarding/` and `src/pages/signup/Onboarding/Particle/`. Those files are useful references for wallet integration behavior, but the current signup route imports `src/pages/signup/Onboarding/Authentication`.

When modifying authentication, verify which onboarding component is mounted before changing wallet-specific behavior.
