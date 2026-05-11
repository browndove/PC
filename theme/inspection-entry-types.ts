export type InspectionEntryKind =
  | 'site'
  | 'final'
  | 'routine'
  | 'investigation'
  | 'schedule';

export interface InspectionEntryType {
  id: InspectionEntryKind;
  label: string;
  /** Routine maps to your council PDF flow first */
  description?: string;
}

export const INSPECTION_ENTRY_TYPES: InspectionEntryType[] = [
  { id: 'site', label: 'Site Inspection' },
  { id: 'final', label: 'Final Inspection' },
  {
    id: 'routine',
    label: 'Routine Inspection',
    description: 'Pharmacy Council PDF forms',
  },
  { id: 'investigation', label: 'Investigation Inspection' },
  { id: 'schedule', label: 'Schedule Inspection' },
];
