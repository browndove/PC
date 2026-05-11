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
  ConfiscatedProductRow,
  OtcmsChecklistDraft,
  OtcmsRoutinePart3Draft,
} from '@/types/otcms-routine';

const BG = '#F5F7FB';
const SECONDARY = '#787880';
const BODY = '#000000';
const VALUE_MUTED = '#3C3C43';
const BLUE = '#007AFF';
const PART_INDEX = 3;
const PART_TOTAL = 3;

function emptyChecklist(): OtcmsChecklistDraft {
  return {
    g_clean: null,
    g_light: null,
    g_vent: null,
    g_walls: null,
    g_floor: null,
    g_wash: null,
    r_sales: null,
    r_invoices: null,
    r_electronic: null,
    p_class_ab: null,
    p_substandard: null,
    w_book: null,
    w_proc: null,
  };
}

function emptyConfiscatedRow(): ConfiscatedProductRow {
  return {
    productName: '',
    quantity: '',
    batchNumber: '',
    expiryDate: '',
  };
}

const emptyPart3 = (): OtcmsRoutinePart3Draft => ({
  checklist: emptyChecklist(),
  confiscated: [emptyConfiscatedRow()],
  otcmsName: '',
  location: '',
  remarksAction: '',
  inspector1Name: '',
  inspector2Name: '',
  inspector3Name: '',
  teamLeaderSignature: '',
  inspectionDate: '',
  inspectionTime: '',
  licenceHolderName: '',
  licenceHolderSignature: '',
  mobile: '',
  email: '',
  acknowledgementDate: '',
});

