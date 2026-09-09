import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import type { MockGroup } from '@/data/mocks/groups';
import type { MockLaunch } from '@/data/mocks/launches';
import { colors, radius, spacing } from '@/theme';

type FeedProps = {
  variant: 'feed';
  launch: MockLaunch;
  group: MockGroup;
  style?: StyleProp<ViewStyle>;
};

type CoinProps = {
  variant: 'coin';
  groupName: string;
  style?: StyleProp<ViewStyle>;
};

type Props = FeedProps | CoinProps;

/** Members-first chrome — Feed pin card or Coin banner (mock). */
export function MembersFirstBanner(props: Props) {
  if (props.variant === 'coin') {
    return (
      <View style={[styles.coinBanner, props.style]}>
        <Text style={styles.badge}>Members first</Text>
        <Text style={styles.coinText}>
          Shared with your group first · {props.groupName} · mock
        </Text>
      </View>
    );
  }

  const { launch, group } = props;
  return (
    <Link href={`/coin/${launch.id}`} asChild>
      <Pressable
        style={({ pressed }) => [styles.feedCard, props.style, pressed && { opacity: 0.9 }]}
        accessibilityRole="button"
        accessibilityLabel={`${launch.symbol} members first`}>
        <View style={styles.feedTop}>
          <Text style={styles.badge}>Members first</Text>
          <Text style={styles.groupTag}>{group.avatarEmoji} {group.name}</Text>
        </View>
        <Text style={styles.feedTitle}>
          {launch.name} · ${launch.symbol}
        </Text>
        <Text style={styles.feedHint}>
          Your group saw this launch first · {launch.progressPct}% filled
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.baseBlue,
    color: colors.white,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  feedCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.baseBlue,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  feedTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  groupTag: { color: colors.textSecondary, fontSize: 12, fontWeight: '600' },
  feedTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  feedHint: { color: colors.textMuted, fontSize: 12 },
  coinBanner: {
    backgroundColor: colors.baseBlueDark,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    padding: spacing.md,
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  coinText: { color: colors.white, fontSize: 13, fontWeight: '600' },
});
