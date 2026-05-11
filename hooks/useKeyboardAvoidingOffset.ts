import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * `KeyboardAvoidingView` offset for screens wrapped in `SafeAreaView` + stack
 * without a header. Tuned so focused fields stay above the keyboard on notched iPhones.
 */
export function useKeyboardAvoidingOffset(): number {
  const { top } = useSafeAreaInsets();
  if (Platform.OS === 'ios') return Math.max(top, 0) + 2;
  return 0;
}
