import { SymbolView } from 'expo-symbols';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';

import { GlassSurface } from '@/components/GlassSurface';
import { colors, radius, spacing, tabBar } from '@/theme';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const TAB_ICONS = {
  index: {
    ios: 'flame.fill',
    android: 'local_fire_department',
    web: 'local_fire_department',
  },
  live: {
    ios: 'video.fill',
    android: 'videocam',
    web: 'videocam',
  },
  create: {
    ios: 'plus.circle.fill',
    android: 'add_circle',
    web: 'add_circle',
  },
  portfolio: {
    ios: 'chart.pie.fill',
    android: 'pie_chart',
    web: 'pie_chart',
  },
  wallet: {
    ios: 'wallet.pass.fill',
    android: 'account_balance_wallet',
    web: 'account_balance_wallet',
  },
} as const;

type RouteName = keyof typeof TAB_ICONS;

/**
 * Floating frosted pill tab bar — active = white square behind icon.
 * No rainbow glow. IA locked: Feed | Live | Create | Portfolio | Wallet.
 */
export function FloatingTabBar({ state, descriptors, navigation }: TabBarProps) {
  const insets = useSafeAreaInsets();
  const bottom = Math.max(insets.bottom, spacing.sm) + tabBar.bottomGap;

  return (
    <View pointerEvents="box-none" style={[styles.host, { paddingBottom: bottom }]}>
      <GlassSurface
        borderRadius={radius.full}
        intensity={55}
        style={styles.pill}
        contentStyle={styles.pillContent}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const label =
            options.tabBarAccessibilityLabel ??
            (typeof options.title === 'string' ? options.title : route.name);
          const icons =
            TAB_ICONS[route.name as RouteName] ?? TAB_ICONS.index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={label}
              onPress={onPress}
              onLongPress={onLongPress}
              style={({ pressed }) => [styles.item, pressed && { opacity: 0.85 }]}>
              <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                <SymbolView
                  name={icons}
                  tintColor={focused ? colors.glassActiveIconTint : colors.textSecondary}
                  size={focused && route.name === 'create' ? 28 : 24}
                />
              </View>
            </Pressable>
          );
        })}
      </GlassSurface>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  pill: {
    width: '100%',
    maxWidth: 420,
    minHeight: tabBar.pillHeight,
  },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    minHeight: tabBar.pillHeight,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Active = white square behind icon (no glow). */
  iconWrapActive: {
    backgroundColor: colors.glassActiveIcon,
  },
});
