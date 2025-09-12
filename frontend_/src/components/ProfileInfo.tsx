import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

interface ProfileInfoProps {
  displayName: string;
  joinYear: number | string;
}


export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  displayName,
  joinYear,

}) => {
  return (
    <View>
        <Text style={styles.userName}>{displayName}</Text>
        <Text style={styles.joinDate}>Entrou em {joinYear}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userName: {
    fontSize: width * 0.065,
    fontFamily: 'Poppins_400Regular',
    color: '#111827',
  },
  joinDate: {
    fontSize: width * 0.038,
    fontFamily: 'Poppins_400Regular',
    color: '#6B7280',
    marginTop: height * 0.005,
  },
});
