import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNotifications } from '@/share/hooks/useReminder';

const { width, height } = Dimensions.get('window');

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  date: string; // vamos formatar depois
  type: 'goal' | 'reminder' | 'other';
}

const NotificationSection: React.FC = () => {
  const { getNotificationHistory } = useNotifications();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const history = await getNotificationHistory();
      const sorted = history
        .map((n) => ({
          ...n,
          date: new Date(n.date).toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit',
          }),
        }))
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      setNotifications(sorted);
    };

    fetchNotifications();
  }, []);

  const handleNotificationPress = (notificationId: string) => {
    Alert.alert(
      'Notificação Clicada',
      `Você clicou na notificação ID: ${notificationId}`
    );
  };

  const renderNotificationItem = (notification: NotificationItem) => {
    let iconName = 'information-outline';
    let iconColor = '#757575';
    let iconBgColor = 'rgba(107, 114, 128, 0.2)';

    if (notification.type === 'goal') {
      iconName = 'trophy';
      iconColor = '#F59E0B';
      iconBgColor = 'rgba(245, 158, 11, 0.2)';
    } else if (notification.type === 'reminder') {
      iconName = 'bell';
      iconColor = '#10B981';
      iconBgColor = 'rgba(16, 185, 129, 0.2)';
    }

    return (
      <TouchableOpacity
        key={notification.id}
        style={styles.notificationCard}
        onPress={() => handleNotificationPress(notification.id)}
      >
        <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
          <MaterialCommunityIcons
            name={iconName as any}
            size={width * 0.045}
            color={iconColor}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationDescription}>
            {notification.body}
          </Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.notificationTime}>{notification.date}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {notifications.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 32 }}>
            Nenhuma notificação encontrada.
          </Text>
        ) : (
          notifications.map(renderNotificationItem)
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.01,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(184, 230, 184, 0.2)',
    borderRadius: 16,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: width * 0.04,
    marginBottom: height * 0.01,
    padding: width * 0.04,
  },
  iconCircle: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  textContainer: {
    flex: 1,
    marginRight: width * 0.02,
  },
  notificationTitle: {
    fontSize: width * 0.035,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    marginBottom: height * 0.003,
    lineHeight: width * 0.045,
  },
  notificationDescription: {
    fontSize: width * 0.032,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    lineHeight: width * 0.045,
  },
  timeContainer: {
    height: '90%',
    alignItems: 'flex-end',
  },
  notificationTime: {
    fontSize: width * 0.032,
    fontFamily: 'Poppins_400Regular',
    color: '#6B7280',
    marginBottom: height * 0.005,
    lineHeight: width * 0.035,
  },
});

export default NotificationSection;
