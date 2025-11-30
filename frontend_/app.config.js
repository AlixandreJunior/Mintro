import 'dotenv/config';

export default {
  expo: {
    name: 'MIntro',
    slug: 'mintro', // slug do projeto
    version: '1.0.1',
    orientation: 'portrait',
    icon: './src/share/assets/images/icon.png',
    scheme: 'mintro',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      package: 'com.alixandre.mintro',
      versionCode: 1,
      buildType: 'apk',
    },
    web: {
      bundler: 'metro',
      output: 'single',
      favicon: './src/assets/images/favicon.png',
    },
    splash: {
      image: './src/share/assets/splashscreen_logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    plugins: [
      'expo-router',
      'expo-font',
      'expo-web-browser',
      [
        'expo-image-picker',
        {
          photosPermission: 'O aplicativo precisa acessar suas fotos.',
        },
      ],
      'expo-splash-screen',
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      apiUrl: process.env.EXPO_API_URL,
      eas: {
        projectId: '8314ee45-5777-4547-8a14-146edc5b7f9c',
      },
    },
  },
};
