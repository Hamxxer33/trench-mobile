# trench-mobile

**TRENCH** — Base-native B20 launchpad mobile app (Expo + TypeScript + Expo Router).

Android-first. iOS project files are fine in-repo, but distribution is **off-store** until Android proves out.

> **V1 is mock only** — no contracts, no wagmi/viem/ethers/WalletConnect. Fake wallet connect + local mock launches.

## Stack

- Expo (React Native) + TypeScript
- Expo Router (file-based navigation)
- Base-inspired **dark-only** theme (`theme/`) — no light mode
- Mock data in `data/mocks/`

## Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Home feed | `/(tabs)` | New / trending mock launches |
| Live | `/(tabs)/live` | Stub placeholder (no livestream) |
| Create wizard | `/(tabs)/create` | Multi-step create; **first-buy optional, default off** |
| Portfolio | `/(tabs)/portfolio` | Light stub — mock holdings / empty state |
| Wallet stub | `/(tabs)/wallet` | Fake connect / disconnect |
| Coin detail | `/coin/[id]` | Bonding curve chart + mock buy/sell |

**Nav:** Feed · Live · Create · Portfolio · Wallet

## Run

```bash
npm install
npm start          # Expo dev server
npm run android    # open Android
npm run ios        # iOS (macOS / Expo Go)
```

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
data/mocks/    # Mock launches, wallets, portfolio
theme/         # Colors, spacing, typography (dark-only)
```

## Notes

- Do not commit secrets.
- Real chain wiring lives outside this repo (contracts / web).
- Figma locks: dark-only app; first-buy on Create is optional and defaults **off**.
