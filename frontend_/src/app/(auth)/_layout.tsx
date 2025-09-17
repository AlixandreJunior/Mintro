import { View } from "react-native"
import { Stack } from "expo-router"

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
      </Stack>
    </View>
  )
}
