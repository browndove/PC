import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';

/** Match `FormPickerField` trigger so text rows feel like the same control family. */
const TRIGGER_BG = 'rgba(118, 118, 128, 0.14)';
const TRIGGER_BORDER = 'rgba(60, 60, 67, 0.17)';
const LABEL = '#1C1C1E';
const TITLE = '#000000';
const BLUE = '#007AFF';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  placeholderTextColor?: string;
  multiline?: boolean;
  /** Min height of the text area (multiline default 120, single default 50). */
  minInputHeight?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'phone-pad'
    | 'number-pad'
    | 'numeric';
  returnKeyType?: 'default' | 'done' | 'next' | 'search' | 'send';
};

/**
 * Label + filled TextInput — same shell as the picker “dropdown” row (iOS grouped field).
 */
export function FormTextField({
  label,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = '#3C3C43',
  multiline = false,
  minInputHeight,
  autoCapitalize,
  keyboardType,
  returnKeyType = 'done',
}: Props) {
  const inputMin = minInputHeight ?? (multiline ? 120 : 50);

  return (
    <View style={styles.wrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.shell, multiline && styles.shellMultiline]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          style={[
            styles.input,
            multiline ? { minHeight: inputMin, paddingTop: Platform.OS === 'ios' ? 2 : 4 } : { minHeight: inputMin },
          ]}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          selectionColor={BLUE}
        />
      </View>
    </View>
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
  shell: {
    borderRadius: 14,
    backgroundColor: TRIGGER_BG,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: TRIGGER_BORDER,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 11 : 10,
    minHeight: 50,
    justifyContent: 'center',
  },
  shellMultiline: {
    minHeight: undefined,
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
  input: {
    fontSize: 17,
    fontWeight: '400',
    color: TITLE,
    letterSpacing: -0.41,
    lineHeight: 22,
    padding: 0,
    width: '100%',
  },
});
