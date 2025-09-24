import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface DiaryTimelineLineProps {
  children: ReactNode;
}

const DiaryTimelineLine: React.FC<DiaryTimelineLineProps> = ({ children }) => {
  return (
    <View style={styles.timelineContainer}>
      <View style={styles.timelineLineContainer}>
        <View style={styles.continuousTimelineLine} />
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    position: 'relative',
    paddingLeft: 25,
  },
  timelineLineContainer: {
    position: 'absolute',
    left: 20,
    top: 0,
    bottom: 0,
    width: 2,
    alignItems: 'center',
    marginLeft: -20,
  },
  continuousTimelineLine: {
    width: 2,
    height: '100%',
    borderLeftWidth: 1.5,
    borderLeftColor: '#525252',
    borderStyle: 'dashed',
  },
});

export default DiaryTimelineLine;
