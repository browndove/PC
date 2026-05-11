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
import { RoutineIntroCard } from '@/components/forms/routine-intro-card';
import type { PharmacyRoutinePart5Draft } from '@/types/pharmacy-routine';

export type { PharmacyRoutinePart5Draft } from '@/types/pharmacy-routine';

const BG = '#F5F7FB';
const SECONDARY = '#787880';
const BODY = '#000000';
const VALUE_MUTED = '#3C3C43';
const BLUE = '#007AFF';
const PART_INDEX = 4;
const PART_TOTAL = 4;

const empty = (): PharmacyRoutinePart5Draft => ({
  remarks: '',
  improvementPlans: '',
  inspector1Name: '',
  inspector2Name: '',
  inspector3Name: '',
  teamLeaderSignature: '',
  inspectionDate: '',
  timeIn: '',
  responsibleStaffName: '',
  responsibleDesignation: '',
  responsibleSignature: '',
  responsibleMobile: '',
  responsibleEmail: '',
  timeOut: '',
});

export default function PharmacyRoutinePart5Screen() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState<PharmacyRoutinePart5Draft>(empty);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Inspector's Findings",
          headerLargeTitle: Platform.OS === 'ios',
          headerBackTitle: 'Part III',
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
            contentContainerStyle={{ paddingTop: 10, paddingBottom: insets.bottom + 88 }}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic">
            <RoutineIntroCard
              step={PART_INDEX}
              total={PART_TOTAL}
              description="Remarks, improvement plans, inspection team, and responsible staff sign-off."
            />

            <Text style={s.sectionHeader}>A. REMARKS</Text>
            <IosFieldCard>
              <FormTextField
                label="Remarks"
                value={form.remarks}
                onChangeText={(t) => setForm((f) => ({ ...f, remarks: t }))}
                placeholderTextColor={VALUE_MUTED}
                multiline
                minInputHeight={100}
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>B. PLANS TO IMPROVE</Text>
            <IosFieldCard>
              <FormTextField
                label="Plans to improve identified unsatisfactory conditions"
                value={form.improvementPlans}
                onChangeText={(t) => setForm((f) => ({ ...f, improvementPlans: t }))}
                placeholderTextColor={VALUE_MUTED}
                multiline
                minInputHeight={100}
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>INSPECTION TEAM</Text>
            <IosFieldCard>
              <FormTextField
                label="Inspector 1 name"
                value={form.inspector1Name}
                onChangeText={(t) => setForm((f) => ({ ...f, inspector1Name: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Inspector 2 name"
                value={form.inspector2Name}
                onChangeText={(t) => setForm((f) => ({ ...f, inspector2Name: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Inspector 3 name"
                value={form.inspector3Name}
                onChangeText={(t) => setForm((f) => ({ ...f, inspector3Name: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Signature of team leader"
                value={form.teamLeaderSignature}
                onChangeText={(t) => setForm((f) => ({ ...f, teamLeaderSignature: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Date of inspection"
                value={form.inspectionDate}
                onChangeText={(t) => setForm((f) => ({ ...f, inspectionDate: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Time in"
                value={form.timeIn}
                onChangeText={(t) => setForm((f) => ({ ...f, timeIn: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>RESPONSIBLE STAFF</Text>
            <IosFieldCard>
              <FormTextField
                label="Name of responsible staff"
                value={form.responsibleStaffName}
                onChangeText={(t) => setForm((f) => ({ ...f, responsibleStaffName: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Designation"
                value={form.responsibleDesignation}
                onChangeText={(t) => setForm((f) => ({ ...f, responsibleDesignation: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Signature"
                value={form.responsibleSignature}
                onChangeText={(t) => setForm((f) => ({ ...f, responsibleSignature: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Mobile"
                value={form.responsibleMobile}
                onChangeText={(t) => setForm((f) => ({ ...f, responsibleMobile: t }))}
                placeholderTextColor={VALUE_MUTED}
                keyboardType="phone-pad"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Email"
                value={form.responsibleEmail}
                onChangeText={(t) => setForm((f) => ({ ...f, responsibleEmail: t }))}
                placeholderTextColor={VALUE_MUTED}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Time out"
                value={form.timeOut}
                onChangeText={(t) => setForm((f) => ({ ...f, timeOut: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
          </ScrollView>

          <View style={[s.footer, { paddingBottom: insets.bottom + 16 }]}>
            <Pressable
              onPress={() => {
                if (Platform.OS === 'ios')
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                router.replace('/(tabs)');
              }}
              style={({ pressed }) => [s.cta, pressed && { opacity: 0.88 }]}>
              <Text style={s.ctaLabel}>Done</Text>
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
  sectionHeader: {
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 16,
    fontSize: 13,
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
