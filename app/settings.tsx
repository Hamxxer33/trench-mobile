import { Link, Stack, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BuiltOnBaseFooter } from '@/components/TrenchBaseLockup';
import { useWallet } from '@/components/WalletContext';
import { shortenAddress } from '@/data/mocks/wallet';
import { colors, radius, spacing, typography } from '@/theme';

const LEGAL_LINKS = [
  { href: '/legal/terms' as const, label: 'Terms' },
  { href: '/legal/privacy' as const, label: 'Privacy' },
  { href: '/legal/risk' as const, label: 'Risk' },
  { href: '/legal/licenses' as const, label: 'Licenses' },
];

export default function SettingsScreen() {
  const { wallet, disconnect } = useWallet();
  const router = useRouter();

  const onSignOut = () => {
    disconnect();
    router.replace('/login');
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Settings' }} />
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.sub}>Account · legal stubs · package fun.trench.app</Text>

      <Text style={styles.section}>Account</Text>
      <View style={styles.card}>
        {wallet ? (
          <>
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>Email</Text>
                <Text style={styles.rowValue}>{wallet.email}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>Handle</Text>
                <Text style={styles.rowValue}>{wallet.handle}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>Privy (mock)</Text>
                <Text style={styles.rowMono}>{shortenAddress(wallet.address)}</Text>
              </View>
            </View>
            <Pressable
              onPress={disconnect}
              accessibilityRole="button"
              accessibilityLabel="Disconnect wallet"
              style={({ pressed }) => [styles.row, styles.actionRow, pressed && { opacity: 0.85 }]}>
              <Text style={styles.actionLabel}>Disconnect</Text>
            </Pressable>
            <Pressable
              onPress={onSignOut}
              accessibilityRole="button"
              accessibilityLabel="Sign out"
              style={({ pressed }) => [
                styles.row,
                styles.actionRow,
                styles.rowLast,
                pressed && { opacity: 0.85 },
              ]}>
              <Text style={styles.dangerLabel}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <View style={[styles.row, styles.rowLast]}>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>Not signed in</Text>
              <Text style={styles.rowValue}>Mock Privy session only</Text>
            </View>
          </View>
        )}
      </View>

      <Text style={styles.section}>Legal</Text>
      <View style={styles.card}>
        {LEGAL_LINKS.map((item, index) => (
          <Link key={item.href} href={item.href} asChild>
            <Pressable
              style={({ pressed }) => [
                styles.row,
                index === LEGAL_LINKS.length - 1 && styles.rowLast,
                pressed && { opacity: 0.85 },
              ]}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.chev}>›</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Text style={styles.meta}>Version 1.0.0 · mock V1.2 · no secrets in git</Text>
      <BuiltOnBaseFooter style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.xxl },
  title: { ...typography.title, color: colors.text },
  sub: { color: colors.textMuted, marginBottom: spacing.sm },
  section: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLast: { borderBottomWidth: 0 },
  rowText: { flex: 1, gap: 2 },
  rowLabel: { color: colors.text, fontSize: 16, fontWeight: '600' },
  rowValue: { color: colors.textSecondary, fontSize: 14 },
  rowMono: {
    color: colors.baseBlueLight,
    fontFamily: 'SpaceMono',
    fontSize: 13,
  },
  actionRow: { justifyContent: 'flex-start' },
  actionLabel: { color: colors.baseBlueLight, fontSize: 16, fontWeight: '600' },
  dangerLabel: { color: colors.danger, fontSize: 16, fontWeight: '600' },
  chev: { color: colors.textMuted, fontSize: 22 },
  meta: { color: colors.textMuted, fontSize: 12, marginTop: spacing.md },
  footer: { marginTop: spacing.sm },
});
