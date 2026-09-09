import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createMockGroup, getLinkableTokens, inviteUrl } from '@/data/mocks/groups';
import { colors, radius, spacing, typography } from '@/theme';

/** Create group — before or with token (mock). */
export default function CreateGroupScreen() {
  const router = useRouter();
  const tokens = useMemo(() => getLinkableTokens(), []);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [tokenId, setTokenId] = useState<string | null>(null);
  const [invitePreview, setInvitePreview] = useState<string | null>(null);

  const onGenerateInvite = () => {
    const code = Math.random().toString(36).slice(2, 6).toUpperCase();
    setInvitePreview(inviteUrl(code));
  };

  const onCreate = () => {
    if (name.trim().length < 2) {
      Alert.alert('Name required', 'Enter a group name (2+ chars).');
      return;
    }
    const group = createMockGroup({ name, description, tokenId });
    Alert.alert('Group created (mock)', `${group.name}\n${inviteUrl(group.inviteCode)}`);
    router.replace(`/groups/${group.id}`);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create group</Text>
          <Text style={styles.subtitle}>Before or with a token · invite stub · mock only</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Blue Diggers"
            placeholderTextColor={colors.textMuted}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Members get first look at launches"
            placeholderTextColor={colors.textMuted}
            multiline
          />

          <Text style={styles.label}>Link to token (optional)</Text>
          <View style={styles.chips}>
            <Pressable
              onPress={() => setTokenId(null)}
              style={[styles.chip, tokenId === null && styles.chipActive]}>
              <Text style={[styles.chipText, tokenId === null && styles.chipTextActive]}>
                Launch later
              </Text>
            </Pressable>
            {tokens.slice(0, 6).map((t) => {
              const active = tokenId === t.id;
              return (
                <Pressable
                  key={t.id}
                  onPress={() => setTokenId(t.id)}
                  style={[styles.chip, active && styles.chipActive]}>
                  <Text style={[styles.chipText, active && styles.chipTextActive]}>
                    ${t.symbol}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Pressable
            onPress={onGenerateInvite}
            style={({ pressed }) => [styles.secondary, pressed && { opacity: 0.85 }]}>
            <Text style={styles.secondaryText}>Generate invite link</Text>
          </Pressable>
          {invitePreview && (
            <Text style={styles.inviteMono}>{invitePreview}</Text>
          )}

          <Pressable
            onPress={onCreate}
            accessibilityRole="button"
            style={({ pressed }) => [styles.primary, pressed && { opacity: 0.85 }]}>
            <Text style={styles.primaryText}>Create</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.xxl },
  title: { ...typography.title, color: colors.text },
  subtitle: { color: colors.textMuted, marginBottom: spacing.md },
  label: { color: colors.textSecondary, fontSize: 13, marginTop: 8 },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
  },
  textarea: { minHeight: 88, textAlignVertical: 'top' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
  },
  chipActive: { borderColor: colors.baseBlue, backgroundColor: colors.baseBlueDark },
  chipText: { color: colors.textSecondary, fontWeight: '600', fontSize: 13 },
  chipTextActive: { color: colors.white },
  secondary: {
    marginTop: spacing.md,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    alignItems: 'center',
  },
  secondaryText: { color: colors.text, fontWeight: '600' },
  inviteMono: {
    color: colors.baseBlueLight,
    fontFamily: 'SpaceMono',
    fontSize: 13,
    marginTop: 4,
  },
  primary: {
    marginTop: spacing.lg,
    backgroundColor: colors.baseBlue,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  primaryText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
