import type { ConfigContext, ExpoConfig } from 'expo/config';

/**
 * Production-oriented defaults. Override bundle IDs with env at build time if needed:
 *   IOS_BUNDLE_ID=com.yourorg.quikinspect ANDROID_PACKAGE=com.yourorg.quikinspect
 */
export default ({ config }: ConfigContext): ExpoConfig => {
  const apiUrl = (process.env.EXPO_PUBLIC_API_URL ?? '').trim().replace(/\/$/, '');
  const allowCleartext = apiUrl.startsWith('http://');

  return {
    ...config,
    name: 'Quik Inspect',
    slug: 'quik-inspect',
    extra: {
      ...config.extra,
      /** Fallback when Metro env injection differs from native manifest (EAS / rebuilds). */
      apiUrl,
    },
    ios: {
      ...config.ios,
      bundleIdentifier: process.env.IOS_BUNDLE_ID ?? 'com.quikinspect.app',
      infoPlist: {
        ...config.ios?.infoPlist,
        NSAllowsLocalNetworking: true,
      },
    },
    android: {
      ...config.android,
      package: process.env.ANDROID_PACKAGE ?? 'com.quikinspect.app',
      softwareKeyboardLayoutMode: 'resize',
      ...(allowCleartext ? { usesCleartextTraffic: true } : {}),
    } as ExpoConfig['android'],
  };
};
