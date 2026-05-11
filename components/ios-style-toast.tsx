import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Animated, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VISIBLE_MS_ERROR = 2600;
const VISIBLE_MS_SUCCESS = 2200;
const VISIBLE_MS_INFO = 2200;

export type IosToastKind = 'success' | 'error' | 'info';

type ToastApi = {
  show: (message: string, kind?: IosToastKind) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

function useToastController(): ToastApi & { ToastOverlay: ReactNode } {
  const insets = useSafeAreaInsets();
  const [message, setMessage] = useState<string | null>(null);
  const [kind, setKind] = useState<IosToastKind>('error');
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(10)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const show = useCallback(
    (msg: string, toastKind: IosToastKind = 'error') => {
      const trimmed = msg.trim();
      if (!trimmed) return;

      if (timerRef.current) clearTimeout(timerRef.current);

      if (Platform.OS === 'ios') {
        if (toastKind === 'success') {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else if (toastKind === 'error') {
          void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        } else {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      }

      setKind(toastKind);
      setMessage(trimmed);
      opacity.setValue(0);
      translateY.setValue(10);

      const visibleMs =
        toastKind === 'success'
          ? VISIBLE_MS_SUCCESS
          : toastKind === 'info'
            ? VISIBLE_MS_INFO
            : VISIBLE_MS_ERROR;

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
      }, visibleMs);
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
          <View
            style={[
              styles.androidCapsule,
              kind === 'success' && styles.androidCapsuleSuccess,
            ]}>
            <Text style={styles.text}>{message}</Text>
          </View>
        )}
      </Animated.View>
    );

  const api = useMemo(() => ({ show }), [show]);
  return { ...api, ToastOverlay };
}

export function IosToastProvider({ children }: { children: ReactNode }) {
  const { show, ToastOverlay } = useToastController();
  const value = useMemo(() => ({ show }), [show]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      {ToastOverlay}
    </ToastContext.Provider>
  );
}

export function useIosToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useIosToast must be used within IosToastProvider');
  }
  return ctx;
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
    zIndex: 9999,
    elevation: 9999,
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
  androidCapsuleSuccess: {
    backgroundColor: 'rgba(36, 60, 42, 0.94)',
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
