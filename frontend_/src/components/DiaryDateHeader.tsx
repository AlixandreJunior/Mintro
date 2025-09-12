import { StyleSheet, Text, View } from 'react-native';

const DiaryDateHeader = ({ date }: { date: string }) => (
  <View style={styles.dateHeader}>
    <View style={styles.dateDot} />
    <Text style={styles.dateHeaderText}>{date}</Text>
  </View>
);

const styles = StyleSheet.create({
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#374151',
    marginRight: 6,
    position: 'relative',
    left: -4,
  },
  dateHeaderText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#525252',
  },
});

export default DiaryDateHeader;
