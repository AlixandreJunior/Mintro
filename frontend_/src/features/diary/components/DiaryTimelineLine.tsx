import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface DiaryTimelineLineProps {
  children: ReactNode;
  lineColor?: string;
  lineWidth?: number;
  lineStyle?: 'solid' | 'dashed' | 'dotted';
  offset?: number;
}

export const DiaryTimelineLine: React.FC<DiaryTimelineLineProps> = ({
  children,
  lineColor = '#525252',
  lineWidth = 2,
  lineStyle = 'dashed',
  offset = 24,
}) => {
  const styles = createStyles({ lineColor, lineWidth, lineStyle, offset });

  return (
    <View style={styles.container}>
      <View style={styles.verticalLine} />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

interface StyleParams {
  lineColor: string;
  lineWidth: number;
  lineStyle: 'solid' | 'dashed' | 'dotted';
  offset: number;
}

const createStyles = ({
  lineColor,
  lineWidth,
  lineStyle,
  offset,
}: StyleParams) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      paddingLeft: offset,
    },
    verticalLine: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: offset / 2,
      borderLeftColor: lineColor,
      borderLeftWidth: lineWidth,
      borderStyle: lineStyle,
    },
    content: {
      flexDirection: 'column',
    },
  });

export default DiaryTimelineLine;
