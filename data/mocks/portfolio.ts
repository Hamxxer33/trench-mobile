import { getLaunchById, type MockLaunch } from './launches';

/** Fake holdings for Portfolio light stub — no chain. */
export type MockHolding = {
  launchId: string;
  qty: number;
  valueEth: number;
  change24hPct: number;
};

export const MOCK_HOLDINGS: MockHolding[] = [
  { launchId: 'trench-ape', qty: 12500, valueEth: 0.525, change24hPct: 24.5 },
  { launchId: 'trenchcoat', qty: 4200, valueEth: 0.13, change24hPct: 12.7 },
  { launchId: 'basecamp', qty: 800, valueEth: 0.044, change24hPct: -1.4 },
];

export type HoldingRow = MockHolding & { launch: MockLaunch };

export function getMockHoldings(): HoldingRow[] {
  return MOCK_HOLDINGS.flatMap((h) => {
    const launch = getLaunchById(h.launchId);
    if (!launch) return [];
    return [{ ...h, launch }];
  });
}
