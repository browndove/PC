import { Platform, StyleSheet, Text, View } from 'react-native';

import { IosFieldCard } from '@/components/forms/ios-grouped-card';
import { RoutineStepper } from '@/components/forms/routine-stepper';

const SECONDARY = '#787880';
const TERTIARY = '#48484F';

/** Part I → Part V (no IV) — labels under the stepper. */
export const PHARMACY_ROUTINE_STEP_LABELS = [
  'General',
  'Staffing',
  'Premises',
  'Findings',
] as const;

/** OTCMS routine — three parts. */
export const OTCMS_ROUTINE_STEP_LABELS = [
  'General',
  'Staffing',
  'Checklist',
] as const;

type Props = {
  /** 1-based step index */
  step: number;
  total: number;
  /** Short supporting copy (nav title already names the screen). */
  description: string;
  /** Override stepper captions (defaults to pharmacy labels). */
  stepLabels?: readonly string[];
};

/**
 * Hero block for routine parts: stepper + copy inside the same card chrome as fields.
 */
export function RoutineIntroCard({
  step,
  total,
  description,
  stepLabels = PHARMACY_ROUTINE_STEP_LABELS,
}: Props) {
  return (
    <IosFieldCard dense>
      <View style={styles.pad}>
        <View style={styles.topRow}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              Part {step} of {total}
            </Text>
          </View>
        </View>

        <Text style={styles.body}>{description}</Text>

        <RoutineStepper
          currentStep={step}
          totalSteps={total}
          labels={stepLabels}
        />
      </View>
    </IosFieldCard>
  );
}

const styles = StyleSheet.create({
  pad: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 18,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: 'rgba(118, 118, 128, 0.18)',
    ...Platform.select({
      ios: {
        borderCurve: 'continuous',
      },
      default: {},
    }),
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
    color: SECONDARY,
    letterSpacing: -0.08,
  },
  body: {
    fontSize: 17,
    fontWeight: '400',
    color: TERTIARY,
    letterSpacing: -0.41,
    lineHeight: 24,
    marginBottom: 14,
  },
});
