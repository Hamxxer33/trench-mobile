import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GlassSurface } from '@/components/GlassSurface';
import {
  BuiltOnBaseFooter,
  TrenchBaseLockup,
} from '@/components/TrenchBaseLockup';
import { useWallet } from '@/components/WalletContext';
import { colors, radius, spacing, typography } from '@/theme';

const SECONDARY = [
  { id: 'google', label: 'Continue with Google' },
  { id: 'apple', label: 'Continue with Apple' },
  { id: 'email', label: 'Continue with email' },
] as const;

/** White square + Base Blue mark — SiwB on dark canvas. */
function BaseMark() {
  return (
    <View style={styles.markSquare} accessibilityElementsHidden>
      <View style={styles.markInner} />
    </View>
  );
}

export default function LoginScreen() {
  const { connect, connecting } = useWallet();
  const router = useRouter();

  const onSignInWithBase = useCallback(async () => {
    await connect();
    router.replace('/(tabs)');
  }, [connect, router]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <TrenchBaseLockup style={styles.lockup} />

        <Text style={styles.hero}>Launch & trade on Base</Text>
        <Text style={styles.heroSub}>
          One-sided LP / pool chrome — mock V1, no chain yet.
        </Text>

        <GlassSurface
          intensity={52}
          borderRadius={radius.xl}
          style={styles.panel}
          contentStyle={styles.panelInner}>
          <Pressable
            disabled={connecting}
            onPress={onSignInWithBase}
            accessibilityRole="button"
            accessibilityLabel="Sign in with Base"
            style={({ pressed }) => [
              styles.primary,
              pressed && { opacity: 0.88 },
              connecting && { opacity: 0.65 },
            ]}>
            {connecting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <View style={styles.primaryRow}>
                <BaseMark />
                <Text style={styles.primaryText}>Sign in with Base</Text>
              </View>
            )}
          </Pressable>
          <Text style={styles.subcopy}>Passkey · free · no seed phrase drama</Text>

          <View style={styles.secondaryBlock}>
            {SECONDARY.map((item) => (
              <Pressable
                key={item.id}
                disabled
                accessibilityState={{ disabled: true }}
                accessibilityLabel={`${item.label}, soon`}
                style={styles.secondary}>
                <Text style={styles.secondaryText}>{item.label}</Text>
                <Text style={styles.soon}>soon</Text>
              </Pressable>
            ))}
          </View>
        </GlassSurface>

        <View style={styles.footerBlock}>
          <BuiltOnBaseFooter />
          <Text style={styles.mockDisclaimer}>No chain · V1 mock</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  lockup: { marginBottom: spacing.xl },
  hero: {
    ...typography.title,
    color: colors.text,
    letterSpacing: -0.3,
  },
  heroSub: {
    color: colors.textMuted,
    fontSize: 15,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  panel: { width: '100%' },
  panelInner: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  primary: {
    backgroundColor: colors.baseBlue,
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  primaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  markSquare: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.baseBlue,
  },
  primaryText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 17,
  },
  subcopy: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: -spacing.xs,
  },
  secondaryBlock: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  secondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    opacity: 0.45,
  },
  secondaryText: {
    color: colors.textMuted,
    fontWeight: '600',
    fontSize: 15,
  },
  soon: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  footerBlock: {
    marginTop: 'auto' as const,
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  mockDisclaimer: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: -spacing.sm,
  },
});
