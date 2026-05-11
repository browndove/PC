import { useState } from 'react';
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

import { FormScreenAtmosphere } from '@/components/forms/form-screen-atmosphere';
import { FormTextField } from '@/components/forms/form-text-field';
import { IosFieldCard } from '@/components/forms/ios-grouped-card';
import {
  OTCMS_ROUTINE_STEP_LABELS,
  RoutineIntroCard,
} from '@/components/forms/routine-intro-card';
import { YesNoRow } from '@/components/forms/yes-no-row';
import type {
  OtcmsAssistantRow,
  OtcmsRoutinePart2Draft,
} from '@/types/otcms-routine';

const BG = '#F5F7FB';
const SECONDARY = '#787880';
const BODY = '#000000';
const VALUE_MUTED = '#3C3C43';
const BLUE = '#007AFF';
const PART_INDEX = 2;
const PART_TOTAL = 3;

const emptyAssistant = (): OtcmsAssistantRow => ({
  name: '',
  highestEducation: '',
  yearOfQualification: '',
  yearsInPractice: '',
  registeredWithCouncil: null,
});

const emptyPart2 = (): OtcmsRoutinePart2Draft => ({
  licenceHolderPresent: null,
  assistants: [emptyAssistant()],
  absentInChargeName: '',
  absentInChargeQualification: '',
});

export default function OtcmsRoutinePart2Screen() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState<OtcmsRoutinePart2Draft>(emptyPart2);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Staffing',
          headerLargeTitle: Platform.OS === 'ios',
          headerBackTitle: 'Part I',
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

      <View style={s.screen}>
        <FormScreenAtmosphere />
        <KeyboardAvoidingView
          style={[s.flex, s.foreground]}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            style={s.flex}
            contentContainerStyle={{
              paddingTop: 10,
              paddingBottom: insets.bottom + 88,
            }}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic">
            <RoutineIntroCard
              step={PART_INDEX}
              total={PART_TOTAL}
              description="Licence holder presence, OTCMS assistants, and person in charge if absent."
              stepLabels={OTCMS_ROUTINE_STEP_LABELS}
            />

            <Text style={s.sectionHeader}>LICENCE HOLDER</Text>
            <IosFieldCard>
              <YesNoRow
                label="Licence holder present at time of inspection?"
                value={form.licenceHolderPresent}
                onChange={(v) =>
                  setForm((f) => ({ ...f, licenceHolderPresent: v }))
                }
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>OTCMS ASSISTANTS</Text>
            {form.assistants.map((row, idx) => (
              <View key={`asst-${idx}`}>
                <Text style={s.subsection}>Assistant {idx + 1}</Text>
                <IosFieldCard>
                  <FormTextField
                    label="Name (surname first)"
                    value={row.name}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.assistants];
                        next[idx] = { ...next[idx], name: t };
                        return { ...f, assistants: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                    autoCapitalize="words"
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <FormTextField
                    label="Highest educational background"
                    value={row.highestEducation}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.assistants];
                        next[idx] = { ...next[idx], highestEducation: t };
                        return { ...f, assistants: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <FormTextField
                    label="Year of qualification"
                    value={row.yearOfQualification}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.assistants];
                        next[idx] = { ...next[idx], yearOfQualification: t };
                        return { ...f, assistants: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                    keyboardType="number-pad"
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <FormTextField
                    label="Number of years in practice"
                    value={row.yearsInPractice}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.assistants];
                        next[idx] = { ...next[idx], yearsInPractice: t };
                        return { ...f, assistants: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                    keyboardType="number-pad"
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <YesNoRow
                    label="Registered with Pharmacy Council?"
                    value={row.registeredWithCouncil}
                    onChange={(v) =>
                      setForm((f) => {
                        const next = [...f.assistants];
                        next[idx] = { ...next[idx], registeredWithCouncil: v };
                        return { ...f, assistants: next };
                      })
                    }
                  />
                </IosFieldCard>
                {form.assistants.length > 1 ? (
                  <Pressable
                    style={s.removeBtn}
                    onPress={() =>
                      setForm((f) => ({
                        ...f,
                        assistants: f.assistants.filter((_, i) => i !== idx),
                      }))
                    }>
                    <Text style={s.removeTxt}>Remove assistant</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
            <Pressable
              style={s.addBtn}
              onPress={() =>
                setForm((f) => ({
                  ...f,
                  assistants: [...f.assistants, emptyAssistant()],
                }))
              }>
              <Text style={s.addTxt}>Add OTCMS assistant</Text>
            </Pressable>

            <Text style={s.sectionHeader}>IF ABSENT</Text>
            <IosFieldCard>
              <FormTextField
                label="Name of person in charge"
                value={form.absentInChargeName}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, absentInChargeName: t }))
                }
                placeholderTextColor={VALUE_MUTED}
                autoCapitalize="words"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Qualification of person in charge"
                value={form.absentInChargeQualification}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, absentInChargeQualification: t }))
                }
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
          </ScrollView>

          <View style={[s.footer, { paddingBottom: insets.bottom + 16 }]}>
            <Pressable
              onPress={() => {
                if (Platform.OS === 'ios')
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/inspection/routine/otcms/part3');
              }}
              style={({ pressed }) => [s.cta, pressed && { opacity: 0.88 }]}>
              <Text style={s.ctaLabel}>Continue</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  flex: { flex: 1 },
  foreground: { zIndex: 1 },
  subsection: {
    marginTop: 18,
    marginLeft: 16,
    marginBottom: 4,
    fontSize: 14,
    fontWeight: '600',
    color: BODY,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 16,
    fontSize: 13,
    fontWeight: '400',
    color: SECONDARY,
    letterSpacing: 0.78,
    textTransform: 'uppercase',
  },
  addBtn: { marginLeft: 16, marginTop: 8, marginBottom: 8 },
  addTxt: { fontSize: 17, color: BLUE, fontWeight: '400' },
  removeBtn: { paddingHorizontal: 16, paddingVertical: 10 },
  removeTxt: { fontSize: 15, color: '#FF3B30' },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: BG,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  cta: {
    height: 50,
    borderRadius: 12,
    backgroundColor: BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: { color: '#FFF', fontSize: 17, fontWeight: '500' },
});
