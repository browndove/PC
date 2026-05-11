import {
  FormPickerField,
  type PickerOption,
} from '@/components/forms/form-picker-field';

import type { FacilityTypeId } from '@/types/pharmacy-routine';

const OPTIONS: PickerOption[] = [
  { value: 'retail', label: 'Retail' },
  { value: 'wholesale', label: 'Wholesale' },
  { value: 'wholesale_retail', label: 'Wholesale-Retail' },
  { value: 'manufacturing_wholesale', label: 'Manufacturing Wholesale' },
];

type Props = {
  value: FacilityTypeId;
  onChange: (next: FacilityTypeId) => void;
};

export function FacilityTypePicker({ value, onChange }: Props) {
  return (
    <FormPickerField
      label="Type of facility"
      value={value}
      options={OPTIONS}
      onChange={(v) => onChange(v as FacilityTypeId)}
      placeholder="Select type…"
    />
  );
}
