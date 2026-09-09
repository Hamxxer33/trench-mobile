import { Link, useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GlassSurface } from '@/components/GlassSurface';
import { TrenchBaseLockup } from '@/components/TrenchBaseLockup';
import { formatMemberCount, getAllGroups, type MockGroup } from '@/data/mocks/groups';
import { getLaunchById } from '@/data/mocks/launches';
import { colors, radius, spacing, tabBar, typography } from '@/theme';

/** Live tab → Groups (V1.2). List + create entry. */
export default function GroupsListScreen() {
  const router = useRouter();
  const groups = getAllGroups();

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TrenchBaseLockup />
        <Text style={styles.subtitle}>Trench × Base · Your groups · mock V1.2</Text>
      </View>

      <Pressable
        onPress={() => router.push('/groups/new')}
        accessibilityRole="button"
        accessibilityLabel="Create group"
        style={({ pressed }) => [styles.createCta, pressed && { opacity: 0.85 }]}>
        <Text style={styles.createCtaText}>Create group</Text>
      </Pressable>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No groups yet</Text>
            <Text style={styles.emptyBody}>
              Create a group before you launch — members get first look
            </Text>
          </View>
        }
        renderItem={({ item }) => <GroupRow group={item} />}
      />
    </SafeAreaView>
  );
}

function GroupRow({ group }: { group: MockGroup }) {
  const token = group.tokenId ? getLaunchById(group.tokenId) : null;
  const ticker = token ? `$${token.symbol}` : 'No token yet';

  return (
    <Link href={`/groups/${group.id}`} asChild>
      <Pressable style={({ pressed }) => [pressed && { opacity: 0.9 }]}>
        <GlassSurface
          intensity={40}
          borderRadius={radius.lg}
          style={styles.row}
          contentStyle={styles.rowContent}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>{group.avatarEmoji}</Text>
          </View>
          <View style={styles.meta}>
            <View style={styles.metaTop}>
              <Text style={styles.name} numberOfLines={1}>
                {group.name}
              </Text>
              {group.unread > 0 && (
                <View style={styles.unread}>
                  <Text style={styles.unreadText}>{group.unread}</Text>
                </View>
              )}
            </View>
            <Text style={styles.sub} numberOfLines={1}>
              {formatMemberCount(group.memberCount)} members · {ticker}
            </Text>
          </View>
        </GlassSurface>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.sm },
  subtitle: { color: colors.textMuted, marginTop: 4, fontSize: 13 },
  createCta: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.baseBlue,
    borderRadius: radius.md,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
  },
  createCtaText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: tabBar.contentInset,
    gap: spacing.sm,
  },
  row: { marginBottom: spacing.sm },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.baseBlueDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 22 },
  meta: { flex: 1, gap: 2 },
  metaTop: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  name: { ...typography.heading, fontSize: 17, color: colors.text, flex: 1 },
  sub: { color: colors.textSecondary, fontSize: 13 },
  unread: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.baseBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadText: { color: colors.white, fontSize: 11, fontWeight: '700' },
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  emptyBody: { color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
});
