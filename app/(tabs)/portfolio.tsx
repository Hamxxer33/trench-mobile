import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import { GlassSurface } from '@/components/GlassSurface';
import { getMockHoldings, type HoldingRow } from '@/data/mocks/portfolio';
import { colors, radius, spacing, tabBar, typography } from '@/theme';

/** Mock ETH→USD for big $ hierarchy (no chain). */
const MOCK_ETH_USD = 2500;

const QUICK_ACTIONS = [
  {
    key: 'add',
    label: 'Add',
    icon: { ios: 'plus', android: 'add', web: 'add' } as const,
  },
  {
    key: 'swap',
    label: 'Swap',
    icon: { ios: 'arrow.left.arrow.right', android: 'swap_horiz', web: 'swap_horiz' } as const,
  },
  {
    key: 'send',
    label: 'Send',
    icon: { ios: 'paperplane.fill', android: 'send', web: 'send' } as const,
  },
] as const;

type QuickAction = (typeof QUICK_ACTIONS)[number];

export default function PortfolioScreen() {
  const router = useRouter();
  const holdings = getMockHoldings();
  const totalEth = holdings.reduce((sum, h) => sum + h.valueEth, 0);
  const totalUsd = totalEth * MOCK_ETH_USD;
  const weightedPct =
    holdings.length === 0
      ? 0
      : holdings.reduce((sum, h) => sum + h.change24hPct * h.valueEth, 0) /
        (totalEth || 1);
  const up = weightedPct >= 0;

  const onQuickAction = (action: QuickAction) => {
    Alert.alert(
      `${action.label} (stub)`,
      `Mock ${action.label.toLowerCase()} — no chain. V1.1 chrome only.`,
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>Your Portfolio</Text>
            <Text style={[styles.pnl, up ? styles.up : styles.down]}>
              {up ? '+' : ''}
              {weightedPct.toFixed(0)}%
            </Text>
            <Text style={styles.balance}>
              $
              {totalUsd.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            <Text style={styles.ethHint}>≈ {totalEth.toFixed(3)} ETH · mock</Text>
          </View>

          <View style={styles.actions}>
            {QUICK_ACTIONS.map((action) => (
              <Pressable
                key={action.key}
                accessibilityRole="button"
                accessibilityLabel={action.label}
                onPress={() => onQuickAction(action)}
                style={({ pressed }) => [pressed && { opacity: 0.85 }]}>
                <GlassSurface
                  borderRadius={radius.full}
                  intensity={40}
                  style={styles.actionBtn}
                  contentStyle={styles.actionBtnInner}>
                  <SymbolView name={action.icon} tintColor={colors.white} size={20} />
                </GlassSurface>
              </Pressable>
            ))}
          </View>
        </View>
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  headerTop: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  eyebrow: { color: colors.textSecondary, fontSize: 15, fontWeight: '600' },
  pnl: { fontSize: 14, fontWeight: '700', marginTop: 2 },
  balance: { ...typography.hero, color: colors.text, marginTop: spacing.xs },
  ethHint: { color: colors.textMuted, fontSize: 13, marginTop: 4 },
  actions: { flexDirection: 'row', gap: spacing.sm, paddingTop: spacing.xl },
  actionBtn: { width: 48, height: 48 },
  actionBtnInner: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: tabBar.contentInset,
    gap: spacing.sm,
  },
  emptyWrap: { alignItems: 'center', marginTop: spacing.xxl, paddingHorizontal: spacing.lg },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '600' },
  emptyBody: { color: colors.textMuted, marginTop: spacing.sm, textAlign: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
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
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
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
