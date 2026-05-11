import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * Routine inspection type picker — presented as an iOS slide-up form sheet
 * (configured in `app/inspection/_layout.tsx`).
 *
 * Visual language: SF Pro system font, soft systemGroupedBackground, two
 * large premium cells with rounded continuous corners, gentle press scale.
 */

type RoutineType = {
  id: 'pharmacy' | 'otcm';
  title: string;
  subtitle: string;
  iconColor: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const ROUTINE_TYPES: RoutineType[] = [
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    subtitle: 'Licensed pharmacy inspection',
    iconColor: '#007AFF',
    icon: 'medkit',
  },
  {
    id: 'otcm',
    title: 'OTCMS',
    subtitle: 'Over-the-Counter Medicine Seller',
    iconColor: '#34C759',
    icon: 'storefront',
  },
];

export default function RoutineSheet() {
  return (
    <View style={styles.sheet}>
      {/* Title bar (under native grabber) */}
      <View style={styles.titleBar}>
        <View style={styles.titleSpacer} />
        <View style={styles.titleCenter}>
          <Text style={styles.title}>Routine Inspection</Text>
        </View>
        <Pressable hitSlop={12} onPress={() => router.back()}>
          <Text style={styles.cancel}>Cancel</Text>
        </Pressable>
      </View>

      <Text style={styles.helper}>
        Choose the type of facility you&apos;re inspecting today.
      </Text>

      <ScrollView
        style={styles.scrollWrap}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        {ROUTINE_TYPES.map((t) => (
          <OptionCard
            key={t.id}
            type={t}
            onPress={() => {
              const target =
                t.id === 'pharmacy'
                  ? '/inspection/routine/pharmacy/part1'
                  : '/inspection/routine/otcms/part1';
              router.back();
              setTimeout(() => router.push(target as never), 50);
            }}
          />
        ))}

        <Text style={styles.footer}>
          Pharmacy inspections require a registered pharmacist on premises.
          OTCMS outlets are licensed to sell over-the-counter medicines only.
        </Text>
      </ScrollView>
    </View>
  );
}

/* ──────────────────────────────────────────────────────────────────── */

function OptionCard({
  type,
  onPress,
}: {
  type: RoutineType;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    return () => scale.stopAnimation();
  }, [scale]);

  const press = (toValue: number) =>
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => press(0.97)}
      onPressOut={() => press(1)}
      android_ripple={{ color: 'rgba(0,0,0,0.06)' }}>
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        <View style={[styles.iconTile, { backgroundColor: type.iconColor }]}>
          <Ionicons name={type.icon} size={20} color="#FFFFFF" />
        </View>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{type.title}</Text>
          <Text style={styles.cardSubtitle}>{type.subtitle}</Text>
        </View>
        <View style={styles.chevronWrap}>
          <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
        </View>
      </Animated.View>
    </Pressable>
  );
}

/* ── iOS system tokens ── */
const SYS_GROUPED_BG = '#F5F7FB';
const SYS_CARD = '#FFFFFF';
const LABEL = '#000000';
const SECONDARY_LABEL = 'rgba(60, 60, 67, 0.60)';
const SYSTEM_BLUE = '#007AFF';

/* Use SF Pro on iOS / Roboto on Android by omitting fontFamily */
const sysFont = Platform.select({ ios: undefined, android: 'sans-serif' });

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    backgroundColor: SYS_GROUPED_BG,
    paddingTop: 8,
  },

  /* Title bar */
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 4,
    minHeight: 44,
  },
  titleSpacer: { width: 64 },
  titleCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: LABEL,
    fontFamily: sysFont,
    letterSpacing: -0.43,
  },
  cancel: {
    width: 64,
    textAlign: 'right',
    fontSize: 17,
    fontWeight: '400',
    color: SYSTEM_BLUE,
    fontFamily: sysFont,
    letterSpacing: -0.43,
  },

  helper: {
    marginTop: 6,
    paddingHorizontal: 20,
    fontSize: 14,
    lineHeight: 19,
    color: SECONDARY_LABEL,
    fontFamily: sysFont,
    fontWeight: '400',
    letterSpacing: -0.15,
    textAlign: 'center',
  },

  scrollWrap: { flex: 1 },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 32,
    gap: 10,
  },

  /* Premium option card */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SYS_CARD,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    minHeight: 72,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
      },
      android: { elevation: 1 },
      default: {},
    }),
  },
  iconTile: {
    width: 38,
    height: 38,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardText: {
    flex: 1,
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: LABEL,
    fontFamily: sysFont,
    letterSpacing: -0.41,
  },
  cardSubtitle: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '400',
    color: SECONDARY_LABEL,
    fontFamily: sysFont,
    letterSpacing: -0.08,
  },
  chevronWrap: {
    paddingLeft: 8,
  },

  footer: {
    marginTop: 14,
    marginHorizontal: 4,
    fontSize: 12,
    lineHeight: 17,
    color: SECONDARY_LABEL,
    fontFamily: sysFont,
    fontWeight: '400',
    letterSpacing: -0.08,
    textAlign: 'center',
  },
});
