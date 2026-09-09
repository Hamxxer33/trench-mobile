import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWallet } from '@/components/WalletContext';
import { shortenAddress } from '@/data/mocks/wallet';
import { colors, radius, spacing, typography } from '@/theme';

export default function WalletScreen() {
  const { wallet, connecting, connect, disconnect } = useWallet();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>Wallet</Text>
        <Text style={styles.subtitle}>
          Sign in with Base stub — no WalletConnect / wagmi / real chain.
        </Text>

        {wallet ? (
          <View style={styles.card}>
            <Text style={styles.badge}>Signed in with Base (mock)</Text>
            <Text style={styles.label}>{wallet.label}</Text>
            <Text style={styles.address}>{shortenAddress(wallet.address)}</Text>
            <Text style={styles.balance}>{wallet.balanceEth} ETH</Text>
            <Pressable
              onPress={disconnect}
              style={({ pressed }) => [styles.secondary, pressed && { opacity: 0.85 }]}>
              <Text style={styles.secondaryText}>Disconnect</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.card}>
            <Text style={styles.empty}>Not connected</Text>
            <Text style={styles.hint}>
              Sign in with Base to unlock mock buy/sell & launch. Fake connect only.
            </Text>
            <Pressable
              disabled={connecting}
              onPress={() => connect()}
              accessibilityRole="button"
              accessibilityLabel="Sign in with Base"
              style={({ pressed }) => [
                styles.primary,
                pressed && { opacity: 0.85 },
                connecting && { opacity: 0.6 },
              ]}>
              {connecting ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.primaryText}>Sign in with Base</Text>
              )}
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  title: { ...typography.title, color: colors.text },
  subtitle: { color: colors.textMuted, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.baseBlueDark,
    color: colors.white,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  label: { color: colors.text, fontSize: 18, fontWeight: '600' },
  address: { color: colors.baseBlueLight, fontFamily: 'SpaceMono', fontSize: 14 },
  balance: { color: colors.textSecondary, fontSize: 16, marginVertical: spacing.sm },
  empty: { color: colors.text, fontSize: 18, fontWeight: '600' },
  hint: { color: colors.textMuted, marginBottom: spacing.md },
  primary: {
    backgroundColor: colors.baseBlue,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  primaryText: { color: colors.white, fontWeight: '700' },
  secondary: {
    marginTop: spacing.md,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  secondaryText: { color: colors.text, fontWeight: '600' },
});
