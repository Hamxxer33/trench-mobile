import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { MOCK_WALLETS, type MockWallet } from '@/data/mocks/wallet';

type WalletContextValue = {
  wallet: MockWallet | null;
  connecting: boolean;
  connect: (walletId?: string) => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<MockWallet | null>(null);
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async (walletId?: string) => {
    setConnecting(true);
    // Simulate async Privy / wallet connect — mock only
    await new Promise((r) => setTimeout(r, 600));
    const next =
      MOCK_WALLETS.find((w) => w.id === walletId) ?? MOCK_WALLETS[0];
    setWallet(next);
    setConnecting(false);
  }, []);

  const disconnect = useCallback(() => {
    setWallet(null);
  }, []);

  const value = useMemo(
    () => ({ wallet, connecting, connect, disconnect }),
    [wallet, connecting, connect, disconnect],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return ctx;
}
