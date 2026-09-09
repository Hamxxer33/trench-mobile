import { Tabs } from 'expo-router';

import { FloatingTabBar } from '@/components/FloatingTabBar';
import { colors } from '@/theme';

/** Nav locked to Figma: Feed | Groups | Create | Portfolio | Wallet */
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.textMuted,
        sceneStyle: { backgroundColor: colors.background },
      }}>
      <Tabs.Screen name="index" options={{ title: 'Feed' }} />
      <Tabs.Screen name="live" options={{ title: 'Groups' }} />
      <Tabs.Screen name="create" options={{ title: 'Create' }} />
      <Tabs.Screen name="portfolio" options={{ title: 'Portfolio' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} />
    </Tabs>
  );
}
