import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, spacing } from '@/theme';

type Props = {
  /** Compact for headers; default is standard. */
  size?: 'sm' | 'md';
  style?: StyleProp<ViewStyle>;
};

/**
 * Brand lockup: “Trench × Base” on dark chrome.
 * Text placeholder until logo assets land — Base Blue `#0000FF`.
 */
export function TrenchBaseLockup({ size = 'md', style }: Props) {
  const isSm = size === 'sm';
  return (
    <View
      style={[styles.row, style]}
      accessibilityRole="header"
      accessibilityLabel="Trench times Base">
      <Text style={[styles.trench, isSm && styles.trenchSm]}>Trench</Text>
      <Text style={[styles.times, isSm && styles.timesSm]}>×</Text>
      <Text style={[styles.base, isSm && styles.baseSm]}>Base</Text>
    </View>
  );
}

/** Footer line — copy locked: “built on Base”, never “partnered with”. */
export function BuiltOnBaseFooter({ style }: { style?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.footer, style]}>
      <View style={styles.footerDot} />
      <Text style={styles.footerText}>built on Base</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  trench: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  trenchSm: { fontSize: 16 },
  times: {
    color: colors.baseBlue,
    fontSize: 20,
    fontWeight: '700',
  },
  timesSm: { fontSize: 14 },
  base: {
    color: colors.baseBlue,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  baseSm: { fontSize: 16 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  footerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.baseBlue,
  },
  footerText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
});
