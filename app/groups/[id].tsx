import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  appendLocalMessage,
  getGroupById,
  formatMemberCount,
  inviteUrl,
  type MockGroupMessage,
} from '@/data/mocks/groups';
import { colors, radius, spacing } from '@/theme';

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

/** Group thread — local message stub + invite. */
export default function GroupThreadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const group = getGroupById(String(id));
  const [draft, setDraft] = useState('');
  const [extraMessages, setExtraMessages] = useState<MockGroupMessage[]>([]);
  const messages = [...(group?.messages ?? []), ...extraMessages];

  if (!group) {
    return (
      <View style={styles.missing}>
        <Stack.Screen options={{ title: 'Not found' }} />
        <Text style={styles.missingText}>Group not found.</Text>
      </View>
    );
  }

  const onInvite = () => {
    const url = inviteUrl(group.inviteCode);
    Alert.alert('Invite link (mock)', url + '\n\nShare sheet stub — copy manually.');
  };

  const onSend = () => {
    if (!draft.trim()) return;
    const msg = appendLocalMessage(group.id, draft);
    if (msg) {
      setExtraMessages((prev) => [...prev, msg]);
      setDraft('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={88}>
      <Stack.Screen
        options={{
          title: group.name,
          headerRight: () => (
            <Pressable onPress={onInvite} hitSlop={12}>
              <Text style={styles.inviteHeader}>Invite</Text>
            </Pressable>
          ),
        }}
      />

      <View style={styles.headerMeta}>
        <Text style={styles.meta}>
          {formatMemberCount(group.memberCount)} members · {inviteUrl(group.inviteCode)}
        </Text>
      </View>

      {group.membersFirstLive && group.tokenId && (
        <Pressable
          onPress={() => router.push(`/coin/${group.tokenId}`)}
          style={({ pressed }) => [styles.liveChip, pressed && { opacity: 0.85 }]}>
          <Text style={styles.liveChipText}>Launch is live — members saw it first</Text>
        </Pressable>
      )}

      <FlatList
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.isCreator ? styles.bubbleMine : styles.bubbleTheirs]}>
            <Text style={styles.author}>{item.isCreator ? 'you' : item.author}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.time}>{formatTime(item.at)}</Text>
          </View>
        )}
      />

      <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, spacing.sm) }]}>
        <TextInput
          style={styles.input}
          value={draft}
          onChangeText={setDraft}
          placeholder="Message (local stub)"
          placeholderTextColor={colors.textMuted}
          onSubmitEditing={onSend}
          returnKeyType="send"
        />
        <Pressable
          onPress={onSend}
          style={({ pressed }) => [styles.send, pressed && { opacity: 0.85 }]}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  missing: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  missingText: { color: colors.textMuted },
  inviteHeader: { color: colors.baseBlueLight, fontWeight: '700', marginRight: 4 },
  headerMeta: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  meta: { color: colors.textMuted, fontSize: 12, fontFamily: 'SpaceMono' },
  liveChip: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    backgroundColor: colors.baseBlue,
    borderRadius: radius.full,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  liveChipText: { color: colors.white, fontWeight: '700', fontSize: 12 },
  list: { padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.md },
  bubble: {
    maxWidth: '85%',
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: 4,
    marginBottom: spacing.sm,
  },
  bubbleMine: {
    alignSelf: 'flex-end',
    backgroundColor: colors.baseBlueDark,
  },
  bubbleTheirs: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
  },
  author: { color: colors.baseBlueLight, fontSize: 11, fontWeight: '700' },
  body: { color: colors.text, fontSize: 15, lineHeight: 20 },
  time: { color: colors.textMuted, fontSize: 11, fontFamily: 'SpaceMono', marginTop: 2 },
  composer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 15,
  },
  send: {
    backgroundColor: colors.baseBlue,
    borderRadius: radius.md,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  sendText: { color: colors.white, fontWeight: '700' },
});
