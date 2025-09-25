import { StatusBar, View } from 'react-native';
import { Slot, Stack } from 'expo-router';
import CustomTabBar from '../../../components/CustomTabBar';
import Header from '@/components/layout/Header';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Slot />
      </Stack>
      <CustomTabBar />
    </View>
  );
}
