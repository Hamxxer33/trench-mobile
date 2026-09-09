import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import { getMockHoldings, type HoldingRow } from '@/data/mocks/portfolio';
import { colors, radius, spacing, typography } from '@/theme';

export default function PortfolioScreen() {
  const router = useRouter();
  const holdings = getMockHoldings();
  const totalEth = holdings.reduce((sum, h) => sum + h.valueEth, 0);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio</Text>
        <Text style={styles.subtitle}>Mock holdings · no chain</Text>
        {holdings.length > 0 && (
          <Text style={styles.total}>≈ {totalEth.toFixed(3)} ETH</Text>
        )}
      </View>

      <FlatList
        data={holdings}
        keyExtractor={(item) => item.launchId}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>No positions yet</Text>
            <Text style={styles.emptyBody}>No positions yet — buy from Feed</Text>
          </View>
        }
        renderItem={({ item }) => (
          <HoldingCard
            row={item}
            onPress={() => router.push(`/coin/${item.launchId}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}

function HoldingCard({ row, onPress }: { row: HoldingRow; onPress: () => void }) {
  const up = row.change24hPct >= 0;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}>
      <View style={styles.art}>
        <Text style={styles.artText}>{row.launch.symbol.slice(0, 2)}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.ticker}>{row.launch.symbol}</Text>
        <Text style={styles.qty}>{row.qty.toLocaleString()} tokens</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.value}>{row.valueEth.toFixed(3)} ETH</Text>
        <Text style={[styles.pct, up ? styles.up : styles.down]}>
          {up ? '+' : ''}
          {row.change24hPct.toFixed(1)}%
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  title: { ...typography.title, color: colors.text },
  subtitle: { color: colors.textMuted, marginTop: 4 },
  total: { color: colors.baseBlueLight, fontSize: 18, fontWeight: '700', marginTop: spacing.sm },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.sm },
  emptyWrap: { alignItems: 'center', marginTop: spacing.xxl, paddingHorizontal: spacing.lg },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '600' },
  emptyBody: { color: colors.textMuted, marginTop: spacing.sm, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
  },
  art: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  artText: { color: colors.baseBlueLight, fontWeight: '700', fontSize: 14 },
  meta: { flex: 1, gap: 2 },
  ticker: { color: colors.text, fontWeight: '700', fontFamily: 'SpaceMono', fontSize: 15 },
  qty: { color: colors.textMuted, fontSize: 13 },
  right: { alignItems: 'flex-end', gap: 2 },
  value: { color: colors.text, fontWeight: '600' },
  pct: { fontSize: 13, fontWeight: '600' },
  up: { color: colors.success },
  down: { color: colors.danger },
});
