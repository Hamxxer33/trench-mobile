import { DarkTheme, Stack, ThemeProvider, useRouter, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { WalletProvider, useWallet } from '@/components/WalletContext';
import { colors } from '@/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'login',
};

SplashScreen.preventAutoHideAsync();

/** Dark-only theme (Figma lock) — never switch to LightTheme. */
const trenchTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.baseBlue,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.baseBlue,
  },
};

const PUBLIC_SEGMENTS = new Set(['login', 'legal', 'g']);

/** Gate unsigned users to /login; allow legal + invite preview. */
function AuthGate({ children }: { children: React.ReactNode }) {
  const { wallet } = useWallet();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const root = segments[0] as string | undefined;
    const onPublic = !root || PUBLIC_SEGMENTS.has(root);
    if (!wallet && !onPublic) {
      router.replace('/login');
    } else if (wallet && root === 'login') {
      router.replace('/(tabs)');
    }
  }, [wallet, segments, router]);

  return <>{children}</>;
}

const stackHeader = {
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.text,
  headerShadowVisible: false,
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <WalletProvider>
      <ThemeProvider value={trenchTheme}>
        <StatusBar style="light" />
        <AuthGate>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="coin/[id]" options={{ title: 'Coin', ...stackHeader }} />
            <Stack.Screen name="groups/new" options={{ title: 'Create group', ...stackHeader }} />
            <Stack.Screen name="groups/[id]" options={{ title: 'Group', ...stackHeader }} />
            <Stack.Screen name="groups/join" options={{ title: 'Join', ...stackHeader }} />
            <Stack.Screen name="g/[code]" options={{ title: 'Join group', ...stackHeader }} />
            <Stack.Screen name="settings" options={{ title: 'Settings', ...stackHeader }} />
            <Stack.Screen name="legal/terms" options={{ title: 'Terms', ...stackHeader }} />
            <Stack.Screen name="legal/privacy" options={{ title: 'Privacy', ...stackHeader }} />
            <Stack.Screen name="legal/risk" options={{ title: 'Risk', ...stackHeader }} />
            <Stack.Screen name="legal/licenses" options={{ title: 'Licenses', ...stackHeader }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AuthGate>
      </ThemeProvider>
    </WalletProvider>
  );
}
