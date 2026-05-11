import { type ReactNode } from 'react';
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

import { Calm } from '@/theme/calm';

type FrostedCardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

/**
 * Frosted glass panel. Uses native blur on iOS/Android; soft translucent fallback on web.
 */
export function FrostedCard({ children, style }: FrostedCardProps) {
  if (Platform.OS === 'web') {
    return <View style={[styles.shell, styles.webShell, style]}>{children}</View>;
  }

  return (
    <View style={[styles.shell, style]}>
      <BlurView intensity={52} tint="light" style={StyleSheet.absoluteFillObject} />
      <View style={styles.glassTint} pointerEvents="none" />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.72)',
    ...Platform.select({
      ios: {
        shadowColor: Calm.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 20,
      },
      android: { elevation: 3 },
      default: {},
    }),
  },
  webShell: {
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
  },
  glassTint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});
