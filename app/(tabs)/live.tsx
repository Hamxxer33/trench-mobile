import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radius, spacing, tabBar, typography } from '@/theme';

/** Live tab — stub only. No livestream UI in V1. */
export default function LiveScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.center}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Coming later</Text>
        </View>
        <Text style={styles.title}>Live</Text>
        <Text style={styles.body}>Live coming later</Text>
        <Text style={styles.hint}>No livestream in V1 — placeholder tab only.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: tabBar.contentInset,
    gap: spacing.sm,
  },
  badge: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
    marginBottom: spacing.sm,
  },
  badgeText: { color: colors.textMuted, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  title: { ...typography.title, color: colors.text },
  body: { color: colors.textSecondary, fontSize: 18, fontWeight: '600' },
  hint: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.sm },
});
