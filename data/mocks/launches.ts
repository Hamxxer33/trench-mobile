export type LaunchStatus = 'new' | 'trending' | 'filling';

export type ChartPoint = {
  t: number;
  price: number;
};

export type MockLaunch = {
  id: string;
  name: string;
  symbol: string;
  description: string;
  creator: string;
  createdAt: string;
  status: LaunchStatus;
  marketCapEth: number;
  volume24hEth: number;
  holders: number;
  progressPct: number;
  priceEth: number;
  change24hPct: number;
  chart: ChartPoint[];
};

function buildChart(seed: number, points = 24): ChartPoint[] {
  const out: ChartPoint[] = [];
  let price = 0.00001 + (seed % 7) * 0.000002;
  for (let i = 0; i < points; i++) {
    const bump = Math.sin((i + seed) / 3) * 0.0000015 + (i / points) * 0.000008;
    price = Math.max(0.000001, price + bump);
    out.push({ t: i, price: Number(price.toFixed(8)) });
  }
  return out;
}

export const MOCK_LAUNCHES: MockLaunch[] = [
  {
    id: 'trench-ape',
    name: 'Trench Ape',
    symbol: 'TAPE',
    description: 'Apes digging deeper on Base. Mock launch for V1 UI.',
    creator: '0xA11CE0000000000000000000000000000000B0b',
    createdAt: '2026-09-09T08:12:00Z',
    status: 'trending',
    marketCapEth: 42.8,
    volume24hEth: 11.2,
    holders: 318,
    progressPct: 68,
    priceEth: 0.000042,
    change24hPct: 24.5,
    chart: buildChart(3),
  },
  {
    id: 'blue-digger',
    name: 'Blue Digger',
    symbol: 'DIG',
    description: 'Base-native shovel economy. Purely mock data.',
    creator: '0xD166E00000000000000000000000000000000001',
    createdAt: '2026-09-09T10:45:00Z',
    status: 'new',
    marketCapEth: 8.4,
    volume24hEth: 2.1,
    holders: 87,
    progressPct: 22,
    priceEth: 0.000018,
    change24hPct: 8.1,
    chart: buildChart(5),
  },
  {
    id: 'b20-rocket',
    name: 'B20 Rocket',
    symbol: 'B20R',
    description: 'One-sided Uniswap v4 LP memetics on Base. No real contracts yet.',
    creator: '0xB20C0000000000000000000000000000000000FF',
    createdAt: '2026-09-08T21:00:00Z',
    status: 'filling',
    marketCapEth: 91.0,
    volume24hEth: 34.6,
    holders: 1204,
    progressPct: 94,
    priceEth: 0.000091,
    change24hPct: -3.2,
    chart: buildChart(11),
  },
  {
    id: 'gasless-goblin',
    name: 'Gasless Goblin',
    symbol: 'GOB',
    description: 'Mock goblin coin for feed polish.',
    creator: '0x60B000000000000000000000000000000000001',
    createdAt: '2026-09-09T12:01:00Z',
    status: 'new',
    marketCapEth: 3.2,
    volume24hEth: 0.9,
    holders: 41,
    progressPct: 9,
    priceEth: 0.000009,
    change24hPct: 41.0,
    chart: buildChart(2),
  },
  {
    id: 'trenchcoat',
    name: 'Trenchcoat',
    symbol: 'COAT',
    description: 'Layer up before you launch. Mock only.',
    creator: '0xC0A70000000000000000000000000000000001',
    createdAt: '2026-09-07T16:30:00Z',
    status: 'trending',
    marketCapEth: 27.5,
    volume24hEth: 6.4,
    holders: 256,
    progressPct: 51,
    priceEth: 0.000031,
    change24hPct: 12.7,
    chart: buildChart(8),
  },
  {
    id: 'basecamp',
    name: 'Basecamp',
    symbol: 'CAMP',
    description: 'Camp at the pool. Demo token for Trench mobile.',
    creator: '0xCAFE0000000000000000000000000000000001',
    createdAt: '2026-09-06T09:00:00Z',
    status: 'trending',
    marketCapEth: 55.1,
    volume24hEth: 15.0,
    holders: 640,
    progressPct: 77,
    priceEth: 0.000055,
    change24hPct: -1.4,
    chart: buildChart(13),
  },
];

export function getLaunchById(id: string): MockLaunch | undefined {
  return MOCK_LAUNCHES.find((l) => l.id === id);
}

export function getTrending(): MockLaunch[] {
  return MOCK_LAUNCHES.filter((l) => l.status === 'trending' || l.status === 'filling');
}

export function getNew(): MockLaunch[] {
  return [...MOCK_LAUNCHES].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
