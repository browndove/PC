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
import { NaYesNoRow } from '@/components/forms/na-yes-no-row';
import type { TriState } from '@/types/pharmacy-routine';

const BG = '#F5F7FB';
const SECONDARY = '#787880';
const BODY = '#000000';
const VALUE_MUTED = '#3C3C43';
const BLUE = '#007AFF';
const PART_INDEX = 3;
const PART_TOTAL = 4;

function initTri(): Record<string, TriState> {
  return {
    p_clean: null,
    p_light: null,
    p_vent: null,
    p_walls: null,
    p_id: null,
    p_wash: null,
    p_wait: null,
    r_soft: null,
    r_reg: null,
    s_cup: null,
    s_acc: null,
    s_book: null,
    s_opt: null,
    w_book: null,
    w_proc: null,
    w_fda: null,
    ref_stg: null,
    ref_eml: null,
    ref_bnf: null,
    ref_reg: null,
  };
}

export default function PharmacyRoutinePart3Screen() {
  const insets = useSafeAreaInsets();
  const [tri, setTri] = useState<Record<string, TriState>>(initTri);
  const [wasteWhere, setWasteWhere] = useState('');
  const [evidenceNote, setEvidenceNote] = useState('');
  const setT = (id: string, v: TriState) =>
    setTri((prev) => ({ ...prev, [id]: v }));

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Premises Standards',
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
            contentContainerStyle={{ paddingTop: 10, paddingBottom: insets.bottom + 88 }}
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic">
            <RoutineIntroCard
              step={PART_INDEX}
              total={PART_TOTAL}
              description="Answer N/A, Yes, or No for each premises standard. Add notes where the form asks for detail."
            />

            <Text style={s.sectionHeader}>1. PREMISES & LAYOUT</Text>
            <IosFieldCard>
              <NaYesNoRow label="Premises is clean, tidy and orderly" value={tri.p_clean} onChange={(v) => setT('p_clean', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Lighting is suitable and effective" value={tri.p_light} onChange={(v) => setT('p_light', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Ventilation & cooling system adequately provided" value={tri.p_vent} onChange={(v) => setT('p_vent', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Walls are smooth, impermeable, washable, easy to maintain" value={tri.p_walls} onChange={(v) => setT('p_walls', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Premises clearly identified and demarcated from other businesses" value={tri.p_id} onChange={(v) => setT('p_id', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Running tap water / Veronica bucket / hand washing / waste bin / accessible washroom" value={tri.p_wash} onChange={(v) => setT('p_wash', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Waiting area and counselling areas appropriate" value={tri.p_wait} onChange={(v) => setT('p_wait', v)} />
            </IosFieldCard>

            <Text style={s.sectionHeader}>2. RECORD KEEPING & DOCUMENTATION</Text>
            <IosFieldCard>
              <NaYesNoRow label="Appropriate software for pharmacy management" value={tri.r_soft} onChange={(v) => setT('r_soft', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Has the pharmacy registered for the ePharmacy program?" value={tri.r_reg} onChange={(v) => setT('r_reg', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <FormTextField
                label="Evidence of ePharmacy services provided? If not, does pharmacy deliver by courier or other means?"
                value={evidenceNote}
                onChangeText={setEvidenceNote}
                placeholder="Optional"
                placeholderTextColor={VALUE_MUTED}
                multiline
                minInputHeight={100}
              />
            </IosFieldCard>

            <Text style={s.sectionHeader}>3. SECURITY OF PRODUCTS & SERVICE</Text>
            <IosFieldCard>
              <NaYesNoRow label="Availability of secured cupboard for controlled medicines" value={tri.s_cup} onChange={(v) => setT('s_cup', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Accessibility to controlled medicines by unqualified persons" value={tri.s_acc} onChange={(v) => setT('s_acc', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Availability of the Restricted Medicines Record Book" value={tri.s_book} onChange={(v) => setT('s_book', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Facility operating optimally" value={tri.s_opt} onChange={(v) => setT('s_opt', v)} />
            </IosFieldCard>

            <Text style={s.sectionHeader}>4. WASTE DISPOSAL</Text>
            <IosFieldCard>
              <FormTextField
                label="Where and how are expired drugs kept before disposal"
                value={wasteWhere}
                onChangeText={setWasteWhere}
                placeholder="Describe"
                placeholderTextColor={VALUE_MUTED}
                multiline
                minInputHeight={100}
              />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Expired drug record book available and up to date" value={tri.w_book} onChange={(v) => setT('w_book', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Procedures in place for safe disposal of expired medicines" value={tri.w_proc} onChange={(v) => setT('w_proc', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Do you dispose expired medicines via FDA?" value={tri.w_fda} onChange={(v) => setT('w_fda', v)} />
            </IosFieldCard>

            <Text style={s.sectionHeader}>5. REFERENCE</Text>
            <IosFieldCard>
              <NaYesNoRow label="Current Standard Treatment Guidelines" value={tri.ref_stg} onChange={(v) => setT('ref_stg', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Current Essential Medicines List" value={tri.ref_eml} onChange={(v) => setT('ref_eml', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="BNF" value={tri.ref_bnf} onChange={(v) => setT('ref_bnf', v)} />
            </IosFieldCard>
            <IosFieldCard>
              <NaYesNoRow label="Current list of registered medicines" value={tri.ref_reg} onChange={(v) => setT('ref_reg', v)} />
            </IosFieldCard>
          </ScrollView>

          <View style={[s.footer, { paddingBottom: insets.bottom + 16 }]}>
            <Pressable
              onPress={() => {
                if (Platform.OS === 'ios')
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                router.push('/inspection/routine/pharmacy/part5');
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
