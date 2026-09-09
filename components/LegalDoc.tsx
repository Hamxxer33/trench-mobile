import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { colors, spacing, typography } from '@/theme';

type Props = {
  title: string;
  body: string[];
};

export function LegalDoc({ title, body }: Props) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title }} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.badge}>Store stub · mock copy · not legal advice</Text>
      {body.map((p, i) => (
        <Text key={i} style={styles.p}>
          {p}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.md },
  title: { ...typography.title, color: colors.text },
  badge: {
    color: colors.baseBlueLight,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  p: { color: colors.textSecondary, lineHeight: 22, fontSize: 15 },
});
