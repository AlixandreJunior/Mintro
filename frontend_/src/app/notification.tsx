import { SafeAreaView } from 'react-native';
import HeaderWithOptions from '@/components/layout/HeaderWithOptions';
import Header from '@/components/layout/Header';
import NotificationSection from '@/components/NotificationSection';

export default function NotificationScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header avatarChar="A" />
      <HeaderWithOptions title="Notificações" />
      <NotificationSection />
    </SafeAreaView>
  );
}
