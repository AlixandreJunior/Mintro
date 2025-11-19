import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

interface DiaryEntryContentProps {
  title: string;
  content: string;
  photoUrl?: string;
  maxImageRatio?: number;
}

export const DiaryEntryContent: React.FC<DiaryEntryContentProps> = ({
  title,
  content,
  photoUrl,
  maxImageRatio = 0.5,
}) => {
  const screen = useWindowDimensions();
  const styles = createStyles(screen.width, maxImageRatio);

  return (
    <View>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>

      <Text style={styles.content}>{content}</Text>

      {photoUrl && <Image source={{ uri: photoUrl }} style={styles.photo} />}
    </View>
  );
};

const createStyles = (screenWidth: number, maxRatio: number) =>
  StyleSheet.create({
    title: {
      fontFamily: 'Poppins_500Medium',
      fontSize: 12,
      lineHeight: 16,
      marginBottom: 4,
      color: '#2B2B2B',
    },

    content: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 11,
      lineHeight: 16,
      color: '#2B2B2B',
      marginBottom: 8,
    },

    photo: {
      width: '100%',
      maxHeight: screenWidth * maxRatio,
      aspectRatio: 16 / 9,
      borderRadius: 10,
      marginTop: 8,
      resizeMode: 'cover', // melhor visual em feed
    },
  });
