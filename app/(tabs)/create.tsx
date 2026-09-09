import { useState } from 'react';
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

import { useWallet } from '@/components/WalletContext';
import { colors, radius, spacing, typography } from '@/theme';

type Step = 1 | 2 | 3;

export default function CreateLaunchScreen() {
  const { wallet } = useWallet();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [initialBuy, setInitialBuy] = useState('0.05');

  const canNext =
    (step === 1 && name.trim().length >= 2 && symbol.trim().length >= 2) ||
    (step === 2 && description.trim().length >= 8) ||
    step === 3;

  const onLaunch = () => {
    if (!wallet) {
      Alert.alert('Connect wallet', 'Use the Wallet tab to connect a mock wallet first.');
      return;
    }
    Alert.alert(
      'Launch queued (mock)',
      `${name} ($${symbol.toUpperCase()})\nInitial buy: ${initialBuy} ETH\n\nNo contracts — V1 mock wizard only.`,
    );
    setStep(1);
    setName('');
    setSymbol('');
    setDescription('');
    setInitialBuy('0.05');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Launch a coin</Text>
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
              <Text style={styles.label}>Initial buy (ETH)</Text>
              <TextInput
                style={styles.input}
                value={initialBuy}
                onChangeText={setInitialBuy}
                keyboardType="decimal-pad"
                placeholder="0.05"
                placeholderTextColor={colors.textMuted}
              />
              <View style={styles.summary}>
                <Text style={styles.summaryTitle}>Review</Text>
                <Text style={styles.summaryLine}>
                  {name || '—'} · ${symbol || '—'}
                </Text>
                <Text style={styles.summaryLine} numberOfLines={3}>
                  {description || '—'}
                </Text>
                <Text style={styles.summaryLine}>Buy-in: {initialBuy} ETH</Text>
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
                <Text style={styles.primaryText}>Launch (mock)</Text>
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
