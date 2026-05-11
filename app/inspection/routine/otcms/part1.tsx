import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useSelectedRegion } from '@/context/selected-region';
import { FormPickerField } from '@/components/forms/form-picker-field';
import { FormScreenAtmosphere } from '@/components/forms/form-screen-atmosphere';
import { FormTextField } from '@/components/forms/form-text-field';
import { IosFieldCard } from '@/components/forms/ios-grouped-card';
import {
  OTCMS_ROUTINE_STEP_LABELS,
  RoutineIntroCard,
} from '@/components/forms/routine-intro-card';
import { YesNoRow } from '@/components/forms/yes-no-row';
import type { OtcmsRoutinePart1Draft } from '@/types/otcms-routine';

export type { OtcmsRoutinePart1Draft } from '@/types/otcms-routine';

const BG = '#F5F7FB';
const SECONDARY = '#787880';
const BODY = '#000000';
const VALUE_MUTED = '#3C3C43';
const BLUE = '#007AFF';
const PART_INDEX = 1;
const PART_TOTAL = 3;

const emptyPart1 = (): OtcmsRoutinePart1Draft => ({
  facilityName: '',
  region: '',
  signboard: null,
  conformsToStandards: null,
  facilityRegistered: null,
  licenseValid: null,
  licenseDisplayed: null,
  atLicensedLocation: null,
  visitOrder: null,
  inspectorComment: '',
});

export default function OtcmsRoutinePart1Screen() {
  const insets = useSafeAreaInsets();
  const { selectedRegion } = useSelectedRegion();
  const [form, setForm] = useState<OtcmsRoutinePart1Draft>(emptyPart1);

  useEffect(() => {
    if (!selectedRegion) return;
    setForm((prev) => {
      if (prev.region.trim() !== '') return prev;
      return { ...prev, region: selectedRegion };
    });
  }, [selectedRegion]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'General Information',
          headerLargeTitle: Platform.OS === 'ios',
          headerBackTitle: 'Routine',
          headerTintColor: BLUE,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: BG },
          headerLargeStyle: { backgroundColor: BG },
          headerLargeTitleStyle: { fontWeight: '700', color: BODY },
          headerTitleStyle: { fontWeight: '600', color: BODY },
          contentStyle: { backgroundColor: BG },
        }}
      />
      <StatusBar style="dark" />

      <View style={styles.screen}>
        <FormScreenAtmosphere />
        <KeyboardAvoidingView
          style={[styles.flex, styles.foreground]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}>
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: insets.bottom + 88 },
            ]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="automatic">
            <RoutineIntroCard
              step={PART_INDEX}
              total={PART_TOTAL}
              description="Facility identity, licence visibility, visit order, and inspector notes."
              stepLabels={OTCMS_ROUTINE_STEP_LABELS}
            />

            <Text style={styles.sectionHeader}>FACILITY</Text>
            <IosFieldCard>
              <FormTextField
                label="Name of facility"
                value={form.facilityName}
                onChangeText={(t) => setForm((f) => ({ ...f, facilityName: t }))}
                placeholder="Required"
                placeholderTextColor={VALUE_MUTED}
                autoCapitalize="words"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Region"
                value={form.region}
                onChangeText={(t) => setForm((f) => ({ ...f, region: t }))}
                placeholder="Region"
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>

            <Text style={styles.sectionHeader}>LICENCE & PREMISES</Text>
            <IosFieldCard>
              <YesNoRow
                label="Is there a signboard?"
                value={form.signboard}
                onChange={(v) => setForm((f) => ({ ...f, signboard: v }))}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Does it conform to standards?"
                value={form.conformsToStandards}
                onChange={(v) =>
                  setForm((f) => ({ ...f, conformsToStandards: v }))
                }
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Is the facility registered?"
                value={form.facilityRegistered}
                onChange={(v) =>
                  setForm((f) => ({ ...f, facilityRegistered: v }))
                }
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Is the license valid?"
                value={form.licenseValid}
                onChange={(v) => setForm((f) => ({ ...f, licenseValid: v }))}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Is the license displayed?"
                value={form.licenseDisplayed}
                onChange={(v) =>
                  setForm((f) => ({ ...f, licenseDisplayed: v }))
                }
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Is the facility located at the licensed location?"
                value={form.atLicensedLocation}
                onChange={(v) =>
                  setForm((f) => ({ ...f, atLicensedLocation: v }))
                }
              />
            </IosFieldCard>

            <Text style={styles.sectionHeader}>VISIT & INSPECTOR</Text>
            <IosFieldCard>
              <FormPickerField
                label="Number of visit"
                value={form.visitOrder}
                options={[
                  { value: '1', label: '1st visit' },
                  { value: '2', label: '2nd visit' },
                  { value: '3', label: '3rd visit' },
                ]}
                onChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    visitOrder: v as OtcmsRoutinePart1Draft['visitOrder'],
                  }))
                }
                placeholder="Select visit…"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Inspector's comment / recommendation"
                value={form.inspectorComment}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, inspectorComment: t }))
                }
                placeholder="Optional"
                placeholderTextColor={VALUE_MUTED}
                multiline
                minInputHeight={120}
              />
            </IosFieldCard>
          </ScrollView>

          <View
            style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
            <Pressable
              onPress={() => {
                if (Platform.OS === 'ios')
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/inspection/routine/otcms/part2');
              }}
              style={({ pressed }) => [
                styles.cta,
                pressed && { opacity: 0.88 },
              ]}>
              <Text style={styles.ctaLabel}>Continue</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  flex: { flex: 1 },
  foreground: { zIndex: 1 },
  scrollContent: { paddingTop: 10 },
  sectionHeader: {
    marginTop: 22,
    marginBottom: 8,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 13,
    fontWeight: '400',
    color: SECONDARY,
    letterSpacing: 0.78,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: BG,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
  },
  cta: {
    height: 50,
    borderRadius: 12,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
    letterSpacing: -0.41,
  },
});
