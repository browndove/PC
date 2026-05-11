import { useMemo } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';

import { FrostedCard } from '@/components/frosted-card';
import { InspectionBento } from '@/components/inspection-bento';
import { Calm } from '@/theme/calm';
import { useScaledStyles } from '@/hooks/useResponsive';
import {
  getTimeGreeting,
  INSPECTOR_FULL_NAME,
  inspectorInitials,
} from '@/theme/inspector-display';
import { inspectionTypeLabel, MOCK_RECENT_INSPECTIONS } from '@/theme/recent-inspections';

/** First tab: Home — calm placeholder until dashboard content is defined. */
export default function HomeTabScreen() {
  const styles = useScaledStyles(baseStyles);
  const insets = useSafeAreaInsets();
  const [loaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });

  const initials = useMemo(() => inspectorInitials(), []);
  const greetingPrefix = useMemo(() => `${getTimeGreeting()},`, []);

  if (!loaded) {
    return null;
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />
      <View style={styles.decor} pointerEvents="none">
        <View style={styles.decorBlobA} />
        <View style={styles.decorBlobB} />
        <View style={styles.decorBlobC} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.greetingHint}>{greetingPrefix}</Text>
            <Text style={styles.nameLine} numberOfLines={2}>
              Inspector {INSPECTOR_FULL_NAME}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable
              style={styles.iconCircle}
              onPress={() => { }}
              accessibilityRole="button"
              accessibilityLabel="Notifications">
              <Ionicons name="notifications-outline" size={22} color={Calm.primary} />
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>1</Text>
              </View>
            </Pressable>
            <Pressable
              style={styles.iconCircle}
              onPress={() => { }}
              accessibilityRole="button"
              accessibilityLabel="Profile">
              <Text style={styles.initialsText}>{initials}</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.statusRow}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Available for inspections</Text>
        </View>

        <Text style={styles.subtitle}>
          A quiet place for shortcuts and updates. We&apos;ll shape this once your workflow is set.
        </Text>

        <InspectionBento />

        <FrostedCard style={styles.statsCard}>
          <View style={styles.statsInner}>
            <Image
              source={require('@/assets/images/pharmacy-council-logo.png')}
              style={styles.statsWatermark}
              contentFit="contain"
              accessibilityIgnoresInvertColors
            />
            <Text style={styles.statsSectionLabel}>Inspection activity</Text>
            <View style={styles.statsBlock}>
              <Text style={styles.statsMeta}>Last inspection</Text>
              <View style={styles.statsTypeRow}>
                <View style={[styles.typePill, styles.typePillPharmacy]}>
                  <Text style={styles.typePillTextPharmacy}>Pharmacy</Text>
                </View>
              </View>
              <Text style={styles.statsHighlight}>Thursday, 8 May 2026</Text>
              <Text style={styles.statsFacility}>Sunrise Pharmacy Ltd.</Text>
              <Text style={styles.statsRegion}>Greater Accra · Retail</Text>
            </View>
            <View style={styles.statsDivider} />
            <View style={styles.statsRow}>
              <View style={styles.statsRowItem}>
                <Text style={styles.statsMeta}>Visits this month</Text>
                <Text style={styles.statsRowValue}>4</Text>
              </View>
              <View style={styles.statsRowSep} />
              <View style={styles.statsRowItem}>
                <Text style={styles.statsMeta}>Draft reports</Text>
                <Text style={styles.statsRowValue}>1</Text>
              </View>
            </View>
          </View>
        </FrostedCard>

        <FrostedCard style={styles.recentCard}>
          <View style={styles.recentInner}>
            <Text style={styles.recentTitle}>Recent inspections</Text>
            <Text style={styles.recentSubtitle}>Story timeline · newest first</Text>

            <View style={styles.timeline}>
              {MOCK_RECENT_INSPECTIONS.map((item, index) => {
                const isLast = index === MOCK_RECENT_INSPECTIONS.length - 1;
                return (
                  <View key={item.id} style={styles.timelineRow}>
                    <View style={styles.rail}>
                      <View style={styles.storyRing}>
                        <View style={styles.storyDot} />
                      </View>
                      {!isLast ? <View style={styles.spine} /> : null}
                    </View>
                    <View style={styles.storyBubble}>
                      <View style={styles.storyTop}>
                        <View
                          style={[
                            styles.typePill,
                            item.type === 'pharmacy' ? styles.typePillPharmacy : styles.typePillOtcm,
                          ]}>
                          <Text
                            style={
                              item.type === 'pharmacy'
                                ? styles.typePillTextPharmacy
                                : styles.typePillTextOtcm
                            }>
                            {inspectionTypeLabel(item.type)}
                          </Text>
                        </View>
                        <Text style={styles.storyDate}>{item.dateLabel}</Text>
                      </View>
                      <Text style={styles.storyFacility}>{item.facilityName}</Text>
                      <Text style={styles.storyRegion}>{item.region}</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </FrostedCard>
      </ScrollView>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#eef2f8',
  },
  decor: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  decorBlobA: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: Calm.primarySoft,
    opacity: 0.09,
    top: -80,
    right: -100,
  },
  decorBlobB: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Calm.primary,
    opacity: 0.05,
    top: 240,
    left: -90,
  },
  decorBlobC: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: Calm.primarySoft,
    opacity: 0.07,
    bottom: -120,
    right: -80,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 16,
    alignItems: 'stretch',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  headerLeft: {
    flex: 1,
    minWidth: 0,
    paddingRight: 4,
  },
  greetingHint: {
    fontSize: 14,
    lineHeight: 20,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
  nameLine: {
    marginTop: 4,
    fontSize: 22,
    lineHeight: 28,
    color: Calm.primary,
    fontFamily: 'Montserrat_700Bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingTop: 2,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  initialsText: {
    fontSize: 15,
    fontFamily: 'Montserrat_700Bold',
    color: Calm.primary,
    letterSpacing: 0.5,
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 5,
    borderRadius: 9,
    backgroundColor: '#e53935',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontFamily: 'Montserrat_600SemiBold',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Calm.primarySoft,
    opacity: 0.85,
  },
  statusText: {
    fontSize: 14,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_500Medium',
  },
  subtitle: {
    marginTop: 18,
    fontSize: 15,
    lineHeight: 22,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'left',
  },
  statsCard: {
    marginTop: 22,
  },
  statsInner: {
    padding: 20,
    paddingBottom: 22,
    position: 'relative',
    overflow: 'hidden',
  },
  statsWatermark: {
    position: 'absolute',
    width: 148,
    height: 148,
    right: -28,
    bottom: -32,
    opacity: 0.08,
    zIndex: 0,
  },
  statsSectionLabel: {
    fontSize: 12,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: Calm.textSubtle,
    fontFamily: 'Montserrat_600SemiBold',
    marginBottom: 14,
    zIndex: 1,
  },
  statsBlock: {
    gap: 4,
    zIndex: 1,
  },
  statsTypeRow: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 2,
  },
  typePill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  typePillPharmacy: {
    backgroundColor: 'rgba(37, 99, 235, 0.14)',
  },
  typePillOtcm: {
    backgroundColor: 'rgba(12, 45, 92, 0.1)',
  },
  typePillTextPharmacy: {
    fontSize: 11,
    fontFamily: 'Montserrat_700Bold',
    color: Calm.primarySoft,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  typePillTextOtcm: {
    fontSize: 11,
    fontFamily: 'Montserrat_700Bold',
    color: Calm.primary,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  statsMeta: {
    fontSize: 13,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
  statsHighlight: {
    fontSize: 18,
    lineHeight: 24,
    color: Calm.primary,
    fontFamily: 'Montserrat_700Bold',
    marginTop: 2,
  },
  statsFacility: {
    fontSize: 14,
    color: Calm.text,
    fontFamily: 'Montserrat_600SemiBold',
    marginTop: 8,
  },
  statsRegion: {
    fontSize: 13,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 2,
  },
  statsDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(12, 45, 92, 0.1)',
    marginVertical: 16,
    zIndex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    zIndex: 1,
  },
  statsRowItem: {
    flex: 1,
    gap: 4,
  },
  statsRowSep: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(12, 45, 92, 0.1)',
    marginHorizontal: 16,
  },
  statsRowValue: {
    fontSize: 20,
    color: Calm.primary,
    fontFamily: 'Montserrat_700Bold',
  },
  recentCard: {
    marginTop: 16,
  },
  recentInner: {
    padding: 20,
    paddingBottom: 22,
  },
  recentTitle: {
    fontSize: 17,
    color: Calm.primary,
    fontFamily: 'Montserrat_700Bold',
  },
  recentSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
  timeline: {
    marginTop: 20,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  rail: {
    width: 36,
    alignItems: 'center',
  },
  storyRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Calm.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      default: {},
    }),
  },
  storyDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Calm.primarySoft,
  },
  spine: {
    width: 2,
    flex: 1,
    minHeight: 28,
    marginTop: 4,
    backgroundColor: 'rgba(12, 45, 92, 0.12)',
    borderRadius: 1,
  },
  storyBubble: {
    flex: 1,
    marginLeft: 4,
    marginBottom: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.65)',
  },
  storyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    flexWrap: 'wrap',
  },
  storyDate: {
    fontSize: 12,
    color: Calm.textSubtle,
    fontFamily: 'Montserrat_500Medium',
  },
  storyFacility: {
    marginTop: 8,
    fontSize: 15,
    color: Calm.text,
    fontFamily: 'Montserrat_600SemiBold',
  },
  storyRegion: {
    marginTop: 2,
    fontSize: 13,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
});
