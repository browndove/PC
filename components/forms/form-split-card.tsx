import { type ReactNode } from 'react';
import { Platform, StyleSheet, Text, View, type ViewStyle } from 'react-native';

/**
 * Split card: cool gray rail + white panel. Depth from a hairline border and
 * a very light shadow — avoids the “floating AI tile” look.
 */
export function FormSplitCard({
  line1,
  line2,
  children,
  style,
}: {
  line1: string;
  line2?: string;
  children: ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.stripe}>
        <Text style={styles.stripeLine1} numberOfLines={2}>
          {line1}
        </Text>
        {line2 ? (
          <Text style={styles.stripeLine2} numberOfLines={2}>
            {line2}
          </Text>
        ) : null}
      </View>
      <View style={styles.panel}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    minHeight: 96,
    borderRadius: 11,
    overflow: 'hidden',
    backgroundColor: '#FDFDFD',
    marginBottom: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.07)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: { elevation: 1 },
      default: {},
    }),
  },
  stripe: {
    width: 76,
    backgroundColor: '#E4E9EF',
    paddingVertical: 14,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  stripeLine1: {
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(28, 38, 48, 0.92)',
    letterSpacing: -0.15,
    lineHeight: 17,
  },
  stripeLine2: {
    marginTop: 5,
    fontSize: 11,
    fontWeight: '400',
    color: 'rgba(28, 38, 48, 0.52)',
    letterSpacing: 0.1,
    lineHeight: 14,
  },
  panel: {
    flex: 1,
    minWidth: 0,
    backgroundColor: '#FDFDFD',
    paddingHorizontal: 13,
    paddingTop: 11,
    paddingBottom: 12,
  },
});
