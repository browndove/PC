import { Platform, StyleSheet, Text, View } from 'react-native';

import { FormPickerField } from '@/components/forms/form-picker-field';
import {
  getMmdaPickerOptions,
  resolveGhanaRegionKey,
} from '@/theme/gh-mmda-by-region';

const LABEL = '#1C1C1E';
const MUTED = '#8E8E93';
const SHELL_BG = 'rgba(118, 118, 128, 0.12)';
const SHELL_BORDER = 'rgba(60, 60, 67, 0.14)';

type Props = {
  /** Region shown on the form (should match a Ghana region name). */
  region: string;
  /** Fallback when `region` is still empty (e.g. home-screen selection). */
  selectedRegionHint?: string | null;
  value: string;
  onChange: (district: string) => void;
};

/**
 * MMDA / district assembly picker — options are limited to the resolved Ghana region.
 */
export function MmdaDistrictPicker({
  region,
  selectedRegionHint,
  value,
  onChange,
}: Props) {
  const key =
    resolveGhanaRegionKey(region.trim()) ??
    resolveGhanaRegionKey(selectedRegionHint?.trim() ?? null);
  const options = key ? getMmdaPickerOptions(key) : [];

  if (options.length === 0) {
    return (
      <View style={styles.wrap}>
        <Text style={styles.fieldLabel}>MMDA</Text>
        <View style={styles.disabledShell}>
          <Text style={styles.disabledText}>
            Choose or confirm Region above to list district assemblies (MMDAs) for
            that area.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <FormPickerField
      label="MMDA"
      value={value.trim() === '' ? null : value}
      options={options}
      onChange={onChange}
      placeholder="Select district…"
      searchable
      searchPlaceholder="Search districts…"
    />
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 18,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: LABEL,
    letterSpacing: -0.08,
    marginBottom: 8,
  },
  disabledShell: {
    borderRadius: 14,
    backgroundColor: SHELL_BG,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: SHELL_BORDER,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 12,
  },
  disabledText: {
    fontSize: 15,
    fontWeight: '400',
    color: MUTED,
    lineHeight: 21,
    letterSpacing: -0.24,
  },
});
