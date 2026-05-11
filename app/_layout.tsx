import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { IosToastProvider } from '@/components/ios-style-toast';
import { AuthSessionProvider } from '@/context/auth-session';
import { SelectedRegionProvider } from '@/context/selected-region';
import { SignUpDraftProvider } from '@/context/sign-up-draft';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  initialRouteName: 'login',
};

function RootStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up-password" options={{ headerShown: false }} />
      <Stack.Screen name="logo-intro" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="home" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="inspection" options={{ headerShown: false }} />
      {/* Routine type picker — iOS slide-up sheet (~42% detent) */}
      <Stack.Screen
        name="routine/index"
        options={{
          presentation: 'formSheet',
          headerShown: false,
          gestureEnabled: true,
          sheetAllowedDetents: [0.42],
          sheetGrabberVisible: true,
          sheetCornerRadius: 24,
          contentStyle: { backgroundColor: '#F5F7FB' },
        }}
      />
      <Stack.Screen name="routine/[type]" options={{ headerShown: true }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <IosToastProvider>
        <AuthSessionProvider>
          <SelectedRegionProvider>
            <SignUpDraftProvider>
              <RootStack />
              <StatusBar style="auto" />
            </SignUpDraftProvider>
          </SelectedRegionProvider>
        </AuthSessionProvider>
      </IosToastProvider>
    </ThemeProvider>
  );
}
