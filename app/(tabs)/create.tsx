import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TrenchBaseLockup } from '@/components/TrenchBaseLockup';
import { useWallet } from '@/components/WalletContext';
import { colors, radius, spacing, tabBar, typography } from '@/theme';

type Step = 1 | 2 | 3 | 4 | 5;

const STEP_LABELS = ['Basics', 'Art', 'Socials', 'Review', 'Sign'] as const;

/** Figma lock: first-buy is optional and defaults OFF. Cap stub amount. */
const FIRST_BUY_CAP_ETH = 0.1;

/** Mock square art presets (placeholder until real upload). */
const ART_PRESETS = [
  { id: 'ape', label: 'Ape', emoji: '🦍', tint: '#0000FF' },
  { id: 'rocket', label: 'Rocket', emoji: '🚀', tint: '#4D4DFF' },
  { id: 'trench', label: 'Trench', emoji: '🪖', tint: '#32353D' },
  { id: 'base', label: 'Base', emoji: '🔵', tint: '#0000CC' },
] as const;

type ArtPresetId = (typeof ART_PRESETS)[number]['id'] | 'upload';

export default function CreateLaunchScreen() {
  const { wallet, connecting, connect } = useWallet();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [artId, setArtId] = useState<ArtPresetId | null>(null);
  const [twitter, setTwitter] = useState('');
  const [telegram, setTelegram] = useState('');
  const [website, setWebsite] = useState('');
  /** Optional first-buy — default OFF (Figma lock). */
  const [firstBuyEnabled, setFirstBuyEnabled] = useState(false);
  const [firstBuyAmount, setFirstBuyAmount] = useState('0.01');

  const selectedArt =
    artId === 'upload'
      ? { id: 'upload' as const, label: 'Uploaded', emoji: '🖼️', tint: colors.baseBlue }
      : ART_PRESETS.find((p) => p.id === artId) ?? null;

  const canNext =
    (step === 1 &&
      name.trim().length >= 2 &&
      symbol.trim().length >= 2 &&
      description.trim().length >= 8) ||
    (step === 2 && artId !== null) ||
    step === 3 ||
    step === 4 ||
    step === 5;

  const clampFirstBuy = (raw: string) => {
    setFirstBuyAmount(raw);
  };

  const resetForm = () => {
    setStep(1);
    setName('');
    setSymbol('');
    setDescription('');
    setArtId(null);
    setTwitter('');
    setTelegram('');
    setWebsite('');
    setFirstBuyEnabled(false);
    setFirstBuyAmount('0.01');
  };

  const onLaunch = () => {
    if (!wallet) {
      Alert.alert('Sign in with Base', 'Connect on the Sign step (or Wallet tab) first.');
      return;
    }

    let buyLine = 'First buy: off';
    if (firstBuyEnabled) {
      const value = Number(firstBuyAmount);
      if (!Number.isFinite(value) || value <= 0) {
        Alert.alert('Invalid first buy', 'Enter a positive ETH amount or turn first buy off.');
        return;
      }
      if (value > FIRST_BUY_CAP_ETH) {
        Alert.alert(
          'First buy capped',
          `Mock first buy is capped at ${FIRST_BUY_CAP_ETH} ETH.`,
        );
        return;
      }
      buyLine = `First buy: ${value} ETH (mock)`;
    }

    const socialBits = [
      twitter.trim() && `X: @${twitter.trim().replace(/^@/, '')}`,
      telegram.trim() && `TG: ${telegram.trim()}`,
      website.trim() && `Web: ${website.trim()}`,
    ].filter(Boolean);

    Alert.alert(
      'Launch queued (mock)',
      `${name} ($${symbol.toUpperCase()})\nArt: ${selectedArt?.label ?? '—'}\n${buyLine}${
        socialBits.length ? `\n${socialBits.join(' · ')}` : ''
      }\n\nMock trade — no chain.`,
    );
    resetForm();
  };

  const onMockUpload = () => {
    setArtId('upload');
    Alert.alert('Upload (mock)', '512² placeholder attached. No real file picker in V1.');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <TrenchBaseLockup size="sm" style={styles.lockup} />
          <Text style={styles.title}>Create coin</Text>
          <Text style={styles.subtitle}>
            {STEP_LABELS[step - 1]} · step {step}/5 · mock only
          </Text>

          <View style={styles.steps}>
            {([1, 2, 3, 4, 5] as Step[]).map((s) => (
              <View key={s} style={[styles.stepDot, step >= s && styles.stepDotActive]}>
                <Text style={styles.stepDotText}>{s}</Text>
              </View>
            ))}
          </View>

          {step === 1 && (
            <View style={styles.card}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Trench Ape"
                placeholderTextColor={colors.textMuted}
              />
              <Text style={styles.label}>Symbol</Text>
              <TextInput
                style={styles.input}
                value={symbol}
                onChangeText={(t) => setSymbol(t.toUpperCase().slice(0, 8))}
                placeholder="TAPE"
                autoCapitalize="characters"
                placeholderTextColor={colors.textMuted}
              />
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                value={description}
                onChangeText={setDescription}
                placeholder="What is this coin about?"
                placeholderTextColor={colors.textMuted}
                multiline
                numberOfLines={4}
              />
            </View>
          )}

          {step === 2 && (
            <View style={styles.card}>
              <Text style={styles.labelTight}>Coin art (512²)</Text>
              <Text style={styles.toggleHint}>
                Pick a mock preset or upload a placeholder · crop preview stub
              </Text>

              <View style={styles.artPreview}>
                {selectedArt ? (
                  <View style={[styles.artSquare, { backgroundColor: selectedArt.tint }]}>
                    <Text style={styles.artEmoji}>{selectedArt.emoji}</Text>
                  </View>
                ) : (
                  <View style={[styles.artSquare, styles.artSquareEmpty]}>
                    <Text style={styles.artPlaceholder}>512²</Text>
                  </View>
                )}
                <Text style={styles.artCaption}>
                  {selectedArt ? selectedArt.label : 'No art selected'}
                </Text>
              </View>

              <View style={styles.artGrid}>
                {ART_PRESETS.map((preset) => {
                  const active = artId === preset.id;
                  return (
                    <Pressable
                      key={preset.id}
                      onPress={() => setArtId(preset.id)}
                      style={({ pressed }) => [
                        styles.artChip,
                        active && styles.artChipActive,
                        pressed && { opacity: 0.85 },
                      ]}>
                      <Text style={styles.artChipEmoji}>{preset.emoji}</Text>
                      <Text style={[styles.artChipLabel, active && styles.artChipLabelActive]}>
                        {preset.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Pressable
                onPress={onMockUpload}
                style={({ pressed }) => [
                  styles.uploadBtn,
                  artId === 'upload' && styles.uploadBtnActive,
                  pressed && { opacity: 0.85 },
                ]}>
                <Text style={styles.uploadBtnText}>
                  {artId === 'upload' ? 'Uploaded (mock)' : 'Upload image (mock)'}
                </Text>
              </Pressable>
            </View>
          )}

          {step === 3 && (
            <View style={styles.card}>
              <Text style={styles.labelTight}>Socials (optional)</Text>
              <Text style={styles.toggleHint}>Skip anytime — placeholders only</Text>

              <Text style={styles.label}>X / Twitter</Text>
              <TextInput
                style={styles.input}
                value={twitter}
                onChangeText={setTwitter}
                placeholder="@handle"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.label}>Telegram</Text>
              <TextInput
                style={styles.input}
                value={telegram}
                onChangeText={setTelegram}
                placeholder="t.me/…"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.label}>Website</Text>
              <TextInput
                style={styles.input}
                value={website}
                onChangeText={setWebsite}
                placeholder="https://"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
              />
            </View>
          )}

          {step === 4 && (
            <View style={styles.card}>
              <View style={styles.toggleRow}>
                <View style={styles.toggleCopy}>
                  <Text style={styles.labelTight}>Optional first buy</Text>
                  <Text style={styles.toggleHint}>
                    Default off · capped at {FIRST_BUY_CAP_ETH} ETH (mock)
                  </Text>
                </View>
                <Switch
                  value={firstBuyEnabled}
                  onValueChange={setFirstBuyEnabled}
                  trackColor={{ false: colors.border, true: colors.baseBlue }}
                  thumbColor={colors.white}
                  ios_backgroundColor={colors.border}
                />
              </View>

              {firstBuyEnabled && (
                <>
                  <Text style={styles.label}>First buy (ETH)</Text>
                  <TextInput
                    style={styles.input}
                    value={firstBuyAmount}
                    onChangeText={clampFirstBuy}
                    keyboardType="decimal-pad"
                    placeholder="0.01"
                    placeholderTextColor={colors.textMuted}
                  />
                </>
              )}

              <View style={styles.summary}>
                <Text style={styles.summaryTitle}>Review</Text>
                <View style={styles.summaryArtRow}>
                  {selectedArt && (
                    <View
                      style={[
                        styles.summaryArt,
                        { backgroundColor: selectedArt.tint },
                      ]}>
                      <Text style={styles.summaryArtEmoji}>{selectedArt.emoji}</Text>
                    </View>
                  )}
                  <View style={{ flex: 1 }}>
                    <Text style={styles.summaryLine}>
                      {name || '—'} · ${symbol || '—'}
                    </Text>
                    <Text style={styles.summaryLine} numberOfLines={2}>
                      {description || '—'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.summaryLine}>
                  Art: {selectedArt?.label ?? '—'}
                </Text>
                <Text style={styles.summaryLine}>
                  Socials:{' '}
                  {[twitter && `X`, telegram && `TG`, website && `Web`]
                    .filter(Boolean)
                    .join(' · ') || 'none'}
                </Text>
                <Text style={styles.summaryLine}>
                  First buy: {firstBuyEnabled ? `${firstBuyAmount} ETH` : 'off'}
                </Text>
                <Text style={styles.warn}>
                  Fields are immutable after confirm (mock warning).
                </Text>
              </View>
            </View>
          )}

          {step === 5 && (
            <View style={styles.card}>
              <Text style={styles.labelTight}>Sign</Text>
              <Text style={styles.toggleHint}>
                Sign in with Base / passkey stub → create (mock live)
              </Text>

              {wallet ? (
                <>
                  <View style={styles.signedBadge}>
                    <Text style={styles.signedBadgeText}>Signed in with Base (mock)</Text>
                  </View>
                  <Text style={styles.summaryLine}>
                    Ready to launch {name || '—'} (${symbol || '—'})
                  </Text>
                </>
              ) : (
                <>
                  <Text style={styles.hint}>
                    Connect before create. Fake Sign in with Base only — no chain.
                  </Text>
                  <Pressable
                    disabled={connecting}
                    onPress={() => connect()}
                    accessibilityRole="button"
                    accessibilityLabel="Sign in with Base"
                    style={({ pressed }) => [
                      styles.primary,
                      pressed && { opacity: 0.85 },
                      connecting && { opacity: 0.6 },
                    ]}>
                    <Text style={styles.primaryText}>
                      {connecting ? 'Connecting…' : 'Sign in with Base'}
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          )}

          <View style={styles.actions}>
            {step > 1 && (
              <Pressable
                onPress={() => setStep((s) => (s - 1) as Step)}
                style={({ pressed }) => [styles.secondary, pressed && { opacity: 0.8 }]}>
                <Text style={styles.secondaryText}>Back</Text>
              </Pressable>
            )}
            {step < 5 ? (
              <Pressable
                disabled={!canNext}
                onPress={() => setStep((s) => (s + 1) as Step)}
                style={({ pressed }) => [
                  styles.primary,
                  !canNext && styles.disabled,
                  pressed && canNext && { opacity: 0.85 },
                ]}>
                <Text style={styles.primaryText}>Continue</Text>
              </Pressable>
            ) : (
              <Pressable
                disabled={!wallet}
                onPress={onLaunch}
                style={({ pressed }) => [
                  styles.primary,
                  !wallet && styles.disabled,
                  pressed && wallet && { opacity: 0.85 },
                ]}>
                <Text style={styles.primaryText}>Create coin (mock)</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: tabBar.contentInset },
  lockup: { marginBottom: spacing.sm },
  title: { ...typography.title, color: colors.text },
  subtitle: { color: colors.textMuted, marginBottom: spacing.lg },
  steps: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepDotActive: { backgroundColor: colors.baseBlue, borderColor: colors.baseBlue },
  stepDotText: { color: colors.white, fontWeight: '700' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  label: { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
  labelTight: { color: colors.text, fontSize: 15, fontWeight: '600' },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: 4,
  },
  toggleCopy: { flex: 1, gap: 2 },
  toggleHint: { color: colors.textMuted, fontSize: 12 },
  hint: { color: colors.textMuted, marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
  },
  textarea: { minHeight: 100, textAlignVertical: 'top' },
  artPreview: { alignItems: 'center', gap: spacing.sm, marginVertical: spacing.sm },
  artSquare: {
    width: 128,
    height: 128,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  artSquareEmpty: { backgroundColor: colors.surfaceElevated },
  artEmoji: { fontSize: 48 },
  artPlaceholder: { color: colors.textMuted, fontWeight: '700', fontSize: 18 },
  artCaption: { color: colors.textSecondary, fontSize: 13 },
  artGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  artChip: {
    width: '47%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  artChipActive: { borderColor: colors.baseBlue, backgroundColor: colors.baseBlueDark },
  artChipEmoji: { fontSize: 20 },
  artChipLabel: { color: colors.textSecondary, fontWeight: '600' },
  artChipLabelActive: { color: colors.white },
  uploadBtn: {
    marginTop: spacing.sm,
    paddingVertical: 12,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.baseBlue,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  uploadBtnActive: { backgroundColor: colors.baseBlueDark, borderStyle: 'solid' },
  uploadBtnText: { color: colors.baseBlueLight, fontWeight: '600' },
  summary: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    gap: 6,
  },
  summaryTitle: { color: colors.baseBlueLight, fontWeight: '700' },
  summaryArtRow: { flexDirection: 'row', gap: spacing.md, alignItems: 'center' },
  summaryArt: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryArtEmoji: { fontSize: 22 },
  summaryLine: { color: colors.textSecondary },
  warn: { color: colors.warning, fontSize: 12, marginTop: 6 },
  signedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.baseBlueDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.full,
    marginVertical: spacing.sm,
  },
  signedBadgeText: { color: colors.white, fontSize: 12, fontWeight: '700' },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  primary: {
    flex: 1,
    backgroundColor: colors.baseBlue,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  primaryText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  secondary: {
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: { color: colors.text, fontWeight: '600' },
  disabled: { opacity: 0.4 },
});
