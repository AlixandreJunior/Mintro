import { View } from 'react-native';
import { Stack } from 'expo-router';
import AuthContainer from '@/features/user/auth/components/AuthContainer';

export default function AuthLayout() {
  return (
    <AuthContainer>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
      </Stack>
    </AuthContainer>
  );
}
