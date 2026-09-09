import { SymbolView } from 'expo-symbols';
import { Tabs } from 'expo-router';

import { colors } from '@/theme';

/** Nav locked to Figma: Feed | Live | Create | Portfolio | Wallet */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'flame.fill',
                android: 'local_fire_department',
                web: 'local_fire_department',
              }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'video.fill',
                android: 'videocam',
                web: 'videocam',
              }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'plus.circle.fill',
                android: 'add_circle',
                web: 'add_circle',
              }}
              tintColor={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'chart.pie.fill',
                android: 'pie_chart',
                web: 'pie_chart',
              }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{
                ios: 'wallet.pass.fill',
                android: 'account_balance_wallet',
                web: 'account_balance_wallet',
              }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
    </Tabs>
  );
}
