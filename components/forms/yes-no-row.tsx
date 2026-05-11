import {
  FormPickerField,
  type PickerOption,
} from '@/components/forms/form-picker-field';

type Value = boolean | null;

type Props = {
  label: string;
  value: Value;
  onChange: (next: boolean) => void;
  isLast?: boolean;
};

const OPTIONS: PickerOption[] = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

/** Yes / No as a tappable field that opens a selectable list (iOS-style). */
export function YesNoRow({ label, value, onChange, isLast = true }: Props) {
  const str =
    value === null ? null : value === true ? 'yes' : ('no' as const);

  return (
    <FormPickerField
      label={label}
      value={str}
      options={OPTIONS}
      onChange={(v) => onChange(v === 'yes')}
      placeholder="Choose…"
      isLast={isLast}
    />
  );
}