export default function OtcmsRoutinePart3Screen() {
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState<OtcmsRoutinePart3Draft>(emptyPart3);

  const setCheck = <K extends keyof OtcmsChecklistDraft>(
    key: K,
    v: OtcmsChecklistDraft[K],
  ) =>
    setForm((f) => ({
      ...f,
      checklist: { ...f.checklist, [key]: v },
    }));

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Checklist & sign-off',
          headerLargeTitle: Platform.OS === 'ios',
          headerBackTitle: 'Part II',
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
              description="Premises checklist, confiscated or quarantined products, and final sign-off."
              stepLabels={OTCMS_ROUTINE_STEP_LABELS}
            />

            <Text style={s.sectionHeader}>1. GENERAL CONDITIONS</Text>
            <IosFieldCard>
              <YesNoRow
                label="Premises is clean, tidy and orderly"
                value={form.checklist.g_clean}
                onChange={(v) => setCheck('g_clean', v)}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Lighting is suitable and effective"
                value={form.checklist.g_light}
                onChange={(v) => setCheck('g_light', v)}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Ventilation adequately provided"
                value={form.checklist.g_vent}
                onChange={(v) => setCheck('g_vent', v)}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Walls are smooth, impermeable and washable"
                value={form.checklist.g_walls}
                onChange={(v) => setCheck('g_walls', v)}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Durability of floor and ease of cleaning"
                value={form.checklist.g_floor}
                onChange={(v) => setCheck('g_floor', v)}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Running water / Veronica bucket / hand waste bin / accessible washrooms"
                value={form.checklist.g_wash}
                onChange={(v) => setCheck('g_wash', v)}
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>2. RECORD KEEPING</Text>
            <IosFieldCard>
              <YesNoRow
                label="Daily sales book available"
                value={form.checklist.r_sales}
                onChange={(v) => setCheck('r_sales', v)}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Copies of invoices available"
                value={form.checklist.r_invoices}
                onChange={(v) => setCheck('r_invoices', v)}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Electronic record for transactions"
                value={form.checklist.r_electronic}
                onChange={(v) => setCheck('r_electronic', v)}
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>3. PRODUCTS & SERVICES</Text>
            <IosFieldCard>
              <YesNoRow
                label="Presence and sale of Class A & B medicines"
                value={form.checklist.p_class_ab}
                onChange={(v) => setCheck('p_class_ab', v)}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Presence of expired, substandard or counterfeit products"
                value={form.checklist.p_substandard}
                onChange={(v) => setCheck('p_substandard', v)}
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>4. WASTE DISPOSAL</Text>
            <IosFieldCard>
              <YesNoRow
                label="Expired drug record book available and up to date"
                value={form.checklist.w_book}
                onChange={(v) => setCheck('w_book', v)}
              />
            </IosFieldCard>
            <IosFieldCard>
              <YesNoRow
                label="Procedures in place for safe disposal of expired medicines"
                value={form.checklist.w_proc}
                onChange={(v) => setCheck('w_proc', v)}
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>
              PRODUCTS CONFISCATED / QUARANTINED (TABLE)
            </Text>
            {form.confiscated.map((row, idx) => (
              <View key={`cf-${idx}`}>
                <Text style={s.subsection}>Row {idx + 1}</Text>
                <IosFieldCard>
                  <FormTextField
                    label="Product name"
                    value={row.productName}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.confiscated];
                        next[idx] = { ...next[idx], productName: t };
                        return { ...f, confiscated: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <FormTextField
                    label="Quantity"
                    value={row.quantity}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.confiscated];
                        next[idx] = { ...next[idx], quantity: t };
                        return { ...f, confiscated: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <FormTextField
                    label="Batch number"
                    value={row.batchNumber}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.confiscated];
                        next[idx] = { ...next[idx], batchNumber: t };
                        return { ...f, confiscated: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                  />
                </IosFieldCard>
                <IosFieldCard>
                  <FormTextField
                    label="Expiry date"
                    value={row.expiryDate}
                    onChangeText={(t) =>
                      setForm((f) => {
                        const next = [...f.confiscated];
                        next[idx] = { ...next[idx], expiryDate: t };
                        return { ...f, confiscated: next };
                      })
                    }
                    placeholderTextColor={VALUE_MUTED}
                  />
                </IosFieldCard>
                {form.confiscated.length > 1 ? (
                  <Pressable
                    style={s.removeBtn}
                    onPress={() =>
                      setForm((f) => ({
                        ...f,
                        confiscated: f.confiscated.filter((_, i) => i !== idx),
                      }))
                    }>
                    <Text style={s.removeTxt}>Remove row</Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
            <Pressable
              style={s.addBtn}
              onPress={() =>
                setForm((f) => ({
                  ...f,
                  confiscated: [...f.confiscated, emptyConfiscatedRow()],
                }))
              }>
              <Text style={s.addTxt}>Add product row</Text>
            </Pressable>

            <Text style={s.sectionHeader}>FINAL SIGN-OFF</Text>
            <IosFieldCard>
              <FormTextField
                label="Name of OTCMS"
                value={form.otcmsName}
                onChangeText={(t) => setForm((f) => ({ ...f, otcmsName: t }))}
                placeholderTextColor={VALUE_MUTED}
                autoCapitalize="words"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Location"
                value={form.location}
                onChangeText={(t) => setForm((f) => ({ ...f, location: t }))}
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Remarks / action taken"
                value={form.remarksAction}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, remarksAction: t }))
                }
                placeholderTextColor={VALUE_MUTED}
                multiline
                minInputHeight={100}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Inspector 1 name"
                value={form.inspector1Name}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, inspector1Name: t }))
                }
                placeholderTextColor={VALUE_MUTED}
                autoCapitalize="words"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Inspector 2 name"
                value={form.inspector2Name}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, inspector2Name: t }))
                }
                placeholderTextColor={VALUE_MUTED}
                autoCapitalize="words"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Inspector 3 name"
                value={form.inspector3Name}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, inspector3Name: t }))
                }
                placeholderTextColor={VALUE_MUTED}
                autoCapitalize="words"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Signature of team leader"
                value={form.teamLeaderSignature}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, teamLeaderSignature: t }))
                }
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Date of inspection"
                value={form.inspectionDate}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, inspectionDate: t }))
                }
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Time"
                value={form.inspectionTime}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, inspectionTime: t }))
                }
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Name of licence holder / responsible staff"
                value={form.licenceHolderName}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, licenceHolderName: t }))
                }
                placeholderTextColor={VALUE_MUTED}
                autoCapitalize="words"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Signature"
                value={form.licenceHolderSignature}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, licenceHolderSignature: t }))
                }
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Mobile"
                value={form.mobile}
                onChangeText={(t) => setForm((f) => ({ ...f, mobile: t }))}
                placeholderTextColor={VALUE_MUTED}
                keyboardType="phone-pad"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Email"
                value={form.email}
                onChangeText={(t) => setForm((f) => ({ ...f, email: t }))}
                placeholderTextColor={VALUE_MUTED}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Date of inspection (acknowledgement)"
                value={form.acknowledgementDate}
                onChangeText={(t) =>
                  setForm((f) => ({ ...f, acknowledgementDate: t }))
                }
                placeholderTextColor={VALUE_MUTED}
              />
            </IosFieldCard>
          </ScrollView>

          <View style={[s.footer, { paddingBottom: insets.bottom + 16 }]}>
            <Pressable
              onPress={() => {
                if (Platform.OS === 'ios')
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Success,
                  );
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
