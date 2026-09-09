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

/** Gate unsigned users to /login; bounce signed-in users off login → Feed. */
function AuthGate({ children }: { children: React.ReactNode }) {
  const { wallet } = useWallet();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const onLogin = segments[0] === 'login';
    if (!wallet && !onLogin) {
      router.replace('/login');
    } else if (wallet && onLogin) {
      router.replace('/(tabs)');
    }
  }, [wallet, segments, router]);

  return <>{children}</>;
}

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
            <Stack.Screen
              name="coin/[id]"
              options={{
                title: 'Coin',
                headerStyle: { backgroundColor: colors.surface },
                headerTintColor: colors.text,
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AuthGate>
      </ThemeProvider>
    </WalletProvider>
  );
}
