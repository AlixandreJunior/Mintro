import { SafeAreaView } from 'react-native';
import HeaderWithOptions from '@/components/layout/HeaderWithOptions';
import NotificationSection from '@/components/NotificationSection';

const NotificationScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderWithOptions title="Notificações" />
      <NotificationSection />
    </SafeAreaView>
  );
};

export default NotificationScreen;
