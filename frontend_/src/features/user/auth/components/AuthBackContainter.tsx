import React from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { Text } from 'react-native';

const { width, height } = Dimensions.get('window');

interface AuthBackContainerProps {
  backText: string;
  handleBack: (event: GestureResponderEvent) => void;
  backLink: string;
}

export const AuthBackContainer: React.FC<AuthBackContainerProps> = ({
  backText,
  handleBack,
  backLink,
}) => {
  return (
    <View style={styles.backContainer}>
      <Text style={styles.backText}>{backText} </Text>
      <TouchableOpacity onPress={handleBack}>
        <Text style={styles.backLink}>{backLink}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  backText: {
    fontSize: width * 0.04,
    color: '#6B7280',
    fontWeight: '400',
  },
  backLink: {
    fontSize: width * 0.04,
    color: '#79D457',
    fontWeight: '600',
  },
});
