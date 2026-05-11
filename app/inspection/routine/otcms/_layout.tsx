import { Platform } from 'react-native';
import { Stack } from 'expo-router';

const GROUPED_BG = '#F5F7FB';

export default function OtcmsRoutineLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: '600',
          color: '#000000',
        },
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: GROUPED_BG,
        },
        headerLargeStyle: {
          backgroundColor: GROUPED_BG,
        },
        contentStyle: { backgroundColor: GROUPED_BG },
        headerLargeTitle: Platform.OS === 'ios',
      }}
    />
  );
}
