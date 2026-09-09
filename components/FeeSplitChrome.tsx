import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { GlassSurface } from '@/components/GlassSurface';
import { colors, radius, spacing } from '@/theme';

/** Mock placeholders only — no contracts / on-chain math. */
const MOCK_SPLIT = [
  { id: 'platform', label: 'Platform', pct: 30 },
  { id: 'creator', label: 'Creator', pct: 50 },
  { id: 'referrer', label: 'Referrer', pct: 20 },
] as const;

const MOCK_REFERRAL = 'TRENCH-DEMO';

type Props = {
  style?: StyleProp<ViewStyle>;
};

/**
 * Light fee-split / referral chrome for post-login settings (Wallet tab).
 * Mock numbers only — keeps the auth PR focused.
 */
export function FeeSplitChrome({ style }: Props) {
  return (
    <GlassSurface
      intensity={40}
      borderRadius={radius.xl}
      style={style}
      contentStyle={styles.inner}
      accessibilityLabel="Fee split mock">
      <View style={styles.headerRow}>
        <Text style={styles.title}>Fee split</Text>
        <Text style={styles.badge}>mock</Text>
      </View>
      <Text style={styles.hint}>
        Platform / creator / referrer placeholders — no contracts.
      </Text>

      <View style={styles.rows}>
        {MOCK_SPLIT.map((row) => (
          <View key={row.id} style={styles.row}>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${row.pct}%` }]} />
            </View>
            <Text style={styles.rowPct}>{row.pct}%</Text>
          </View>
        ))}
      </View>

      <View style={styles.referral}>
        <Text style={styles.referralLabel}>Your referral</Text>
        <Text style={styles.referralCode}>{MOCK_REFERRAL}</Text>
      </View>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  inner: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  badge: {
    color: colors.white,
    backgroundColor: colors.baseBlueDark,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  hint: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: spacing.xs,
  },
  rows: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
    width: 72,
  },
  barTrack: {
    flex: 1,
    height: 8,
    borderRadius: radius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: radius.full,
    backgroundColor: colors.baseBlue,
  },
  rowPct: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'SpaceMono',
    width: 40,
    textAlign: 'right',
  },
  referral: {
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth * 2,
    borderTopColor: colors.glassBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  referralLabel: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  referralCode: {
    color: colors.baseBlueLight,
    fontFamily: 'SpaceMono',
    fontSize: 13,
    fontWeight: '600',
  },
});
