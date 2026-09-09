import { StyleSheet, Text, View } from 'react-native';

import type { ChartPoint } from '@/data/mocks/launches';
import { colors, radius, spacing } from '@/theme';

type Props = {
  points: ChartPoint[];
  height?: number;
};

/** Simple mock one-sided LP / pool chart (no SVG dependency). */
export function PoolChart({ points, height = 160 }: Props) {
  if (points.length === 0) {
    return (
      <View style={[styles.wrap, { height }]}>
        <Text style={styles.empty}>No chart data</Text>
      </View>
    );
  }

  const prices = points.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>One-sided LP / pool (mock)</Text>
      <View style={[styles.chart, { height }]}>
        {points.map((p) => {
          const pct = ((p.price - min) / range) * 100;
          return (
            <View key={p.t} style={styles.barCol}>
              <View style={[styles.bar, { height: `${Math.max(6, pct)}%` }]} />
            </View>
          );
        })}
      </View>
      <View style={styles.axis}>
        <Text style={styles.axisText}>{min.toFixed(8)} ETH</Text>
        <Text style={styles.axisText}>{max.toFixed(8)} ETH</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    /** Pool card stays opaque #32353D (not glass). */
    backgroundColor: colors.baseGray,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  label: { color: colors.textSecondary, marginBottom: spacing.sm, fontSize: 13 },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    paddingHorizontal: 4,
    paddingBottom: 4,
    overflow: 'hidden',
  },
  barCol: { flex: 1, height: '100%', justifyContent: 'flex-end' },
  bar: {
    width: '100%',
    backgroundColor: colors.baseBlue,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    opacity: 0.9,
  },
  axis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  axisText: { color: colors.textMuted, fontSize: 11 },
  empty: { color: colors.textMuted, textAlign: 'center' },
});
