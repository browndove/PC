import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  useFonts,
} from '@expo-google-fonts/montserrat';

import { useIosToast } from '@/components/ios-style-toast';
import { useAuthSession } from '@/context/auth-session';
import { useKeyboardAvoidingOffset } from '@/hooks/useKeyboardAvoidingOffset';
import { useResponsive, useScaledStyles } from '@/hooks/useResponsive';
import { apiLogin, isApiConfigured } from '@/lib/auth-api';
import { Calm } from '@/theme/calm';

export default function LoginScreen() {
  const styles = useScaledStyles(baseStyles);
  const keyboardVerticalOffset = useKeyboardAvoidingOffset();
  const { height: windowHeight } = useWindowDimensions();
  const { isTablet, device } = useResponsive();
  const { token, isReady, signIn } = useAuthSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { show: showToast } = useIosToast();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const passwordRef = useRef<TextInput>(null);
  const cardY = useRef(new Animated.Value(24)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const artFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isReady || !token) return;
    router.replace('/home');
  }, [isReady, token]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(cardY, {
        toValue: 0,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(artFloat, {
          toValue: -8,
          duration: 1900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(artFloat, {
          toValue: 0,
          duration: 1900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [artFloat, cardOpacity, cardY]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.root}>
          <KeyboardAvoidingView
            style={styles.flexFill}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={keyboardVerticalOffset}>
            <ScrollView
              style={styles.flexFill}
              contentContainerStyle={[
                styles.scrollContent,
                { minHeight: Math.max(windowHeight - 24, 560), paddingBottom: 40 },
              ]}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
              automaticallyAdjustKeyboardInsets
              showsVerticalScrollIndicator={false}>
              <Animated.View
                style={[
                  styles.phoneCard,
                  isTablet && {
                    alignSelf: 'center',
                    width: '100%',
                    maxWidth: device === 'tabletLg' ? 720 : 560,
                  },
                  { opacity: cardOpacity, transform: [{ translateY: cardY }] },
                ]}>
                <Pressable
                  onPress={() => router.replace('/home')}
                  hitSlop={12}
                  accessibilityLabel="Skip sign in">
                  <Text style={styles.skip}>Skip</Text>
                </Pressable>

                <Animated.View style={[styles.illustrationWrap, { transform: [{ translateY: artFloat }] }]}>
                  <Image
                    source={require('@/assets/images/search-engines-bro.svg')}
                    style={styles.illustration}
                    contentFit="contain"
                  />
                </Animated.View>

                <View style={styles.copyWrap}>
                  <Text style={styles.title}>Welcome to Quik Inspect</Text>
                  <Text style={styles.subtitle}>Routine inspection, made simple and calm.</Text>
                </View>

                <View style={styles.formWrap}>
                  <Text style={styles.fieldLabel}>Email</Text>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#8ca0b3"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                    editable={!submitting}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => passwordRef.current?.focus()}
                  />
                  <Text style={styles.fieldLabel}>Password</Text>
                  <TextInput
                    ref={passwordRef}
                    placeholder="Password"
                    placeholderTextColor="#8ca0b3"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    editable={!submitting}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                </View>

                <Pressable
                  onPress={() => router.push('/sign-up')}
                  style={styles.signUpRow}
                  hitSlop={8}>
                  <Text style={styles.signUpText}>
                    New here?{' '}
                    <Text style={styles.signUpBold}>Create an account</Text>
                  </Text>
                </Pressable>

                <View style={styles.footerRow}>
                  <View style={styles.dots}>
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                  </View>

                  <Pressable
                    style={[styles.ctaButton, submitting && styles.ctaDisabled]}
                    onPress={async () => {
                      if (submitting) return;
                      Keyboard.dismiss();
                      if (!email.trim() || !password) {
                        showToast('Enter your email and password.', 'error');
                        return;
                      }
                      if (!isApiConfigured()) {
                        showToast(
                          'Missing API URL: set EXPO_PUBLIC_API_URL in PC/.env (see .env.example). On a real phone use your Mac’s Wi‑Fi IP.',
                          'error',
                        );
                        return;
                      }
                      setSubmitting(true);
                      try {
                        const { token: jwt } = await apiLogin(email, password);
                        await signIn(jwt);
                        showToast('Signed in', 'success');
                        router.replace('/logo-intro');
                      } catch (e) {
                        showToast(e instanceof Error ? e.message : 'Sign in failed', 'error');
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                    disabled={submitting}
                    accessibilityRole="button"
                    accessibilityLabel="Sign in">
                    {submitting ? (
                      <ActivityIndicator color="#041a2f" />
                    ) : (
                      <>
                        <Text style={styles.ctaText}>Sign In</Text>
                        <Image
                          source={require('@/assets/images/arrow-btn.png')}
                          style={styles.arrowButtonImage}
                        />
                      </>
                    )}
                  </Pressable>
                </View>
              </Animated.View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const baseStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flexFill: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  phoneCard: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    borderRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    shadowOpacity: 0,
    elevation: 0,
  },
  skip: {
    alignSelf: 'flex-end',
    color: '#23384b',
    fontSize: 13,
    fontFamily: 'Montserrat_500Medium',
  },
  illustrationWrap: {
    height: 200,
    maxHeight: 220,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
  },
  copyWrap: {
    marginTop: 8,
    gap: 8,
    alignItems: 'center',
  },
  title: {
    color: '#041a2f',
    fontSize: 29,
    lineHeight: 34,
    fontFamily: 'Montserrat_700Bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#5f7285',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
  },
  formWrap: {
    marginTop: 16,
    gap: 8,
  },
  fieldLabel: {
    color: '#3d5b72',
    fontSize: 12.5,
    fontFamily: 'Montserrat_600SemiBold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#deebf4',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#10263d',
    fontSize: 14,
    backgroundColor: '#fbfdff',
    fontFamily: 'Montserrat_500Medium',
  },
  signUpRow: {
    marginTop: 14,
    alignSelf: 'center',
  },
  signUpText: {
    color: '#5f7285',
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
  },
  signUpBold: {
    color: '#041a2f',
    fontFamily: 'Montserrat_700Bold',
  },
  footerRow: {
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: Calm.progressDot,
  },
  dotActive: {
    width: 18,
    backgroundColor: Calm.primarySoft,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ctaText: {
    color: '#041a2f',
    fontSize: 14,
    fontFamily: 'Montserrat_700Bold',
  },
  arrowButtonImage: {
    width: 52,
    height: 52,
  },
  ctaDisabled: {
    opacity: 0.55,
  },
});
