import { useMemo, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LABEL = '#1C1C1E';
const TITLE = '#000000';
const MUTED = '#9898A0';
const BLUE = '#007AFF';
const TRIGGER_BG = 'rgba(118, 118, 128, 0.14)';
const TRIGGER_BORDER = 'rgba(60, 60, 67, 0.17)';
const SEP = 'rgba(60, 60, 67, 0.17)';

export type PickerOption = { value: string; label: string };

type Props = {
  label: string;
  value: string | null;
  options: readonly PickerOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  /** Set `false` only when stacking multiple pickers in one card (rare). */
  isLast?: boolean;
  /** Show a search field above the list (matches label and value, case-insensitive). */
  searchable?: boolean;
  searchPlaceholder?: string;
};

/**
 * iOS-style value row: tappable “dropdown” opens a sheet of options (not raw radios).
 */
export function FormPickerField({
  label,
  value,
  options,
  onChange,
  placeholder = 'Choose…',
  isLast = true,
  searchable = false,
  searchPlaceholder = 'Search…',
}: Props) {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim()) return [...options];
    const q = query.trim().toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(q) || o.value.toLowerCase().includes(q),
    );
  }, [options, query, searchable]);

  const selected = options.find((o) => o.value === value);
  const display = selected?.label ?? placeholder;
  const isPlaceholder = !selected;

  const pick = (v: string) => {
    if (Platform.OS === 'ios') Haptics.selectionAsync();
    onChange(v);
    setOpen(false);
    setQuery('');
  };

  const openSheet = () => {
    if (searchable) setQuery('');
    setOpen(true);
  };

  const closeSheet = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <View>
      <View style={styles.wrap}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${label}, ${display}`}
          onPress={openSheet}
          style={({ pressed }) => [
            styles.trigger,
            pressed && styles.triggerPressed,
          ]}>
          <Text
            style={[styles.triggerText, isPlaceholder && styles.placeholder]}
            numberOfLines={2}>
            {display}
          </Text>
          <Ionicons name="chevron-down" size={18} color={MUTED} />
        </Pressable>
      </View>

      {!isLast ? <View style={styles.tailSep} /> : null}

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={closeSheet}>
        <View style={styles.modalRoot}>
          <Pressable
            style={styles.backdrop}
            onPress={closeSheet}
            accessibilityLabel="Dismiss">
            {Platform.OS === 'ios' ? (
              <BlurView intensity={28} tint="dark" style={StyleSheet.absoluteFillObject} />
            ) : (
              <View style={styles.backdropAndroid} />
            )}
          </Pressable>

          <View
            style={[
              styles.sheet,
              {
                paddingBottom: Math.max(insets.bottom, 20),
                maxHeight: searchable ? '82%' : '72%',
                zIndex: 2,
              },
            ]}>
            <View style={styles.sheetGrabber} />
            <Text style={styles.sheetTitle}>{label}</Text>
            {searchable ? (
              <View style={styles.searchWrap}>
                <Ionicons name="search" size={18} color={MUTED} style={styles.searchIcon} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder={searchPlaceholder}
                  placeholderTextColor={MUTED}
                  style={styles.searchInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                />
              </View>
            ) : null}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false}>
              {filteredOptions.length === 0 ? (
                <View style={styles.emptyRow}>
                  <Text style={styles.emptyText}>No matches</Text>
                </View>
              ) : (
                filteredOptions.map((opt, i) => {
                  const on = value === opt.value;
                  return (
                    <Pressable
                      key={opt.value}
                      onPress={() => pick(opt.value)}
                      style={({ pressed }) => [
                        styles.optionRow,
                        i > 0 && styles.optionBorder,
                        pressed && { backgroundColor: 'rgba(10, 132, 255, 0.08)' },
                      ]}>
                      <Text
                        style={[
                          styles.optionLabel,
                          on && { color: BLUE, fontWeight: '600' },
                        ]}>
                        {opt.label}
                      </Text>
                      {on ? (
                        <Ionicons name="checkmark-circle" size={22} color={BLUE} />
                      ) : null}
                    </Pressable>
                  );
                })
              )}
            </ScrollView>
            <Pressable
              onPress={closeSheet}
              style={styles.cancelBtn}
              hitSlop={12}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: TRIGGER_BG,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: TRIGGER_BORDER,
    gap: 10,
  },
  triggerPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.995 }],
  },
  triggerText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
    color: TITLE,
    letterSpacing: -0.35,
    lineHeight: 22,
  },
  placeholder: {
    color: MUTED,
    fontWeight: '400',
  },
  tailSep: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: SEP,
    marginLeft: 22,
  },

  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropAndroid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
  },
  sheet: {
    backgroundColor: '#F5F7FB',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 8,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
      },
      android: { elevation: 16 },
      default: {},
    }),
  },
  sheetGrabber: {
    alignSelf: 'center',
    width: 36,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(60, 60, 67, 0.38)',
    marginBottom: 12,
  },
  sheetTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: LABEL,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    paddingHorizontal: 12,
    minHeight: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: TRIGGER_BORDER,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: TITLE,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    paddingHorizontal: 0,
    letterSpacing: -0.41,
  },
  emptyRow: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  emptyText: {
    fontSize: 16,
    color: MUTED,
    letterSpacing: -0.24,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  optionBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: SEP,
  },
  optionLabel: {
    flex: 1,
    fontSize: 17,
    color: TITLE,
    letterSpacing: -0.41,
    paddingRight: 12,
  },
  cancelBtn: {
    marginTop: 10,
    marginHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
  },
  cancelText: {
    fontSize: 17,
    fontWeight: '600',
    color: BLUE,
  },
});
