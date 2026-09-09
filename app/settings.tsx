import { Link, Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '@/theme';

const LINKS = [
  { href: '/legal/terms' as const, label: 'Terms of Use' },
  { href: '/legal/privacy' as const, label: 'Privacy Policy' },
  { href: '/legal/risk' as const, label: 'Risk disclosure' },
  { href: '/legal/licenses' as const, label: 'Open source licenses' },
];

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'Settings' }} />
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.sub}>Legal & store stubs · package fun.trench.app</Text>

      <View style={styles.card}>
        {LINKS.map((item) => (
          <Link key={item.href} href={item.href} asChild>
            <Pressable style={({ pressed }) => [styles.row, pressed && { opacity: 0.85 }]}>
              <Text style={styles.rowLabel}>{item.label}</Text>
              <Text style={styles.chev}>›</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Text style={styles.meta}>Version 1.0.0 · mock V1.2 · no secrets in git</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xxl },
  title: { ...typography.title, color: colors.text },
  sub: { color: colors.textMuted, marginBottom: spacing.sm },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  rowLabel: { color: colors.text, fontSize: 16, fontWeight: '600' },
  chev: { color: colors.textMuted, fontSize: 22 },
  meta: { color: colors.textMuted, fontSize: 12, marginTop: spacing.md },
});
