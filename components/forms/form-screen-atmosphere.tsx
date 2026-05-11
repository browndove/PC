import { Platform, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/** Light dot texture — geometric only (percent literals for RN DimensionValue). */
const DOTS = [
  { left: '6%', top: '18%' },
  { left: '8%', top: '22%' },
  { left: '10%', top: '19%' },
  { left: '7%', top: '26%' },
  { left: '11%', top: '24%' },
  { left: '88%', top: '12%' },
  { left: '91%', top: '16%' },
  { left: '86%', top: '20%' },
  { left: '93%', top: '22%' },
  { left: '14%', top: '72%' },
  { left: '18%', top: '76%' },
  { left: '16%', top: '80%' },
  { left: '82%', top: '68%' },
  { left: '86%', top: '74%' },
  { left: '84%', top: '78%' },
] as const;

/**
 * Ambient screen layer: gradients, soft blobs, rings, diagonals, and dot texture
 * (geometric design elements — no word watermarks).
 */
export function FormScreenAtmosphere() {
  return (
    <View style={styles.root} pointerEvents="none">
      <LinearGradient
        colors={['#EEF3FA', '#F6F8FC', '#F0F3FA']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      <LinearGradient
        colors={['rgba(10, 132, 255, 0.11)', 'transparent', 'rgba(88, 86, 214, 0.085)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.blob, styles.blob1]} />
      <View style={[styles.blob, styles.blob2]} />

      {/* Large corner rings */}
      <View style={styles.ringTR} />
      <View style={styles.ringTRInner} />
      <View style={styles.ringBL} />
      <View style={styles.ringBLInner} />

      {/* Diagonal line motif */}
      <View style={styles.diag1} />
      <View style={styles.diag2} />
      <View style={styles.diag3} />

      {/* Quarter-circle plate — top left */}
      <View style={styles.quarterTL} />

      {/* Floating rounded bars */}
      <View style={styles.bar1} />
      <View style={styles.bar2} />

      {DOTS.map((p, i) => (
        <View key={i} style={[styles.dot, { left: p.left, top: p.top }]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: Platform.OS === 'ios' ? 0.52 : 0.38,
  },
  blob1: {
    width: 300,
    height: 300,
    top: -100,
    right: -110,
    backgroundColor: 'rgba(10, 132, 255, 0.09)',
  },
  blob2: {
    width: 240,
    height: 240,
    bottom: 80,
    left: -100,
    backgroundColor: 'rgba(88, 86, 214, 0.075)',
  },

  ringTR: {
    position: 'absolute',
    top: -70,
    right: -70,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(10, 132, 255, 0.15)',
    backgroundColor: 'transparent',
  },
  ringTRInner: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(10, 132, 255, 0.1)',
    backgroundColor: 'transparent',
  },
  ringBL: {
    position: 'absolute',
    bottom: -50,
    left: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'rgba(88, 86, 214, 0.13)',
    backgroundColor: 'transparent',
  },
  ringBLInner: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(88, 86, 214, 0.09)',
    backgroundColor: 'transparent',
  },

  diag1: {
    position: 'absolute',
    width: StyleSheet.hairlineWidth * 2,
    height: '140%',
    left: '38%',
    top: '-20%',
    backgroundColor: 'rgba(60, 60, 67, 0.065)',
    transform: [{ rotate: '34deg' }],
  },
  diag2: {
    position: 'absolute',
    width: StyleSheet.hairlineWidth,
    height: '120%',
    left: '52%',
    top: '-10%',
    backgroundColor: 'rgba(60, 60, 67, 0.045)',
    transform: [{ rotate: '-28deg' }],
  },
  diag3: {
    position: 'absolute',
    width: StyleSheet.hairlineWidth,
    height: '90%',
    right: '22%',
    top: '5%',
    backgroundColor: 'rgba(10, 132, 255, 0.055)',
    transform: [{ rotate: '52deg' }],
  },

  quarterTL: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 120,
    height: 120,
    borderTopLeftRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.62)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.88)',
  },

  bar1: {
    position: 'absolute',
    width: 72,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(10, 132, 255, 0.095)',
    top: '42%',
    right: '8%',
    transform: [{ rotate: '-12deg' }],
  },
  bar2: {
    position: 'absolute',
    width: 48,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(88, 86, 214, 0.08)',
    bottom: '35%',
    left: '12%',
    transform: [{ rotate: '8deg' }],
  },

  dot: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(60, 60, 67, 0.08)',
  },
});
