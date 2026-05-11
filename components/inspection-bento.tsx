import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Calm } from '@/theme/calm';
import { useScaledStyles } from '@/hooks/useResponsive';
import {
  INSPECTION_ENTRY_TYPES,
  type InspectionEntryKind,
  type InspectionEntryType,
} from '@/theme/inspection-entry-types';

/** Routine first — matches how councils use routine visits most often */
const ROW_ORDER: InspectionEntryKind[] = [
  'routine',
  'site',
  'final',
  'investigation',
  'schedule',
];

const TAG_LABELS: Record<InspectionEntryKind, string> = {
  routine: 'ROUTINE',
  site: 'SITE VISIT',
  final: 'FINAL',
  investigation: 'INVESTIGATION',
  schedule: 'SCHEDULED',
};

/** Pale calm background per card */
const CARD_BG: Record<InspectionEntryKind, string> = {
  routine: '#F5F0EB',   // pale warm cream
  site: '#F3F0F8',      // pale lavender
  final: '#EDF5F2',     // pale mint
  investigation: '#FBF3EE', // pale peach
  schedule: '#F5F4EC',  // pale lemon
};

/** Muted accent per card — used for left stripe + watermark */
const CARD_ACCENT: Record<InspectionEntryKind, string> = {
  routine: '#C9BFB2',
  site: '#B8AED0',
  final: '#A3C9B8',
  investigation: '#D4B8A0',
  schedule: '#C8C4A8',
};

/** Line widths for the mini-document illustration per type */
const DOC_LINES: Record<InspectionEntryKind, number[]> = {
  routine: [20, 14, 18],
  site: [18, 16, 12],
  final: [22, 14, 16],
  investigation: [16, 20, 14],
  schedule: [20, 12, 18],
};

function entryById(id: InspectionEntryKind): InspectionEntryType {
  const found = INSPECTION_ENTRY_TYPES.find((t) => t.id === id);
  if (!found) throw new Error(`Unknown inspection kind: ${id}`);
  return found;
}

/** Mini paper-document icon with dog-eared corner and form lines */
function DocIcon({ lines, accent }: { lines: number[]; accent: string }) {
  const docStyles = useScaledStyles(baseDocStyles);
  return (
    <View style={docStyles.paper}>
      {/* Dog-ear fold — triangle in the top-right corner */}
      <View style={docStyles.earWrap}>
        <View style={[docStyles.earFold, { backgroundColor: accent, opacity: 0.2 }]} />
      </View>
      {/* Form field lines */}
      <View style={docStyles.linesWrap}>
        {lines.map((w, i) => (
          <View key={i} style={[docStyles.fieldLine, { width: w }]} />
        ))}
      </View>
      {/* Tiny checkbox at bottom-left */}
      <View style={docStyles.checkbox} />
    </View>
  );
}

/** Faint ruled lines across the card background like lined paper */
function RuledLines({ accent }: { accent: string }) {
  const decoStyles = useScaledStyles(baseDecoStyles);
  return (
    <View style={decoStyles.ruledWrap} pointerEvents="none">
      {[0, 1, 2, 3, 4].map((i) => (
        <View
          key={i}
          style={[decoStyles.ruledLine, { backgroundColor: accent }]}
        />
      ))}
    </View>
  );
}

/** Faint double-ring stamp seal — like an official council stamp */
function StampSeal({ accent }: { accent: string }) {
  const decoStyles = useScaledStyles(baseDecoStyles);
  return (
    <View style={decoStyles.stampOuter} pointerEvents="none">
      <View style={[decoStyles.stampRingOuter, { borderColor: accent }]} />
      <View style={[decoStyles.stampRingInner, { borderColor: accent }]} />
      <View style={[decoStyles.stampDot, { backgroundColor: accent }]} />
    </View>
  );
}

/** Subtle page-curl triangle on bottom-right corner */
function PageCurl({ accent }: { accent: string }) {
  const decoStyles = useScaledStyles(baseDecoStyles);
  return (
    <View style={decoStyles.curlWrap} pointerEvents="none">
      <View style={[decoStyles.curlTriangle, { borderBottomColor: accent }]} />
    </View>
  );
}

/**
 * Inspection entry points — physical paper-form folder cards.
 */
