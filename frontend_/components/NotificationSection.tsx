import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width, height } = Dimensions.get('window');

interface NotificationItem {
  id: string;
  type: 'passos' | 'hidratacao' | 'consulta';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: { [key: string]: NotificationItem[] } = {
  Hoje: [
    {
      id: '1',
      type: 'passos',
      title: 'Meta de Passos',
      description: 'Parabéns! Você completou sua meta diária de 8.000 passos',
      time: 'há 4h',
      read: false,
    },
    {
      id: '2',
      type: 'hidratacao',
      title: 'Hidratação',
      description: 'Lembre-se de beber água! Você bebeu 1.2L hoje',
      time: 'há 6h',
      read: false,
    },
  ],
  Ontem: [
    {
      id: '3',
      type: 'passos',
      title: 'Meta de Passos',
      description: 'Parabéns! Você completou sua meta diária de 8.000 passos',
      time: '22:30',
      read: true,
    },
    {
      id: '4',
      type: 'consulta',
      title: 'Consulta Agendada',
      description: 'Consulta com Dr. Silva agendada para amanhã às 15:00',
      time: '14:00',
      read: true,
    },
  ],
};

const NotificationSection: React.FC = () => {
  const handleNotificationPress = (notificationId: string) => {
    Alert.alert('Notificação Clicada', `Você clicou na notificação ID: ${notificationId}`);
  };

  const renderNotificationItem = (notification: NotificationItem): React.JSX.Element => {
    let iconName: string;
    let iconColor: string;
    let iconBgColor: string;

    switch (notification.type) {
      case 'passos':
        iconName = 'run';
        iconColor = '#6B7280';
        iconBgColor = 'rgba(107, 114, 128, 0.2)';
        break;
      case 'hidratacao':
        iconName = 'cup';
        iconColor = '#6B7280';
        iconBgColor = 'rgba(127, 176, 105, 0.2)';
        break;
      case 'consulta':
        iconName = 'calendar';
        iconColor = '#6B7280';
        iconBgColor = 'rgba(107, 114, 128, 0.2)';
        break;
      default:
        iconName = 'information-outline';
        iconColor = '#757575';
        iconBgColor = 'rgba(107, 114, 128, 0.2)';
    }

    return (
      <ScrollView style={{flex: 1}}>
      <TouchableOpacity
        key={notification.id}
        style={styles.notificationCard}
        onPress={() => handleNotificationPress(notification.id)}
      >
        <View style={[styles.iconCircle, { backgroundColor: iconBgColor }]}>
          <MaterialCommunityIcons name={iconName as any} size={width * 0.045} color={iconColor} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationDescription}>{notification.description}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.notificationTime}>{notification.time}</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {Object.keys(MOCK_NOTIFICATIONS).map((sectionTitle) => (
          <View key={sectionTitle} style={styles.notificationSection}>
            <Text style={styles.sectionHeaderTitle}>{sectionTitle}</Text>
            {MOCK_NOTIFICATIONS[sectionTitle].map(renderNotificationItem)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fffff',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: height * 0.01,
  },
  notificationSection: {
    marginBottom: height * 0.01,
  },
  sectionHeaderTitle: {
    fontSize: width * 0.04,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
    paddingLeft: width * 0.04,
    marginBottom: height * 0.015,
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
  unreadIndicator: {
    width: width * 0.02,
    height: width * 0.02,
    borderRadius: (width * 0.02) / 2,
    backgroundColor: '#FF0000',
  },
});

export default NotificationSection;
