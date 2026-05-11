import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INK = '#45454D';
const INK_SOLID = '#34343C';
const MUTED = '#9898A0';

type Props = {
  /** 1-based index of the active step. */
  currentStep: number;
  totalSteps: number;
  labels: readonly string[];
};

const DOT = 24;

/**
 * Checkout-style horizontal stepper: check + fill for completed, ring + center dot for current, faint rings ahead.
 */
export function RoutineStepper({ currentStep, totalSteps, labels }: Props) {
  const currentIdx = Math.max(0, Math.min(totalSteps - 1, currentStep - 1));
  const items = labels.slice(0, totalSteps);

  return (
    <View style={styles.root}>
      <View style={styles.iconRow}>
        <View style={styles.flexSpacer} />
        {items.map((_, i) => (
          <Fragment key={`ic-${i}`}>
            <View style={styles.iconSlot}>
              <StepIcon
                completed={i < currentIdx}
                current={i === currentIdx}
              />
            </View>
            {i < items.length - 1 ? (
              <View style={styles.lineWrap}>
                <View
                  style={[
                    styles.line,
                    i < currentIdx ? styles.lineDone : styles.lineTodo,
                  ]}
                />
              </View>
            ) : null}
          </Fragment>
        ))}
        <View style={styles.flexSpacer} />
      </View>

      <View style={styles.labelRow}>
        <View style={styles.flexSpacer} />
        {items.map((label, i) => (
          <Fragment key={`lb-${i}`}>
            <View style={styles.iconSlot}>
              <Text
                style={[
                  styles.label,
                  i < currentIdx && styles.labelDone,
                  i === currentIdx && styles.labelCurrent,
                ]}
                numberOfLines={1}>
                {label}
              </Text>
            </View>
            {i < items.length - 1 ? <View style={styles.lineWrap} /> : null}
          </Fragment>
        ))}
        <View style={styles.flexSpacer} />
      </View>
    </View>
  );
}

function StepIcon({
  completed,
  current,
}: {
  completed: boolean;
  current: boolean;
}) {
  if (completed) {
    return (
      <View style={styles.dotDone} accessibilityLabel="Completed">
        <Ionicons name="checkmark" size={14} color="#FFFFFF" />
      </View>
    );
  }
  if (current) {
    return (
      <View style={styles.dotCurrent} accessibilityLabel="Current step">
        <View style={styles.dotCurrentInner} />
      </View>
    );
  }
  return <View style={styles.dotTodo} accessibilityLabel="Not started" />;
}

const styles = StyleSheet.create({
  root: {
    marginTop: 6,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  flexSpacer: {
    flex: 1,
    minWidth: 0,
  },
  iconSlot: {
    width: DOT + 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lineWrap: {
    flex: 1,
    minWidth: 6,
    height: DOT,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  line: {
    height: 2,
    width: '100%',
    borderRadius: 1,
  },
  lineDone: {
    backgroundColor: INK_SOLID,
  },
  lineTodo: {
    backgroundColor: 'rgba(60, 60, 67, 0.14)',
  },
  dotDone: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: INK_SOLID,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCurrent: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: INK_SOLID,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotCurrentInner: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: INK_SOLID,
  },
  dotTodo: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(60, 60, 67, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    color: MUTED,
    textAlign: 'center',
    letterSpacing: -0.08,
    width: '100%',
  },
  labelDone: {
    color: INK,
    fontWeight: '600',
  },
  labelCurrent: {
    color: INK_SOLID,
    fontWeight: '700',
  },
});
