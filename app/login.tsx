import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
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

/** Equal-weight Privy mock providers — no SDK / keys. */
const PRIVY_PROVIDERS = [
  { id: 'google', label: 'Continue with Google' },
  { id: 'apple', label: 'Continue with Apple' },
  { id: 'email', label: 'Continue with email' },
] as const;

type ProviderId = (typeof PRIVY_PROVIDERS)[number]['id'];

export default function LoginScreen() {
  const { connect, connecting } = useWallet();
  const router = useRouter();
  const [activeProvider, setActiveProvider] = useState<ProviderId | null>(null);

  const onPrivyMock = useCallback(
    async (providerId: ProviderId) => {
      setActiveProvider(providerId);
      try {
        await connect();
        router.replace('/(tabs)');
      } finally {
        setActiveProvider(null);
      }
    },
    [connect, router],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <TrenchBaseLockup style={styles.lockup} />

        <Text style={styles.hero}>Launch & trade on Base</Text>
        <Text style={styles.heroSub}>
          Sign in with Privy (mock) — Google, Apple, or email. No chain yet.
        </Text>

        <GlassSurface
          intensity={52}
          borderRadius={radius.xl}
          style={styles.panel}
          contentStyle={styles.panelInner}>
          <Text style={styles.sectionLabel}>Sign in</Text>
          <View style={styles.primaryBlock}>
            {PRIVY_PROVIDERS.map((item) => {
              const busy = connecting && activeProvider === item.id;
              return (
                <Pressable
                  key={item.id}
                  disabled={connecting}
                  onPress={() => onPrivyMock(item.id)}
                  accessibilityRole="button"
                  accessibilityLabel={item.label}
                  style={({ pressed }) => [
                    styles.primary,
                    pressed && { opacity: 0.88 },
                    connecting && { opacity: busy ? 0.85 : 0.55 },
                  ]}>
                  {busy ? (
                    <ActivityIndicator color={colors.background} />
                  ) : (
                    <Text style={styles.primaryText}>{item.label}</Text>
                  )}
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.subcopy}>Privy mock · equal CTAs · no SDK</Text>

          <View style={styles.parkedBlock}>
            <Pressable
              disabled
              accessibilityState={{ disabled: true }}
              accessibilityLabel="Sign in with Base, soon"
              style={styles.parked}>
              <View style={styles.parkedRow}>
                <View style={styles.markSquare} accessibilityElementsHidden>
                  <View style={styles.markInner} />
                </View>
                <Text style={styles.parkedText}>Sign in with Base</Text>
              </View>
              <Text style={styles.soon}>soon</Text>
            </Pressable>
            <Text style={styles.parkedHint}>CDP / SiwB parked — not primary</Text>
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
  sectionLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  primaryBlock: {
    gap: spacing.sm,
  },
  primary: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryText: {
    color: colors.background,
    fontWeight: '700',
    fontSize: 16,
  },
  subcopy: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: -spacing.xs,
  },
  parkedBlock: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  parked: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    opacity: 0.42,
  },
  parkedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  markSquare: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markInner: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.baseBlue,
  },
  parkedText: {
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
  parkedHint: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
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
