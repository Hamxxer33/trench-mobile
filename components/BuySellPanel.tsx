import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useWallet } from '@/components/WalletContext';
import { colors, radius, spacing } from '@/theme';

type Mode = 'buy' | 'sell';

type Props = {
  symbol: string;
  priceEth: number;
};

export function BuySellPanel({ symbol, priceEth }: Props) {
  const { wallet } = useWallet();
  const [mode, setMode] = useState<Mode>('buy');
  const [amount, setAmount] = useState('0.01');

  const onSubmit = () => {
    if (!wallet) {
      Alert.alert('Wallet required', 'Connect a mock wallet from the Wallet tab first.');
      return;
    }
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      Alert.alert('Invalid amount', 'Enter a positive ETH amount.');
      return;
    }
    const tokens = value / priceEth;
    Alert.alert(
      `Mock ${mode === 'buy' ? 'Buy' : 'Sell'}`,
      `${mode === 'buy' ? 'Bought' : 'Sold'} ~${tokens.toFixed(2)} ${symbol} for ${value} ETH.\n\nNo on-chain tx — V1 mock only.`,
    );
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.tabs}>
        <Pressable
          onPress={() => setMode('buy')}
          style={[styles.tab, mode === 'buy' && styles.tabBuyActive]}>
          <Text style={[styles.tabText, mode === 'buy' && styles.tabTextActive]}>Buy</Text>
        </Pressable>
        <Pressable
          onPress={() => setMode('sell')}
          style={[styles.tab, mode === 'sell' && styles.tabSellActive]}>
          <Text style={[styles.tabText, mode === 'sell' && styles.tabTextActive]}>Sell</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Amount (ETH)</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        placeholder="0.01"
        placeholderTextColor={colors.textMuted}
      />
      <Text style={styles.hint}>
        Price ≈ {priceEth.toFixed(8)} ETH · {wallet ? `Bal ${wallet.balanceEth} ETH` : 'Not connected'}
      </Text>

      <Pressable
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.cta,
          mode === 'buy' ? styles.ctaBuy : styles.ctaSell,
          pressed && { opacity: 0.85 },
        ]}>
        <Text style={styles.ctaText}>
          {mode === 'buy' ? `Buy ${symbol}` : `Sell ${symbol}`} (mock)
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  tabs: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.sm },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
  },
  tabBuyActive: { backgroundColor: colors.baseBlue },
  tabSellActive: { backgroundColor: colors.danger },
  tabText: { color: colors.textSecondary, fontWeight: '600' },
  tabTextActive: { color: colors.white },
  label: { color: colors.textSecondary, fontSize: 13 },
  input: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
  },
  hint: { color: colors.textMuted, fontSize: 12 },
  cta: {
    marginTop: spacing.sm,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  ctaBuy: { backgroundColor: colors.baseBlue },
  ctaSell: { backgroundColor: colors.danger },
  ctaText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
