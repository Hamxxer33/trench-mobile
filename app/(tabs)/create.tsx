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

import { useWallet } from '@/components/WalletContext';
import { colors, radius, spacing, typography } from '@/theme';

type Step = 1 | 2 | 3;

/** Figma lock: first-buy is optional and defaults OFF. Cap stub amount. */
const FIRST_BUY_CAP_ETH = 0.1;

export default function CreateLaunchScreen() {
  const { wallet } = useWallet();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  /** Optional first-buy — default OFF (Figma lock). */
  const [firstBuyEnabled, setFirstBuyEnabled] = useState(false);
  const [firstBuyAmount, setFirstBuyAmount] = useState('0.01');

  const canNext =
    (step === 1 && name.trim().length >= 2 && symbol.trim().length >= 2) ||
    (step === 2 && description.trim().length >= 8) ||
    step === 3;

  const clampFirstBuy = (raw: string) => {
    setFirstBuyAmount(raw);
  };

  const onLaunch = () => {
    if (!wallet) {
      Alert.alert('Connect wallet', 'Use the Wallet tab to connect a mock wallet first.');
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

    Alert.alert(
      'Launch queued (mock)',
      `${name} ($${symbol.toUpperCase()})\n${buyLine}\n\nMock trade — no chain.`,
    );
    setStep(1);
    setName('');
    setSymbol('');
    setDescription('');
    setFirstBuyEnabled(false);
    setFirstBuyAmount('0.01');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create coin</Text>
          <Text style={styles.subtitle}>Multi-step wizard · mock only</Text>

          <View style={styles.steps}>
            {([1, 2, 3] as Step[]).map((s) => (
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
            </View>
          )}

          {step === 2 && (
            <View style={styles.card}>
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

          {step === 3 && (
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
                <Text style={styles.summaryLine}>
                  {name || '—'} · ${symbol || '—'}
                </Text>
                <Text style={styles.summaryLine} numberOfLines={3}>
                  {description || '—'}
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

          <View style={styles.actions}>
            {step > 1 && (
              <Pressable
                onPress={() => setStep((s) => (s - 1) as Step)}
                style={({ pressed }) => [styles.secondary, pressed && { opacity: 0.8 }]}>
                <Text style={styles.secondaryText}>Back</Text>
              </Pressable>
            )}
            {step < 3 ? (
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
                onPress={onLaunch}
                style={({ pressed }) => [styles.primary, pressed && { opacity: 0.85 }]}>
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
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
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
  summary: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md,
    gap: 6,
  },
  summaryTitle: { color: colors.baseBlueLight, fontWeight: '700' },
  summaryLine: { color: colors.textSecondary },
  warn: { color: colors.warning, fontSize: 12, marginTop: 6 },
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
