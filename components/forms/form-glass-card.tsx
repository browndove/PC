import { type ReactNode } from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

/**
 * iOS Settings-style inset-grouped card.
 * Solid white surface, 10pt radius, no shadows — depth comes from the
 * grouped-background contrast, like UITableView.Style.insetGrouped.
 */
export function FormGlassCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.shell, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
