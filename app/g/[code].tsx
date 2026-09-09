import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWallet } from '@/components/WalletContext';
import { getGroupByInviteCode, inviteUrl } from '@/data/mocks/groups';
import { getLaunchById } from '@/data/mocks/launches';
import { colors, radius, spacing, typography } from '@/theme';

/** Invite join preview — trench.app/g/XXXX stub. */
export default function InviteJoinScreen() {
  const { code } = useLocalSearchParams<{ code: string }>();
  const router = useRouter();
  const { wallet, connect, connecting } = useWallet();
  const group = getGroupByInviteCode(String(code ?? ''));

  if (!group) {
    return (
      <SafeAreaView style={styles.safe}>
        <Stack.Screen options={{ title: 'Invite' }} />
        <View style={styles.center}>
          <Text style={styles.title}>Invite not found</Text>
          <Text style={styles.sub}>Code “{String(code)}” · mock only</Text>
          <Pressable onPress={() => router.replace('/(tabs)/live')} style={styles.secondary}>
            <Text style={styles.secondaryText}>Back to Groups</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const token = group.tokenId ? getLaunchById(group.tokenId) : null;

  const onJoin = async () => {
    if (!wallet) {
      Alert.alert('Sign in required', 'Privy mock — sign in to join.');
      await connect();
      return;
    }
    Alert.alert('Joined (mock)', `You joined ${group.name}`);
    router.replace(`/groups/${group.id}`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Join group' }} />
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.emoji}>{group.avatarEmoji}</Text>
        </View>
        <Text style={styles.title}>{group.name}</Text>
        <Text style={styles.sub}>{group.description}</Text>
        <Text style={styles.meta}>
          {group.memberCount} members
          {token ? ` · $${token.symbol}` : ' · No token yet'}
        </Text>
        <Text style={styles.link}>{inviteUrl(group.inviteCode)}</Text>

        <Pressable
          onPress={onJoin}
          disabled={connecting}
          style={({ pressed }) => [
            styles.primary,
            pressed && { opacity: 0.85 },
            connecting && { opacity: 0.6 },
          ]}>
          <Text style={styles.primaryText}>
            {wallet ? 'Join' : connecting ? 'Connecting…' : 'Join · Sign in with Privy'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.lg, gap: spacing.sm },
  card: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    gap: spacing.sm,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.lg,
    backgroundColor: colors.baseBlueDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  emoji: { fontSize: 36 },
  title: { ...typography.heading, color: colors.text, textAlign: 'center' },
  sub: { color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  meta: { color: colors.textMuted, fontSize: 13 },
  link: { color: colors.baseBlueLight, fontFamily: 'SpaceMono', fontSize: 12, marginVertical: spacing.sm },
  primary: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
    backgroundColor: colors.baseBlue,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  primaryText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  secondary: {
    marginTop: spacing.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryText: { color: colors.text, fontWeight: '600' },
});
