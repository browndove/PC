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
import { useSignUpDraft } from '@/context/sign-up-draft';
import { useKeyboardAvoidingOffset } from '@/hooks/useKeyboardAvoidingOffset';
import { apiSignup, getApiErrorMessage, isApiConfigured } from '@/lib/auth-api';
import { Calm } from '@/theme/calm';
import { useResponsive, useScaledStyles } from '@/hooks/useResponsive';

const MIN_PASSWORD_LEN = 8;

export default function SignUpPasswordScreen() {
  const styles = useScaledStyles(baseStyles);
  const keyboardVerticalOffset = useKeyboardAvoidingOffset();
  const { height: windowHeight } = useWindowDimensions();
  const { isTablet, device } = useResponsive();
  const { profile, setProfile } = useSignUpDraft();
  const { signIn } = useAuthSession();
  const { show: showToast } = useIosToast();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const confirmRef = useRef<TextInput>(null);
  const cardY = useRef(new Animated.Value(24)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const artFloat = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!profile) {
      router.replace('/sign-up');
    }
  }, [profile]);

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
      ]),
    ).start();
  }, [artFloat, cardOpacity, cardY]);

  const passwordsMatch =
    password.length > 0 && password === confirmPassword;
  const canSubmit =
    password.length >= MIN_PASSWORD_LEN && passwordsMatch;

  const finishSignUp = async () => {
    if (!canSubmit || !profile) return;
    if (isApiConfigured()) {
      setSubmitting(true);
      try {
        const { token } = await apiSignup({
          email: profile.email,
          password,
          firstName: profile.firstName,
          lastName: profile.lastName,
        });
        await signIn(token);
        setProfile(null);
        showToast('Account created', 'success');
        router.replace('/logo-intro');
      } catch (e) {
        showToast(getApiErrorMessage(e), 'error');
      } finally {
        setSubmitting(false);
      }
    } else {
      setProfile(null);
      showToast('Continuing without an account', 'info');
      router.replace('/logo-intro');
    }
  };

  if (!fontsLoaded || !profile) {
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
                <Pressable onPress={() => router.back()} hitSlop={12}>
                  <Text style={styles.back}>Back</Text>
                </Pressable>

                <Animated.View
                  style={[styles.illustrationWrap, { transform: [{ translateY: artFloat }] }]}>
                  <Image
                    source={require('@/assets/images/search-engines-bro.svg')}
                    style={styles.illustration}
                    contentFit="contain"
                  />
                </Animated.View>

                <View style={styles.copyWrap}>
                  <Text style={styles.title}>Set your password</Text>
                  <Text style={styles.subtitle}>
                    Choose a password for{' '}
                    <Text style={styles.subtitleEmph}>{profile.email}</Text>
                  </Text>
                </View>

                <View style={styles.formWrap}>
                  <Text style={styles.fieldLabel}>Password</Text>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="At least 8 characters"
                    placeholderTextColor="#8ca0b3"
                    style={styles.input}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="newPassword"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => confirmRef.current?.focus()}
                  />
                  <Text style={styles.fieldLabel}>Confirm password</Text>
                  <TextInput
                    ref={confirmRef}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Re-enter password"
                    placeholderTextColor="#8ca0b3"
                    style={styles.input}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="newPassword"
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
                  {confirmPassword.length > 0 && !passwordsMatch ? (
                    <Text style={styles.hintError}>Passwords do not match.</Text>
                  ) : null}
                  {password.length > 0 && password.length < MIN_PASSWORD_LEN ? (
                    <Text style={styles.hintMuted}>
                      Use at least {MIN_PASSWORD_LEN} characters.
                    </Text>
                  ) : null}
                </View>

                <Pressable
                  onPress={() => {
                    setProfile(null);
                    router.replace('/login');
                  }}
                  style={styles.switchRow}
                  hitSlop={8}>
                  <Text style={styles.switchText}>
                    Already have an account?{' '}
                    <Text style={styles.switchBold}>Sign in</Text>
                  </Text>
                </Pressable>

                <View style={styles.footerRow}>
                  <View style={styles.dots}>
                    <View style={[styles.dot, styles.dotFilled]} />
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={styles.dot} />
                  </View>

                  <Pressable
                    style={[styles.ctaButton, (!canSubmit || submitting) && styles.ctaButtonDisabled]}
                    disabled={!canSubmit || submitting}
                    onPress={() => {
                      Keyboard.dismiss();
                      void finishSignUp();
                    }}>
                    {submitting ? (
                      <ActivityIndicator color="#041a2f" />
                    ) : (
                      <>
                        <Text style={styles.ctaText}>Create account</Text>
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
  back: {
    alignSelf: 'flex-start',
    color: '#23384b',
    fontSize: 13,
    fontFamily: 'Montserrat_500Medium',
  },
  illustrationWrap: {
    height: 180,
    maxHeight: 200,
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
    paddingHorizontal: 8,
  },
  subtitleEmph: {
    color: '#041a2f',
    fontFamily: 'Montserrat_600SemiBold',
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
  hintError: {
    color: '#c62828',
    fontSize: 12,
    fontFamily: 'Montserrat_500Medium',
    marginTop: 2,
  },
  hintMuted: {
    color: '#5f7285',
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    marginTop: 2,
  },
  switchRow: {
    marginTop: 14,
    alignSelf: 'center',
  },
  switchText: {
    color: '#5f7285',
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    textAlign: 'center',
  },
  switchBold: {
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
  dotFilled: {
    backgroundColor: Calm.primarySoft,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ctaButtonDisabled: {
    opacity: 0.45,
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
});
