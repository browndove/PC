import {
  FormPickerField,
  type PickerOption,
} from '@/components/forms/form-picker-field';

import type { TriState } from '@/types/pharmacy-routine';

type Props = {
  label: string;
  value: TriState;
  onChange: (next: TriState) => void;
  isLast?: boolean;
};

const OPTIONS: PickerOption[] = [
  { value: 'na', label: 'N/A' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

export function NaYesNoRow({ label, value, onChange, isLast = true }: Props) {
  return (
    <FormPickerField
      label={label}
      value={value}
      options={OPTIONS}
      onChange={(v) => onChange(v as TriState)}
      placeholder="Choose…"
      isLast={isLast}
    />
  );
}
