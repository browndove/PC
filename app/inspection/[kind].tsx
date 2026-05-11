import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect, Stack, useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  useFonts,
} from '@expo-google-fonts/montserrat';

import { Calm } from '@/theme/calm';
import { useScaledStyles } from '@/hooks/useResponsive';
import { INSPECTION_ENTRY_TYPES, type InspectionEntryKind } from '@/theme/inspection-entry-types';

export default function InspectionKindScreen() {
  const styles = useScaledStyles(baseStyles);
  const { kind } = useLocalSearchParams<{ kind: string }>();
  const insets = useSafeAreaInsets();
  const [loaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  const entry = INSPECTION_ENTRY_TYPES.find((t) => t.id === (kind as InspectionEntryKind));

  if (!loaded) {
    return null;
  }

  if (entry?.id === 'routine') {
    return <Redirect href="/inspection/routine/pharmacy/part1" />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: entry?.label ?? 'Inspection',
          headerBackTitle: 'Home',
          headerTintColor: Calm.primary,
          headerStyle: { backgroundColor: Calm.background },
        }}
      />
      <View style={[styles.screen, { paddingTop: 8, paddingBottom: insets.bottom + 24 }]}>
        <StatusBar style="dark" />
        <Text style={styles.lead}>
          {entry
            ? (entry.description ??
              'This inspection type will open here—forms can be wired next.')
            : 'Unknown inspection type.'}
        </Text>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go back</Text>
        </Pressable>
      </View>
    </>
  );
}

const baseStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eef2f8',
    paddingHorizontal: 24,
  },
  lead: {
    fontSize: 15,
    lineHeight: 22,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 16,
  },
  button: {
    marginTop: 24,
    alignSelf: 'flex-start',
    backgroundColor: Calm.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 15,
  },
});
