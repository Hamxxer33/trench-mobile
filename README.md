# trench-mobile

**TRENCH** — Base-native B20 launchpad mobile app (Expo + TypeScript + Expo Router).

Android-first. Package / bundle: **`fun.trench.app`**.

> **V1–V1.2 is mock only** — no real Privy/CDP SDKs, no contract keys, no store secrets in git. Fake wallet connect + local mock launches / groups.

## Stack

- Expo (React Native) + TypeScript
- Expo Router (file-based navigation)
- Base-inspired **dark-only** theme (`theme/`) — glass shell · Base Blue `#0000FF`
- Mock data in `data/mocks/`
- EAS Build profiles in `eas.json` (credentials via EAS dashboard — not committed)

## Screens / routes

| Screen | Route | Description |
|--------|-------|-------------|
| Login | `/login` | Privy mock (Google / Apple / email) |
| Feed | `/(tabs)` | 2-col · Buy · members-first pin |
| Groups (was Live) | `/(tabs)/live` | list · create · thread |
| Create wizard | `/(tabs)/create` | 5-step + referrer + link group / notify |
| Portfolio | `/(tabs)/portfolio` | mock holdings |
| Wallet | `/(tabs)/wallet` | Privy session · fee chrome · Settings |
| Coin detail | `/coin/[id]` | pool · anti-snipe · trade · members-first |
| Create group | `/groups/new` | before/with token |
| Group thread | `/groups/[id]` | local message stub · invite |
| Invite join | `/g/[code]` | join preview (`trench.app/g/XXXX`) |
| Join alias | `/groups/join` | redirects to `/g/[code]` |
| Settings | `/settings` | links to legal |
| Terms | `/legal/terms` | store stub |
| Privacy | `/legal/privacy` | store stub |
| Risk | `/legal/risk` | crypto / launchpad risk |
| Licenses | `/legal/licenses` | OSS stub |

**Nav:** Feed · **Groups** · Create · Portfolio · Wallet

## Run

```bash
npm install
npm start          # Expo dev server
npm run android    # open Android
npm run ios        # iOS (macOS / Expo Go)
```

## EAS Build (Android preview)

Prereqs: Expo account, `npm i -g eas-cli`, logged in as the project owner.

```bash
# One-time: link EAS project (writes real projectId into app.json — do not invent secrets)
eas init

# Preview APK for closed testing / internal distro
eas build -p android --profile preview

# Production AAB for Play Console (closed testing track)
eas build -p android --profile production
```

### Play closed-test notes

1. Create app in Play Console with package **`fun.trench.app`**.
2. Upload the AAB from the `production` profile (or APK from `preview` for internal smoke).
3. Complete store listing + required legal URLs (Terms / Privacy) — in-app stubs live at `/legal/*`.
4. Use **internal** or **closed testing** track first; keep release as draft until review-ready.
5. **Credentials:** manage Android keystore & Play service account via `eas credentials` / EAS secrets. **Never commit** keystores, `google-services.json`, or `.env` secrets.

`eas.json` has no secrets — only profile shapes and placeholder env labels (`APP_ENV`).

## Quality

```bash
npm run lint
npm run typecheck
```

CI: `.github/workflows/ci.yml` runs lint + typecheck on push/PR.

## Structure

```
app/           # Expo Router screens
components/    # UI + WalletContext
data/mocks/    # Mock launches, groups, wallets, portfolio
theme/         # Colors, spacing, typography (dark-only)
eas.json       # preview / production build profiles
```

## Locked product chrome

- Glass shell · Base Blue `#0000FF` · pool / `% filled`
- 1% · v4 pool · anti-snipe 99%→1%/20s
- Privy login mock · fee chrome
- Groups V1.2 mocks (no real messaging / group-buy)

## Notes

- Do not commit secrets.
- Real chain / Privy / CDP wiring lives outside this repo.
- Figma locks: dark-only; first-buy on Create optional default **off**.
