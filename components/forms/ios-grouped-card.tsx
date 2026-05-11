import { type ReactNode, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { FieldCardTexture } from '@/components/forms/field-card-texture';

type ShellProps = {
  children: ReactNode;
  /** Force a specific look (0–47). If omitted, each card picks a random layout on mount. */
  decorSeed?: number;
  /** Omit tall `minHeight` (e.g. routine intro hero). */
  dense?: boolean;
};

const SEED_MOD = 48;

/** Monotonic + entropy: many `Math.random()` calls in one render can return the same value. */
let fieldCardSerial = 0;

function allocateDecorSeed(): number {
  fieldCardSerial += 1;
  let n = 0;
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.getRandomValues) {
    const buf = new Uint32Array(2);
    globalThis.crypto.getRandomValues(buf);
    n = (buf[0]! ^ buf[1]! ^ fieldCardSerial * 0x9e3779b9) >>> 0;
  } else {
    n = (Math.floor(Math.random() * 0x7fffffff) ^ fieldCardSerial * 2654435761) >>> 0;
  }
  return (n + fieldCardSerial * 17) % SEED_MOD;
}

/** Left-edge stripe — color sets cycle for variety. */
const STRIPE_PRESETS = [
  ['rgba(10, 132, 255, 0.13)', 'rgba(10, 132, 255, 0.035)', 'transparent'],
  ['rgba(48, 176, 199, 0.14)', 'rgba(48, 176, 199, 0.035)', 'transparent'],
  ['rgba(88, 86, 214, 0.14)', 'rgba(88, 86, 214, 0.045)', 'transparent'],
  ['rgba(175, 82, 222, 0.12)', 'rgba(175, 82, 222, 0.035)', 'transparent'],
  ['rgba(255, 149, 0, 0.12)', 'rgba(255, 149, 0, 0.035)', 'transparent'],
  ['rgba(52, 199, 89, 0.12)', 'rgba(52, 199, 89, 0.035)', 'transparent'],
  ['rgba(60, 60, 67, 0.11)', 'rgba(60, 60, 67, 0.04)', 'transparent'],
] as const;

const TR_WASH_PRESETS = [
  ['rgba(10, 132, 255, 0.085)', 'transparent'],
  ['rgba(48, 176, 199, 0.075)', 'transparent'],
  ['rgba(88, 86, 214, 0.09)', 'transparent'],
  ['rgba(255, 59, 48, 0.065)', 'transparent'],
] as const;

const BL_WASH_PRESETS = [
  ['transparent', 'rgba(88, 86, 214, 0.07)'],
  ['transparent', 'rgba(10, 132, 255, 0.065)'],
  ['transparent', 'rgba(175, 82, 222, 0.055)'],
  ['transparent', 'rgba(52, 199, 89, 0.05)'],
] as const;

/**
 * One designed card per field — random texture family per instance unless `decorSeed` is set.
 */
export function IosFieldCard({ children, decorSeed, dense }: ShellProps) {
  const seedRef = useRef<number | null>(null);
  if (decorSeed !== undefined) {
    seedRef.current = ((decorSeed % SEED_MOD) + SEED_MOD) % SEED_MOD;
  } else if (seedRef.current === null) {
    seedRef.current = allocateDecorSeed();
  }
  const seed = seedRef.current!;

  const stripe = STRIPE_PRESETS[(seed * 5 + (seed >> 2)) % STRIPE_PRESETS.length]!;
  const trWash = TR_WASH_PRESETS[(seed * 3 + (seed >> 1)) % TR_WASH_PRESETS.length]!;
  const blWash = BL_WASH_PRESETS[(seed * 7 + (seed >> 3)) % BL_WASH_PRESETS.length]!;

  return (
    <View style={[styles.card, !dense && styles.cardTall]}>
      <FieldCardTexture seed={seed} />

      <LinearGradient
        colors={[...stripe]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.leftStripe}
        pointerEvents="none"
      />

      <LinearGradient
        colors={[...trWash]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.15, y: 0.7 }}
        style={styles.cornerWashTR}
        pointerEvents="none"
      />

      <LinearGradient
        colors={[...blWash]}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.cornerWashBL}
        pointerEvents="none"
      />

      <LinearGradient
        colors={['rgba(255,255,255,0.98)', 'rgba(255,255,255,0)']}
        style={styles.topRim}
        pointerEvents="none"
      />

      <View style={styles.inner}>{children}</View>
    </View>
  );
}

/** @deprecated Prefer `IosFieldCard` — behavior is identical. */
export const IosGroupedCard = IosFieldCard;

/** @deprecated Inset row separators are unused when each field has its own card. */
export function IosGroupedRowSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 8,
    marginBottom: 14,
    backgroundColor: '#FAFCFE',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(168, 182, 218, 0.58)',
    ...Platform.select({
      ios: {
        shadowColor: '#1c2838',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.085,
        shadowRadius: 20,
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  leftStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 5,
    zIndex: 1,
  },
  cornerWashTR: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '60%',
    height: '50%',
    zIndex: 1,
  },
  cornerWashBL: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '54%',
    height: '44%',
    zIndex: 1,
  },
  topRim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 12,
    zIndex: 2,
  },
  cardTall: {
    minHeight: 108,
  },
  inner: {
    position: 'relative',
    zIndex: 3,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(60, 60, 67, 0.14)',
    marginLeft: 22,
  },
});
