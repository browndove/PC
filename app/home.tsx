import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
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

import { useAuthSession } from '@/context/auth-session';
import { useSelectedRegion } from '@/context/selected-region';
import { Calm } from '@/theme/calm';
import { GHANA_REGIONS, type GhanaRegion } from '@/theme/gh-regions';
import { useScaledStyles } from '@/hooks/useResponsive';

/** Group regions by zone for a more organized picker */
const ZONE_MAP: Record<string, GhanaRegion[]> = {
  'Southern Zone': ['Greater Accra', 'Central', 'Western', 'Western North', 'Volta'],
  'Middle Belt': ['Ashanti', 'Eastern', 'Bono', 'Bono East', 'Ahafo', 'Oti'],
  'Northern Zone': ['Northern', 'Savannah', 'North East', 'Upper East', 'Upper West'],
};

const ZONES = Object.keys(ZONE_MAP);

export default function HomeScreen() {
  const styles = useScaledStyles(baseStyles);
  const insets = useSafeAreaInsets();
  const { signOut } = useAuthSession();
  const { setSelectedRegion } = useSelectedRegion();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [region, setRegion] = useState<GhanaRegion | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredZones = useMemo(() => {
    if (!search.trim()) return ZONE_MAP;
    const q = search.toLowerCase();
    const result: Record<string, GhanaRegion[]> = {};
    for (const [zone, regions] of Object.entries(ZONE_MAP)) {
      const matched = regions.filter((r) => r.toLowerCase().includes(q));
      if (matched.length > 0) result[zone] = matched;
    }
    return result;
  }, [search]);

  if (!fontsLoaded) {
    return null;
  }

  const onContinue = () => {
    if (!region) return;
    setSelectedRegion(region);
    router.replace('/(tabs)');
  };

  const regionCount = GHANA_REGIONS.length;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      {/* Subtle decorative blobs */}
      <View style={styles.decor} pointerEvents="none">
        <View style={styles.decorBlob1} />
        <View style={styles.decorBlob2} />
      </View>

      <View style={styles.topBar}>
        <Pressable
          onPress={async () => {
            await signOut();
            router.replace('/login');
          }}
          style={styles.backHit}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Sign out">
          <Ionicons name="chevron-back" size={26} color={Calm.primary} />
        </Pressable>
        <View style={styles.progress}>
          <View style={styles.progressDot} />
          <View style={styles.progressPill} />
          <View style={styles.progressDot} />
        </View>
        <View style={styles.topBarSpacer} />
      </View>

      <View style={styles.body}>
        <Image
          source={require('@/assets/images/pharmacy-council-logo.png')}
          style={styles.brandLogo}
          contentFit="contain"
        />

        <Text style={styles.title}>Select your region</Text>
        <Text style={styles.subtitle}>
          Choose where you conduct inspections across Ghana's {regionCount} regions
        </Text>

        {/* Region picker card */}
        <Pressable
          style={({ pressed }) => [
            styles.fieldCard,
            pressed && styles.fieldCardPressed,
          ]}
          onPress={() => { setSearch(''); setPickerOpen(true); }}
          accessibilityRole="button"
          accessibilityLabel="Select region">
          <View style={styles.fieldLeft}>
            <View style={styles.fieldIconCircle}>
              <Ionicons
                name={region ? 'location' : 'location-outline'}
                size={20}
                color={region ? Calm.primarySoft : Calm.textMuted}
              />
            </View>
            <View style={styles.fieldTextGroup}>
              <Text style={styles.fieldLabel}>Region</Text>
              <Text
                style={[styles.fieldValue, !region && styles.fieldPlaceholder]}
                numberOfLines={1}>
                {region ?? 'Tap to select'}
              </Text>
            </View>
          </View>
          <View style={styles.fieldChevron}>
            <Ionicons name="chevron-down" size={18} color={Calm.textSubtle} />
          </View>
        </Pressable>

        {/* Selected region confirmation chip */}
        {region ? (
          <View style={styles.confirmChip}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF7A" />
            <Text style={styles.confirmText}>{region} selected</Text>
          </View>
        ) : null}

        <Pressable
          style={[styles.continueBtn, !region && styles.continueBtnDisabled]}
          onPress={onContinue}
          disabled={!region}>
          <Text style={styles.continueText}>Continue</Text>
          <View style={styles.continueArrowCircle}>
            <Ionicons name="arrow-forward" size={18} color="#ffffff" />
          </View>
        </Pressable>
      </View>

      <View style={[styles.footerWrap, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <Text style={styles.footer}>
          By continuing, you agree to our{' '}
          <Text style={styles.footerLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.footerLink}>Privacy Policy</Text>
          .
        </Text>
      </View>

      {/* ── Region picker modal ── */}
      <Modal visible={pickerOpen} animationType="slide" transparent>
        <View style={styles.modalRoot}>
          <Pressable style={styles.modalBackdrop} onPress={() => setPickerOpen(false)} />
          <View style={[styles.modalSheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            {/* Handle bar */}
            <View style={styles.handleRow}>
              <View style={styles.handle} />
            </View>

            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select region</Text>
              <Pressable
                onPress={() => setPickerOpen(false)}
                hitSlop={12}
                style={styles.modalClose}>
                <Ionicons name="close" size={22} color={Calm.textMuted} />
              </Pressable>
            </View>

            {/* Search bar */}
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={18} color={Calm.textSubtle} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search regions..."
                placeholderTextColor={Calm.textSubtle}
                value={search}
                onChangeText={setSearch}
                autoCorrect={false}
                returnKeyType="search"
              />
              {search.length > 0 ? (
                <Pressable onPress={() => setSearch('')} hitSlop={8}>
                  <Ionicons name="close-circle" size={18} color={Calm.textSubtle} />
                </Pressable>
              ) : null}
            </View>

            {/* Grouped region list */}
            <FlatList
              data={Object.keys(filteredZones)}
              keyExtractor={(zone) => zone}
              keyboardShouldPersistTaps="handled"
              style={styles.modalList}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyWrap}>
                  <Ionicons name="map-outline" size={36} color={Calm.progressDot} />
                  <Text style={styles.emptyText}>No regions match "{search}"</Text>
                </View>
              }
              renderItem={({ item: zone }) => (
                <View style={styles.zoneGroup}>
                  <View style={styles.zoneHeader}>
                    <View style={styles.zoneDot} />
                    <Text style={styles.zoneTitle}>{zone}</Text>
                  </View>
                  {filteredZones[zone]?.map((item) => {
                    const isSelected = region === item;
                    return (
                      <Pressable
                        key={item}
                        style={({ pressed }) => [
                          styles.regionRow,
                          isSelected && styles.regionRowSelected,
                          pressed && styles.regionRowPressed,
                        ]}
                        onPress={() => {
                          setRegion(item);
                          setSelectedRegion(item);
                          setPickerOpen(false);
                        }}>
                        <View style={[styles.regionIcon, isSelected && styles.regionIconSelected]}>
                          <Ionicons
                            name={isSelected ? 'location' : 'location-outline'}
                            size={16}
                            color={isSelected ? Calm.primarySoft : Calm.textMuted}
                          />
                        </View>
                        <Text style={[styles.regionText, isSelected && styles.regionTextSelected]}>
                          {item}
                        </Text>
                        {isSelected ? (
                          <Ionicons name="checkmark-circle" size={20} color={Calm.primarySoft} />
                        ) : (
                          <View style={styles.regionRadio} />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Calm.background,
  },
  decor: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  decorBlob1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Calm.primarySoft,
    opacity: 0.04,
    top: -60,
    right: -50,
  },
  decorBlob2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Calm.primary,
    opacity: 0.03,
    bottom: 80,
    left: -40,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  backHit: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarSpacer: {
    width: 44,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Calm.progressDot,
  },
  progressPill: {
    width: 28,
    height: 8,
    borderRadius: 4,
    backgroundColor: Calm.primary,
  },
  body: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  brandLogo: {
    width: 56,
    height: 56,
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    color: Calm.primary,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 12,
  },

  /* ── Field card ── */
  fieldCard: {
    alignSelf: 'stretch',
    marginTop: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8ECF2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  fieldCardPressed: {
    backgroundColor: '#F8FAFC',
  },
  fieldLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
    gap: 12,
  },
  fieldIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEF2F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldTextGroup: {
    flex: 1,
    minWidth: 0,
  },
  fieldLabel: {
    fontSize: 11,
    color: Calm.textSubtle,
    fontFamily: 'Montserrat_600SemiBold',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 16,
    color: Calm.text,
    fontFamily: 'Montserrat_500Medium',
  },
  fieldPlaceholder: {
    color: Calm.textSubtle,
  },
  fieldChevron: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Calm.surfaceGroup,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  /* ── Confirm chip ── */
  confirmChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(76, 175, 122, 0.08)',
    borderRadius: 999,
  },
  confirmText: {
    fontSize: 13,
    color: '#4CAF7A',
    fontFamily: 'Montserrat_500Medium',
  },

  /* ── Continue ── */
  continueBtn: {
    alignSelf: 'stretch',
    marginTop: 'auto',
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Calm.primary,
    paddingVertical: 16,
    borderRadius: Calm.radiusPill,
  },
  continueBtnDisabled: {
    opacity: 0.45,
  },
  continueText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
  continueArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerWrap: {
    paddingHorizontal: 28,
  },
  footer: {
    fontSize: 12,
    lineHeight: 18,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
  },
  footerLink: {
    color: Calm.primary,
    fontFamily: 'Montserrat_600SemiBold',
  },

  /* ── Modal ── */
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Calm.overlay,
  },
  modalSheet: {
    maxHeight: '78%',
    backgroundColor: Calm.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
  },
  handleRow: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Calm.progressDot,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
    color: Calm.primary,
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Calm.surfaceGroup,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── Search ── */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Calm.surfaceGroup,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Calm.text,
    fontFamily: 'Montserrat_400Regular',
    padding: 0,
  },

  /* ── Zone groups ── */
  modalList: {
    flexGrow: 0,
  },
  zoneGroup: {
    marginBottom: 16,
  },
  zoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
    paddingHorizontal: 4,
  },
  zoneDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Calm.primarySoft,
    opacity: 0.5,
  },
  zoneTitle: {
    fontSize: 11,
    fontFamily: 'Montserrat_700Bold',
    color: Calm.textSubtle,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  /* ── Region row ── */
  regionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 1,
  },
  regionRowSelected: {
    backgroundColor: 'rgba(37, 99, 235, 0.06)',
  },
  regionRowPressed: {
    backgroundColor: Calm.surface,
  },
  regionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Calm.surfaceGroup,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regionIconSelected: {
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
  },
  regionText: {
    flex: 1,
    fontSize: 15,
    color: Calm.text,
    fontFamily: 'Montserrat_500Medium',
  },
  regionTextSelected: {
    color: Calm.primarySoft,
    fontFamily: 'Montserrat_600SemiBold',
  },
  regionRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: Calm.border,
  },

  /* ── Empty state ── */
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyText: {
    fontSize: 14,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
  },
});
