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
import { YesNoRow } from '@/components/forms/yes-no-row';
import type {
  OtherPharmacistRow,
  PharmacyRoutinePart2Draft,
  TechOrMcaRow,
} from '@/types/pharmacy-routine';

const BG = '#F5F7FB';
const SECONDARY = '#787880';
const BODY = '#000000';
const VALUE_MUTED = '#3C3C43';
const BLUE = '#007AFF';
const PART_INDEX = 2;
const PART_TOTAL = 4;

const emptyPharmacist = (): OtherPharmacistRow => ({
  name: '',
  regNo: '',
  designation: '',
  qualification: '',
  present: null,
  nameTag: null,
});

const emptyTech = (): TechOrMcaRow => ({
  name: '',
  registration: null,
  pin: '',
  qualification: '',
  present: null,
  dressNameTag: '',
});

const emptyPart2 = (): PharmacyRoutinePart2Draft => ({
  superintendentName: '',
  superintendentRegNo: '',
  superintendentPresent: null,
  superintendentNameTag: null,
  otherPharmacists: [emptyPharmacist()],
  technicians: [emptyTech()],
  mcas: [emptyTech()],
  pharmacistAbsentInChargeName: '',
  pharmacistAbsentInChargeQualification: '',
});

export default function PharmacyRoutinePart2Screen() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState<PharmacyRoutinePart2Draft>(emptyPart2);
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
            contentContainerStyle={{ paddingTop: 10, paddingBottom: insets.bottom + 88 }}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic">
            <RoutineIntroCard
              step={PART_INDEX}
              total={PART_TOTAL}
              description="Pharmacists on duty, support staff, and who is in charge if the pharmacist is absent."
            />

            <Text style={s.subsection}>A. Pharmacist(s)</Text>

            <Text style={s.sectionHeader}>SUPERINTENDENT</Text>
            <IosFieldCard>
              <FormTextField
                label="Superintendent pharmacist name"
                value={form.superintendentName}
                onChangeText={(t) => setForm((f) => ({ ...f, superintendentName: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Superintendent pharmacist reg. no."
                value={form.superintendentRegNo}
                onChangeText={(t) => setForm((f) => ({ ...f, superintendentRegNo: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Superintendent present?"
                value={form.superintendentPresent}
                onChange={(v) => setForm((f) => ({ ...f, superintendentPresent: v }))}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Superintendent name tag?"
                value={form.superintendentNameTag}
                onChange={(v) => setForm((f) => ({ ...f, superintendentNameTag: v }))}
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>OTHER PHARMACISTS</Text>
            {form.otherPharmacists.map((row, idx) => (
              <View key={`op-${idx}`}>
                <IosFieldCard>
                  <FormTextField
                    label="Name"
                    value={row.name}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.otherPharmacists];
                        next[idx] = { ...next[idx], name: t };
                        return { ...f, otherPharmacists: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <FormTextField
                    label="Reg. no."
                    value={row.regNo}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.otherPharmacists];
                        next[idx] = { ...next[idx], regNo: t };
                        return { ...f, otherPharmacists: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <FormTextField
                    label="Designation / Responsibility"
                    value={row.designation}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.otherPharmacists];
                        next[idx] = { ...next[idx], designation: t };
                        return { ...f, otherPharmacists: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <FormTextField
                    label="Qualification"
                    value={row.qualification}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.otherPharmacists];
                        next[idx] = { ...next[idx], qualification: t };
                        return { ...f, otherPharmacists: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <YesNoRow
                    label="Present?"
                    value={row.present}
                    onChange={(v) =>
                      setForm((f) => {
                        const next = [...f.otherPharmacists];
                        next[idx] = { ...next[idx], present: v };
                        return { ...f, otherPharmacists: next };
                      })
                    }
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <YesNoRow
                    label="Name tag?"
                    value={row.nameTag}
                    onChange={(v) =>
                      setForm((f) => {
                        const next = [...f.otherPharmacists];
                        next[idx] = { ...next[idx], nameTag: v };
                        return { ...f, otherPharmacists: next };
                      })
                    }
                  />
                </IosFieldCard>
                {form.otherPharmacists.length > 1 ? (
                  <Pressable
                    style={s.removeBtn}
                    onPress={() =>
                      setForm((f) => ({
                        ...f,
                        otherPharmacists: f.otherPharmacists.filter((_, i) => i !== idx),
                      }))
                    }>
                    <Text style={s.removeTxt}>Remove</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
            <Pressable
              style={s.addBtn}
              onPress={() =>
                setForm((f) => ({
                  ...f,
                  otherPharmacists: [...f.otherPharmacists, emptyPharmacist()],
                }))
              }>
              <Text style={s.addTxt}>Add other pharmacist</Text>
            </Pressable>

            <Text style={s.subsection}>B. Support Staff</Text>
            <Text style={s.sectionHeader}>PHARMACY TECHNICIANS</Text>
            {form.technicians.map((row, idx) => (
              <TechBlock
                key={`tech-${idx}`}
                row={row}
                idx={idx}
                list={form.technicians}
                setList={(next) => setForm((f) => ({ ...f, technicians: next }))}
              />
            ))}
            <Pressable
              style={s.addBtn}
              onPress={() =>
                setForm((f) => ({ ...f, technicians: [...f.technicians, emptyTech()] }))
              }>
              <Text style={s.addTxt}>Add pharmacy technician</Text>
            </Pressable>

            <Text style={s.sectionHeader}>MEDICINE COUNTER ASSISTANTS</Text>
            {form.mcas.map((row, idx) => (
              <TechBlock
                key={`mca-${idx}`}
                row={row}
                idx={idx}
                list={form.mcas}
                setList={(next) => setForm((f) => ({ ...f, mcas: next }))}
              />
            ))}
            <Pressable
              style={s.addBtn}
              onPress={() => setForm((f) => ({ ...f, mcas: [...f.mcas, emptyTech()] }))}>
              <Text style={s.addTxt}>Add MCA</Text>
            </Pressable>

            <Text style={s.sectionHeader}>IF PHARMACIST ABSENT</Text>
            <IosFieldCard>
              <FormTextField
                label="Name of person in charge"
                value={form.pharmacistAbsentInChargeName}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, pharmacistAbsentInChargeName: t }))
                }
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Qualification of person in charge"
                value={form.pharmacistAbsentInChargeQualification}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, pharmacistAbsentInChargeQualification: t }))
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
                router.push('/inspection/routine/pharmacy/part3');
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

function TechBlock({
  row,
  idx,
  list,
  setList,
}: {
  row: TechOrMcaRow;
  idx: number;
  list: TechOrMcaRow[];
  setList: (next: TechOrMcaRow[]) => void;
}) {
  const patch = (patch: Partial<TechOrMcaRow>) => {
    const next = [...list];
    next[idx] = { ...next[idx], ...patch };
    setList(next);
  };
  return (
    <View>
      <IosFieldCard>
        <FormTextField
          label="Name"
          value={row.name}
          onChangeText={(t) => patch({ name: t })}
          placeholderTextColor={VALUE_MUTED}
        />
      </IosFieldCard>
      <IosFieldCard>
        <YesNoRow
          label="Registration"
          value={row.registration}
          onChange={(v) => patch({ registration: v })}
        />
      </IosFieldCard>
      {row.registration === true ? (
        <IosFieldCard>
          <FormTextField
            label="PIN (if registered)"
            value={row.pin}
            onChangeText={(t) => patch({ pin: t })}
            placeholderTextColor={VALUE_MUTED}
          />
        </IosFieldCard>
      ) : null}
      <IosFieldCard>
        <FormTextField
          label="Qualification"
          value={row.qualification}
          onChangeText={(t) => patch({ qualification: t })}
          placeholderTextColor={VALUE_MUTED}
        />
      </IosFieldCard>
      <IosFieldCard>
        <YesNoRow
          label="Present?"
          value={row.present}
          onChange={(v) => patch({ present: v })}
        />
      </IosFieldCard>
      <IosFieldCard>
        <FormTextField
          label="Prescribed dress code / Name tag"
          value={row.dressNameTag}
          onChangeText={(t) => patch({ dressNameTag: t })}
          placeholderTextColor={VALUE_MUTED}
        />
      </IosFieldCard>
      {list.length > 1 ? (
        <Pressable
          style={s.removeBtn}
          onPress={() => setList(list.filter((_, i) => i !== idx))}>
          <Text style={s.removeTxt}>Remove</Text>
        </Pressable>
      ) : null}
    </View>
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
