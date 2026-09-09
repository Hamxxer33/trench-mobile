import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PoolChart } from '@/components/PoolChart';
import { BuySellPanel } from '@/components/BuySellPanel';
import { getLaunchById } from '@/data/mocks/launches';
import { shortenAddress } from '@/data/mocks/wallet';
import { colors, radius, spacing, typography } from '@/theme';

export default function CoinDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const launch = getLaunchById(String(id));

  if (!launch) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={styles.missingText}>Launch not found.</Text>
      </View>
    );
  }

  const up = launch.change24hPct >= 0;

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: launch.symbol }} />

      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{launch.symbol.slice(0, 2)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{launch.name}</Text>
          <Text style={styles.symbol}>{launch.symbol}</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.price}>{launch.priceEth.toFixed(8)}</Text>
          <Text style={[styles.change, up ? styles.up : styles.down]}>
            {up ? '+' : ''}
            {launch.change24hPct.toFixed(1)}%
          </Text>
        </View>
      </View>

      <Text style={styles.desc}>{launch.description}</Text>

      <View style={styles.stats}>
        <Stat label="Market cap" value={`${launch.marketCapEth.toFixed(1)} ETH`} />
        <Stat label="24h vol" value={`${launch.volume24hEth.toFixed(1)} ETH`} />
        <Stat label="Holders" value={String(launch.holders)} />
        <Stat label="Pool filled" value={`${launch.progressPct}%`} />
      </View>

      <Text style={styles.creator}>Creator {shortenAddress(launch.creator)}</Text>

      <PoolChart points={launch.chart} />

      <View style={{ height: spacing.md }} />
      <BuySellPanel symbol={launch.symbol} priceEth={launch.priceEth} />
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.sm },
  missing: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: { color: colors.textMuted },
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.baseBlueDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  name: { ...typography.heading, color: colors.text },
  symbol: { color: colors.textSecondary },
  priceBox: { alignItems: 'flex-end' },
  price: { color: colors.text, fontFamily: 'SpaceMono', fontSize: 12 },
  change: { fontWeight: '700', marginTop: 2 },
  up: { color: colors.success },
  down: { color: colors.danger },
  desc: { color: colors.textSecondary, marginVertical: spacing.sm, lineHeight: 20 },
  stats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  stat: {
    width: '47%',
    backgroundColor: colors.baseGray,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    padding: spacing.md,
  },
  statLabel: { color: colors.textMuted, fontSize: 12 },
  statValue: { color: colors.text, fontWeight: '600', marginTop: 4 },
  creator: { color: colors.textMuted, fontSize: 12, marginBottom: spacing.md },
});
