import { useEffect, useRef, useState } from 'react';
import {
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
import { useSignUpDraft } from '@/context/sign-up-draft';
import { useKeyboardAvoidingOffset } from '@/hooks/useKeyboardAvoidingOffset';
import { Calm } from '@/theme/calm';
import { useResponsive, useScaledStyles } from '@/hooks/useResponsive';

export default function SignUpScreen() {
  const styles = useScaledStyles(baseStyles);
  const keyboardVerticalOffset = useKeyboardAvoidingOffset();
  const { height: windowHeight } = useWindowDimensions();
  const { isTablet, device } = useResponsive();
  const { profile, setProfile } = useSignUpDraft();
  const { show: showToast } = useIosToast();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setEmail(profile.email);
    }
  }, [profile]);

  const cardY = useRef(new Animated.Value(24)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const artFloat = useRef(new Animated.Value(0)).current;

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

  const trimmedEmail = email.trim();
  const canSubmit =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    trimmedEmail.length > 0 &&
    trimmedEmail.includes('@');

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
                  onPress={() => {
                    setProfile(null);
                    router.replace('/login');
                  }}
                  hitSlop={12}>
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
                  <Text style={styles.title}>Create an account</Text>
                  <Text style={styles.subtitle}>
                    Add your name and email, then you&apos;ll set a password on the next step.
                  </Text>
                </View>

                <View style={styles.formWrap}>
                  <Text style={styles.fieldLabel}>First name</Text>
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="First name"
                    placeholderTextColor="#8ca0b3"
                    style={styles.input}
                    autoCapitalize="words"
                    autoCorrect
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => lastNameRef.current?.focus()}
                  />
                  <Text style={styles.fieldLabel}>Last name</Text>
                  <TextInput
                    ref={lastNameRef}
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="Last name"
                    placeholderTextColor="#8ca0b3"
                    style={styles.input}
                    autoCapitalize="words"
                    autoCorrect
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => emailRef.current?.focus()}
                  />
                  <Text style={styles.fieldLabel}>Email</Text>
                  <TextInput
                    ref={emailRef}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor="#8ca0b3"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                  />
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
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={styles.dot} />
                    <View style={styles.dot} />
                  </View>

                  <Pressable
                    style={[styles.ctaButton, !canSubmit && styles.ctaButtonDisabled]}
                    disabled={!canSubmit}
                    onPress={() => {
                      Keyboard.dismiss();
                      setProfile({
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: trimmedEmail,
                      });
                      showToast('Next: set your password', 'success');
                      router.push('/sign-up-password');
                    }}>
                    <Text style={styles.ctaText}>Continue</Text>
                    <Image
                      source={require('@/assets/images/arrow-btn.png')}
                      style={styles.arrowButtonImage}
                    />
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
