import { View } from 'react-native';
import { Slot } from 'expo-router';
import Header from '@/share/components/layout/Header';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Slot />
    </View>
  );
}
