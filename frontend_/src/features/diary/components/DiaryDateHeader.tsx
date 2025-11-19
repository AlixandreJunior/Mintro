import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DiaryDateHeaderProps {
  date: string;
  dotColor?: string;
  dotSize?: number;
  textColor?: string;
}

const DiaryDateHeader: React.FC<DiaryDateHeaderProps> = ({
  date,
  dotColor = '#374151',
  dotSize = 10,
  textColor = '#525252',
}) => {
  const styles = createStyles({ dotColor, dotSize, textColor });

  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>{date}</Text>
    </View>
  );
};

interface StyleParams {
  dotColor: string;
  dotSize: number;
  textColor: string;
}

const createStyles = ({ dotColor, dotSize, textColor }: StyleParams) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    dot: {
      width: dotSize,
      height: dotSize,
      borderRadius: dotSize / 2,
      backgroundColor: dotColor,
      marginRight: 8,
    },
    text: {
      fontSize: 12,
      fontFamily: 'Poppins_400Regular',
      color: textColor,
    },
  });

export default DiaryDateHeader;
