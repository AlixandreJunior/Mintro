import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { ProfileAvatar } from './ProfileAvatar';
import { ProfileInfo } from './ProfileInfo';

const { height } = Dimensions.get('window');

interface ProfileUserInfoSectionProps {
  displayName: string;
  avatarChar: string;
  joinYear: number | string;
}


export const ProfileUserInfoSection: React.FC<ProfileUserInfoSectionProps> = ({
  avatarChar,
  displayName,
  joinYear,
}) => {
  return (
    <View style={styles.userInfoTop}>
        <ProfileInfo displayName={displayName} joinYear={joinYear}/>
        <ProfileAvatar avatarChar={avatarChar}/>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
});
