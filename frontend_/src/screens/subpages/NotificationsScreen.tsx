import { SafeAreaView } from 'react-native';
import HeaderWithOptions from '@/components/layout/HeaderWithOptions';
import Header from '@/components/layout/Header';
import NotificationSection from '@/components/NotificationSection';

const NotificationScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header avatarChar="A" />
      <HeaderWithOptions title="Notificações" />
      <NotificationSection />
    </SafeAreaView>
  );
};

export default NotificationScreen;
