import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BuiltOnBaseFooter, TrenchBaseLockup } from '@/components/TrenchBaseLockup';
import { FeeSplitChrome } from '@/components/FeeSplitChrome';
import { GlassSurface } from '@/components/GlassSurface';
import { useWallet } from '@/components/WalletContext';
import { shortenAddress } from '@/data/mocks/wallet';
import { colors, radius, spacing, tabBar, typography } from '@/theme';

export default function WalletScreen() {
  const { wallet, disconnect } = useWallet();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <TrenchBaseLockup size="sm" style={styles.lockup} />
        <Text style={styles.title}>Wallet</Text>
        <Text style={styles.subtitle}>
          Privy session (mock) · fee chrome placeholders · no chain.
        </Text>

        {wallet ? (
          <GlassSurface intensity={48} borderRadius={radius.xl} contentStyle={styles.card}>
            <Text style={styles.badge}>Signed in via Privy (mock)</Text>
            <Text style={styles.label}>{wallet.label}</Text>
            <Text style={styles.address}>{shortenAddress(wallet.address)}</Text>
            <Text style={styles.balance}>{wallet.balanceEth} ETH</Text>
            <Pressable
              onPress={disconnect}
              accessibilityRole="button"
              accessibilityLabel="Disconnect"
              style={({ pressed }) => [styles.secondary, pressed && { opacity: 0.85 }]}>
              <Text style={styles.secondaryText}>Disconnect</Text>
            </Pressable>
          </GlassSurface>
        ) : (
          <GlassSurface intensity={48} borderRadius={radius.xl} contentStyle={styles.card}>
            <Text style={styles.empty}>Not signed in</Text>
            <Text style={styles.hint}>
              AuthGate will send you to login. Mock Privy only.
            </Text>
          </GlassSurface>
        )}

        <FeeSplitChrome style={styles.fee} />

        <GlassSurface intensity={40} borderRadius={radius.lg} contentStyle={styles.settingsCard}>
          <Text style={styles.settingsTitle}>Settings & legal</Text>
          <Text style={styles.hint}>Terms · Privacy · Risk · Licenses</Text>
          <Pressable
            onPress={() => router.push('/settings')}
            accessibilityRole="button"
            accessibilityLabel="Open settings"
            style={({ pressed }) => [styles.settingsBtn, pressed && { opacity: 0.85 }]}>
            <Text style={styles.settingsBtnText}>Open settings</Text>
          </Pressable>
        </GlassSurface>

        <BuiltOnBaseFooter style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  scroll: {
    padding: spacing.lg,
    paddingBottom: tabBar.contentInset,
    gap: spacing.md,
  },
  lockup: { marginBottom: spacing.xs },
  title: { ...typography.title, color: colors.text },
  subtitle: { color: colors.textMuted, marginBottom: spacing.sm },
  card: {
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
  hint: { color: colors.textMuted },
  secondary: {
    marginTop: spacing.md,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    alignItems: 'center',
  },
  secondaryText: { color: colors.text, fontWeight: '600' },
  fee: { marginTop: spacing.xs },
  settingsCard: { padding: spacing.lg, gap: spacing.sm },
  settingsTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  settingsBtn: {
    marginTop: spacing.sm,
    backgroundColor: colors.baseBlue,
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  settingsBtnText: { color: colors.white, fontWeight: '700' },
  footer: { marginTop: spacing.md, paddingBottom: spacing.md },
});
