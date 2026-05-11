import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VISIBLE_MS = 2400;

/**
 * Bottom “pill” toast similar to iOS system feedback (blur + rounded capsule).
 */
export function useIosStyleToast() {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const show = useCallback(
    (msg: string) => {
      const trimmed = msg.trim();
      if (!trimmed) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      if (Platform.OS === 'ios') {
        void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }

      setMessage(trimmed);
      opacity.setValue(0);
      translateY.setValue(10);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          tension: 120,
          useNativeDriver: true,
        }),
      ]).start();

      timerRef.current = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 8,
            duration: 220,
            useNativeDriver: true,
          }),
        ]).start(({ finished }) => {
          if (finished) setMessage(null);
        });
      }, VISIBLE_MS);
    },
    [opacity, translateY],
  );

  const ToastOverlay =
    message === null ? null : (
      <Animated.View
        pointerEvents="none"
        style={[
          styles.wrap,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 8,
            opacity,
            transform: [{ translateY }],
          },
        ]}
        accessibilityRole="alert"
        accessibilityLiveRegion="polite">
        {Platform.OS === 'ios' ? (
          <View style={styles.capsuleClip}>
            <BlurView intensity={50} tint="dark" style={styles.blurCapsule}>
              <Text style={styles.text}>{message}</Text>
            </BlurView>
          </View>
        ) : (
          <View style={styles.androidCapsule}>
            <Text style={styles.text}>{message}</Text>
          </View>
        )}
      </Animated.View>
    );

  return { show, ToastOverlay };
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
  },
  capsuleClip: {
    maxWidth: 340,
    borderRadius: 14,
    overflow: 'hidden',
  },
  blurCapsule: {
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  androidCapsule: {
    maxWidth: 340,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: 'rgba(44, 44, 46, 0.94)',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.96)',
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: -0.15,
  },
});
