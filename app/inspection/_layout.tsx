import { Stack } from 'expo-router';

import { Calm } from '@/theme/calm';

export default function InspectionLayout() {
  return (
    <Stack
      screenOptions={{
        /* Nested flows (e.g. pharmacy Part 1) use their own nav; a default header
           here duplicates titles (often “routine” from the segment name). */
        headerShown: false,
        headerTintColor: Calm.primary,
        headerStyle: { backgroundColor: Calm.background },
        headerShadowVisible: false,
      }}
    />
  );
}