export function InspectionBento() {
  const styles = useScaledStyles(baseStyles);
  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionLabel}>Inspection types</Text>
      <Text style={styles.sectionHint}>Tap a folder to open that workflow.</Text>

      <View style={styles.stack}>
        {ROW_ORDER.map((kind) => {
          const entry = entryById(kind);
          const tagLabel = TAG_LABELS[kind];
          const lines = DOC_LINES[kind];
          const cardBg = CARD_BG[kind];
          const accent = CARD_ACCENT[kind];

          return (
            <Pressable
              key={kind}
              style={({ pressed }) => [pressed && styles.pressed]}
              onPress={() =>
                router.push(
                  entry.id === 'routine'
                    ? '/routine'
                    : `/inspection/${entry.id}`,
                )
              }
              accessibilityRole="button"
              accessibilityLabel={entry.label}>
              <View style={styles.outer}>
                {/* ── Folder tab — sits flush top-left ── */}
                <View style={styles.tab}>
                  <Text style={styles.tabText}>{tagLabel}</Text>
                </View>

                {/* ── Card body ── */}
                <View style={[styles.card, { backgroundColor: cardBg }]}>
                  {/* Decorative elements */}
                  <RuledLines accent={accent} />
                  <StampSeal accent={accent} />
                  <PageCurl accent={accent} />

                  <View style={styles.body}>
                    <DocIcon lines={lines} accent={accent} />

                    <View style={styles.textGroup}>
                      <Text style={styles.title} numberOfLines={1}>
                        {entry.label}
                      </Text>
                      <Text style={styles.meta} numberOfLines={1}>
                        {entry.description ?? 'Tap to begin'}
                      </Text>
                    </View>

                    <View style={styles.arrowCircle}>
                      <Ionicons name="arrow-forward" size={18} color={Calm.primary} />
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/* ── Tab height drives the offset ── */
const TAB_H = 26;

const baseStyles = StyleSheet.create({
  wrap: {
    marginTop: 22,
  },
  sectionLabel: {
    fontSize: 16,
    color: Calm.primary,
    fontFamily: 'Montserrat_600SemiBold',
  },
  sectionHint: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: Calm.textMuted,
    fontFamily: 'Montserrat_400Regular',
    marginBottom: 14,
  },

  stack: {
    gap: 18,
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },

  /* Outer — no bg, positions tab above card */
  outer: {},

  /* ── Tab — dark navy, flush top-left ── */
  tab: {
    alignSelf: 'flex-start',
    backgroundColor: '#0C2340',
    paddingHorizontal: 14,
    paddingVertical: 5,
    height: TAB_H,
    justifyContent: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  tabText: {
    fontSize: 9,
    fontFamily: 'Montserrat_700Bold',
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },

  /* ── Card — white, top-left radius 0 to connect with tab ── */
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 0.5,
    borderColor: '#DDE0E8',
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
      },
      android: { elevation: 3 },
      default: {},
    }),
  },

  body: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 14,
    position: 'relative',
    zIndex: 1,
  },

  textGroup: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 15,
    lineHeight: 21,
    color: '#0C2340',
    fontFamily: 'Montserrat_500Medium',
  },
  meta: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 16,
    color: '#9A9896',
    fontFamily: 'Montserrat_400Regular',
  },

  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Calm.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* ── Decorative element styles ── */
const baseDecoStyles = StyleSheet.create({
  /* Faint horizontal ruled lines — like lined paper */
  ruledWrap: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
  },
  ruledLine: {
    height: StyleSheet.hairlineWidth,
    opacity: 0.18,
  },

  /* Double-ring stamp seal — bottom-right */
  stampOuter: {
    position: 'absolute',
    right: 44,
    bottom: 6,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampRingOuter: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    opacity: 0.14,
  },
  stampRingInner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    opacity: 0.10,
  },
  stampDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    opacity: 0.12,
  },

  /* Page curl — bottom-right corner */
  curlWrap: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 18,
    height: 18,
    overflow: 'hidden',
    borderBottomRightRadius: 16,
  },
  curlTriangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 18,
    borderBottomWidth: 18,
    borderLeftColor: 'transparent',
    opacity: 0.12,
  },
});

/* ── Document-icon styles ── */
const baseDocStyles = StyleSheet.create({
  paper: {
    width: 38,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 0.5,
    borderColor: '#CBD0DC',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 3,
      },
      default: {},
    }),
  },
  /* Dog-ear wrapper — top-right corner */
  earWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    overflow: 'hidden',
  },
  earFold: {
    width: 14,
    height: 14,
    borderWidth: 0.5,
    borderColor: '#CBD0DC',
    transform: [{ rotate: '45deg' }],
    position: 'absolute',
    top: -7,
    right: -7,
  },
  /* Form field lines */
  linesWrap: {
    position: 'absolute',
    left: 6,
    top: 14,
    gap: 5,
  },
  fieldLine: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#CBD0DC',
  },
  /* Tiny checkbox square at bottom-left of the document */
  checkbox: {
    position: 'absolute',
    left: 6,
    bottom: 6,
    width: 6,
    height: 6,
    borderWidth: 0.5,
    borderColor: '#CBD0DC',
    borderRadius: 1,
  },
});
