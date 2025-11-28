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
  const { width: screenWidth } = useWindowDimensions();
  const cardPadding = 24; // considerar padding do card
  const maxWidth = screenWidth - cardPadding;

  const styles = createStyles(maxWidth, maxImageRatio);

  return (
    <View>
      {title ? (
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      ) : null}

      {content ? (
        <Text style={styles.content} numberOfLines={4} ellipsizeMode="tail">
          {content}
        </Text>
      ) : null}

      {photoUrl && (
        <Image
          source={{ uri: photoUrl }}
          style={[styles.photo, { maxWidth }]}
        />
      )}
    </View>
  );
};

const createStyles = (maxWidth: number, maxRatio: number) =>
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
      aspectRatio: 16 / 9,
      maxHeight: maxWidth * maxRatio, 
      borderRadius: 10,
      marginTop: 8,
      resizeMode: 'cover',
    },
  });
