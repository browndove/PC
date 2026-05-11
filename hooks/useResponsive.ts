import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

/** Breakpoints — matches common tablet widths */
const TABLET_MIN = 600;   // small tablets, iPad Mini
const TABLET_LG = 900;    // full-size iPad, iPad Pro

export type DeviceClass = 'phone' | 'tablet' | 'tabletLg';

/**
 * Responsive scaling hook.
 *
 * Returns a `scale` multiplier and helpers so components
 * can bump sizes gracefully on larger screens.
 */
export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const shortSide = Math.min(width, height);

  const device: DeviceClass =
    shortSide >= TABLET_LG ? 'tabletLg' :
    shortSide >= TABLET_MIN ? 'tablet' :
    'phone';

  const isTablet = device !== 'phone';

  // Scale factors — phone stays at 1×, tablets get bumped
  const scale = isTablet ? (device === 'tabletLg' ? 1.4 : 1.2) : 1;

  /** Scale a pixel value */
  const s = (v: number) => Math.round(v * scale);

  /** Scale font size (slightly less aggressive than layout) */
  const fs = (v: number) => Math.round(v * (isTablet ? (device === 'tabletLg' ? 1.3 : 1.15) : 1));

  /** Scale spacing / padding */
  const sp = (v: number) => Math.round(v * scale);

  /** Number of columns for grid layouts */
  const columns = device === 'tabletLg' ? 3 : isTablet ? 2 : 1;

  return {
    width,
    height,
    device,
    isTablet,
    scale,
    s,
    fs,
    sp,
    columns,
  };
}

/* ── Auto-scaling stylesheet helper ────────────────────────────────────── */

const FONT_KEYS = new Set(['fontSize', 'lineHeight', 'letterSpacing']);

const LAYOUT_KEYS = new Set([
  'width', 'height',
  'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
  'padding', 'paddingHorizontal', 'paddingVertical',
  'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight',
  'paddingStart', 'paddingEnd',
  'margin', 'marginHorizontal', 'marginVertical',
  'marginTop', 'marginBottom', 'marginLeft', 'marginRight',
  'marginStart', 'marginEnd',
  'gap', 'rowGap', 'columnGap',
  'borderRadius',
  'borderTopLeftRadius', 'borderTopRightRadius',
  'borderBottomLeftRadius', 'borderBottomRightRadius',
  'top', 'bottom', 'left', 'right',
]);

/** Recursively walk a style object and scale known numeric props. */
function scaleOne(
  styleObj: Record<string, any>,
  sp: (v: number) => number,
  fs: (v: number) => number,
): Record<string, any> {
  const out: Record<string, any> = {};
  for (const key of Object.keys(styleObj)) {
    const val = styleObj[key];
    if (typeof val === 'number' && Number.isFinite(val)) {
      if (FONT_KEYS.has(key)) {
        out[key] = fs(val);
      } else if (LAYOUT_KEYS.has(key)) {
        out[key] = Math.round(val * (sp(100) / 100));
      } else {
        out[key] = val;
      }
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      out[key] = scaleOne(val, sp, fs);
    } else {
      out[key] = val;
    }
  }
  return out;
}

/**
 * Scales all known size/spacing/font numeric props in a StyleSheet for
 * tablets/iPads. Phones get the original values (identity pass-through).
 *
 * Usage: define `const baseStyles = StyleSheet.create({...})` at module scope,
 * then inside your component do `const styles = useScaledStyles(baseStyles);`.
 */
export function useScaledStyles<T extends Record<string, any>>(base: T): T {
  const { isTablet, sp, fs, device } = useResponsive();
  return useMemo(() => {
    if (!isTablet) return base;
    const scaled: Record<string, any> = {};
    for (const key of Object.keys(base)) {
      const styleObj = base[key];
      if (styleObj && typeof styleObj === 'object') {
        scaled[key] = scaleOne(styleObj, sp, fs);
      } else {
        scaled[key] = styleObj;
      }
    }
    return StyleSheet.create(scaled) as T;
    // `base` is expected to be module-scope constant; device drives re-compute
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, device]);
}
