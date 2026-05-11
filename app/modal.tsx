import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';

import { Calm } from '@/theme/calm';
import { useScaledStyles } from '@/hooks/useResponsive';

export default function ModalScreen() {
  const styles = useScaledStyles(baseStyles);
  const insets = useSafeAreaInsets();
  const [loaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Sheet</Text>
        <Text style={styles.subtitle}>Minimal overlays stay in the same quiet style.</Text>
        <Pressable style={styles.button} onPress={() => router.dismiss()}>
          <Text style={styles.buttonText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Calm.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 12,
  },
  title: {
    fontSize: 22,
    color: Calm.primary,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
    maxWidth: 320,
  },
  button: {
    marginTop: 20,
    backgroundColor: Calm.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: Calm.radiusPill,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'Montserrat_600SemiBold',
  },
});
