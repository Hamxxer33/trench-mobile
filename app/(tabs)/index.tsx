import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CoinCard } from '@/components/CoinCard';
import { TrenchBaseLockup } from '@/components/TrenchBaseLockup';
import { getNew, getTrending } from '@/data/mocks/launches';
import { colors, spacing } from '@/theme';

type FeedTab = 'trending' | 'new';

export default function HomeFeedScreen() {
  const [tab, setTab] = useState<FeedTab>('trending');
  const data = useMemo(() => (tab === 'trending' ? getTrending() : getNew()), [tab]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TrenchBaseLockup />
        <Text style={styles.subtitle}>Base-native B20 launchpad · mock V1</Text>
      </View>

      <View style={styles.tabs}>
        <Pressable
          onPress={() => setTab('trending')}
          style={[styles.chip, tab === 'trending' && styles.chipActive]}>
          <Text style={[styles.chipText, tab === 'trending' && styles.chipTextActive]}>
            Trending
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setTab('new')}
          style={[styles.chip, tab === 'new' && styles.chipActive]}>
          <Text style={[styles.chipText, tab === 'new' && styles.chipTextActive]}>New</Text>
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CoinCard launch={item} />}
        ListEmptyComponent={<Text style={styles.empty}>No launches yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  subtitle: { color: colors.textMuted, marginTop: 4, fontSize: 13 },
  tabs: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.baseBlue, borderColor: colors.baseBlue },
  chipText: { color: colors.textSecondary, fontWeight: '600' },
  chipTextActive: { color: colors.white },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
