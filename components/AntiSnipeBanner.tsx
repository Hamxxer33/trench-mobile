import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { GlassSurface } from '@/components/GlassSurface';
import { colors, radius, spacing } from '@/theme';

type Props = {
  /** Pool fill % — young / early launches trigger the banner. */
  progressPct: number;
  /** Optional launch status from mocks. */
  status?: 'new' | 'trending' | 'filling';
  style?: StyleProp<ViewStyle>;
};

/** Young coin threshold — early % filled or brand-new status. */
const YOUNG_PROGRESS_MAX = 30;

/**
 * Mock anti-snipe chrome: 99% → 1% over 20s (contracts truth), then steady 1%.
 * Copy only — no fee math / contracts.
 */
export function AntiSnipeBanner({ progressPct, status, style }: Props) {
  const young = status === 'new' || progressPct < YOUNG_PROGRESS_MAX;
  if (!young) return null;

  return (
    <GlassSurface
      intensity={44}
      borderRadius={radius.lg}
      style={style}
      contentStyle={styles.inner}
      accessibilityLabel="Anti-snipe fee banner">
      <View style={styles.row}>
        <Text style={styles.badge}>Anti-snipe</Text>
        <Text style={styles.fee}>99% → 1% · 20s</Text>
      </View>
      <Text style={styles.copy}>
        New launch · fee starts at <Text style={styles.em}>99%</Text> and decays to the steady{' '}
        <Text style={styles.em}>1%</Text> over <Text style={styles.em}>20 seconds</Text> (
        {progressPct}% filled). Mock copy only — matches TrenchHook anti-snipe.
      </Text>
    </GlassSurface>
  );
}

const styles = StyleSheet.create({
  inner: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  badge: {
    color: colors.white,
    backgroundColor: colors.warning,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  fee: {
    color: colors.baseBlueLight,
    fontFamily: 'SpaceMono',
    fontSize: 13,
    fontWeight: '700',
  },
  copy: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  em: {
    color: colors.text,
    fontWeight: '700',
  },
});
