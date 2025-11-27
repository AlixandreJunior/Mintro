import { View } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';
import CustomTabBar from '@/share/components/CustomTabBar';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <CustomTabBar />
    </View>
  );
}
