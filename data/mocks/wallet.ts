/** Fake wallet identities for the connect stub — no real chain. */
export const MOCK_WALLETS = [
  {
    id: 'mock-1',
    label: 'Demo Wallet',
    address: '0xTr3nch0000000000000000000000000000DeM0',
    balanceEth: 1.25,
  },
  {
    id: 'mock-2',
    label: 'Paper Trader',
    address: '0xP4p3r00000000000000000000000000000001',
    balanceEth: 0.42,
  },
] as const;

export type MockWallet = (typeof MOCK_WALLETS)[number];

export function shortenAddress(address: string): string {
  if (address.length < 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}
