import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { MockLaunch } from '@/data/mocks/launches';
import { colors, radius, spacing } from '@/theme';

type Props = {
  launch: MockLaunch;
};

export function CoinCard({ launch }: Props) {
  const up = launch.change24hPct >= 0;

  return (
    <Link href={`/coin/${launch.id}`} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{launch.symbol.slice(0, 2)}</Text>
        </View>
        <View style={styles.meta}>
          <View style={styles.row}>
            <Text style={styles.name} numberOfLines={1}>
              {launch.name}
            </Text>
            <Text style={[styles.change, up ? styles.up : styles.down]}>
              {up ? '+' : ''}
              {launch.change24hPct.toFixed(1)}%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.symbol}>{launch.symbol}</Text>
            <Text style={styles.mcap}>MC {launch.marketCapEth.toFixed(1)} ETH</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${launch.progressPct}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{launch.progressPct}% to graduate</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  pressed: { opacity: 0.85 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.baseBlueDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontWeight: '700', fontSize: 14 },
  meta: { flex: 1 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  name: { color: colors.text, fontWeight: '600', fontSize: 16, flex: 1, marginRight: 8 },
  symbol: { color: colors.textSecondary, fontSize: 13 },
  mcap: { color: colors.textMuted, fontSize: 12 },
  change: { fontSize: 13, fontWeight: '600' },
  up: { color: colors.success },
  down: { color: colors.danger },
  progressTrack: {
    height: 4,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.full,
    marginTop: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.baseBlue,
    borderRadius: radius.full,
  },
  progressLabel: { color: colors.textMuted, fontSize: 11, marginTop: 4 },
});
