import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface UserInfoSectionProps {
  displayName: string;
  avatarChar: string;
  joinYear: number | string;
  onLogout: () => void; 
}


export const UserInfoSection: React.FC<UserInfoSectionProps> = ({
  avatarChar,
  displayName,
  joinYear,
  onLogout
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.formCardCommon}>
        <View style={styles.userInfoTop}>
          <View>
            <Text style={styles.userName}>{displayName}</Text>
            <Text style={styles.joinDate}>Entrou em {joinYear}</Text>
          </View>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{avatarChar}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editProfileButton} onPress={onLogout}>
          <Text style={styles.editProfileText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.01,
  },
  formCardCommon: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 16,
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    width: width * 0.9,
    paddingVertical: height * 0.025,
    paddingHorizontal: width * 0.06,
  },
  userInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
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
  avatarPlaceholder: {
    width: width * 0.17,
    height: width * 0.17,
    borderRadius: (width * 0.17) / 2,
    backgroundColor: '#79D457',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins_400Regular',
    color: '#FFFFFF',
  },
  editProfileButton: {
    alignSelf: 'flex-start',
  },
  editProfileText: {
    fontSize: width * 0.038,
    fontFamily: 'Poppins_400Regular',
    color: '#ff1f1fff',
  },
});
