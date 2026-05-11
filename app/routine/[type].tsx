import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect, Stack, useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';

import { Calm } from '@/theme/calm';
import { useScaledStyles } from '@/hooks/useResponsive';

type RoutineType = 'pharmacy' | 'otcm';

const COPY: Record<RoutineType, { title: string; tagline: string; description: string }> = {
  pharmacy: {
    title: 'Pharmacy Inspection',
    tagline: 'Form A · GPC-01',
    description:
      'Licensed pharmacy routine inspection form. Sections will cover premises, personnel, dispensing practice, and records.',
  },
  otcm: {
    title: 'OTCMS Inspection',
    tagline: 'Form B · GPC-02',
    description:
      'Over-The-Counter Medicine Seller routine inspection form. Sections will cover registration, storage, handling, and record-keeping.',
  },
};

export default function RoutineTypeScreen() {
  const styles = useScaledStyles(baseStyles);
  const { type } = useLocalSearchParams<{ type: string }>();
  const insets = useSafeAreaInsets();
  const [loaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const resolved = (type as RoutineType) ?? 'pharmacy';
  const copy = COPY[resolved] ?? COPY.pharmacy;

  if (!loaded) {
    return null;
  }

  /** Part 1 (and follow-ons) live under `inspection/routine/…` — sheet opens `/routine/pharmacy` here. */
  if (resolved === 'pharmacy') {
    return <Redirect href="/inspection/routine/pharmacy/part1" />;
  }

  if (resolved === 'otcm') {
    return <Redirect href="/inspection/routine/otcms/part1" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: copy.title,
          headerBackTitle: 'Routine',
          headerTintColor: Calm.primary,
          headerStyle: { backgroundColor: Calm.background },
        }}
      />
      <View
        style={[
          styles.screen,
          { paddingBottom: insets.bottom + 24 },
        ]}>
        <StatusBar style="dark" />

        <View style={styles.card}>
          <View style={styles.metaRow}>
            <View style={styles.eyebrowDot} />
            <Text style={styles.metaText}>{copy.tagline}</Text>
          </View>
          <Text style={styles.title}>{copy.title}</Text>
          <Text style={styles.description}>{copy.description}</Text>

          <View style={styles.soonRow}>
            <Ionicons name="construct-outline" size={16} color={Calm.textSubtle} />
            <Text style={styles.soonText}>Form sections coming soon.</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={18} color="#ffffff" />
          <Text style={styles.buttonText}>Back to type selection</Text>
        </Pressable>
      </View>
    </>
  );
}

const baseStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDEFF3',
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Calm.primarySoft,
  },
  metaText: {
    fontSize: 11,
    color: Calm.textSubtle,
    fontFamily: 'Montserrat_700Bold',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 22,
    lineHeight: 28,
    color: Calm.primary,
    fontFamily: 'Montserrat_700Bold',
    letterSpacing: -0.2,
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
  soonRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E8ECF2',
  },
  soonText: {
    fontSize: 12,
    color: Calm.textSubtle,
    fontFamily: 'Montserrat_500Medium',
  },
  button: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Calm.primary,
    paddingVertical: 14,
    borderRadius: Calm.radiusPill,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    letterSpacing: 0.2,
  },
});
