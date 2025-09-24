import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import NotificationIcon from '../icons/ChatIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserProfile } from '@/hooks/useUserProfile';


const { width, height } = Dimensions.get('window');

const Header = () => {
  const { user} = useUserProfile();
  
    const avatarChar = user?.username
      ? user.username.charAt(0).toUpperCase()
      : 'A';
  

  const logoSource = require('@/assets/images/logosrobomintro.png');
  return (
    <SafeAreaView style={styles.header}>
      <TouchableOpacity
        style={styles.avatarContainer}
        onPress={() => router.push('/(tabs)/profile')}
      >
        <Text style={styles.avatarText}>{avatarChar}</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          source={logoSource}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity onPress={() => router.push('/notification')}>
        <NotificationIcon />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    paddingVertical: height * 0.01,
    backgroundColor: '#86D293',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    minHeight: height * 0.04,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: Math.min(width * 0.5, 90),
    height: Math.min(width * 0.15, 40),
    resizeMode: 'contain',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#79D457',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Header;
