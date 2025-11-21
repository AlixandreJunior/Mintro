import { SafeAreaView } from 'react-native';
import HeaderWithOptions from '@/share/components/layout/HeaderWithOptions';
import Header from '@/share/components/layout/Header';
import NotificationSection from '@/features/user/reminder/components/NotificationSection';
import NotificationScreen from '@/features/user/reminder/screens/ReminderScreen';

export default function Notification(): React.JSX.Element {
  return <NotificationScreen />;
}
