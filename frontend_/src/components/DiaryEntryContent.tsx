import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const screen = Dimensions.get('window');

interface DiaryEntryContentProps {
  title: string;
  content: string;
  photoUrl?: string;
}

export const DiaryEntryContent: React.FC<DiaryEntryContentProps> = ({
  title,
  content,
  photoUrl,
}) => (
  <View>
    <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
      {title}
    </Text>
    <Text style={styles.content}>{content}</Text>
    {photoUrl && (
      <Image
        source={{ uri: photoUrl }}
        style={[styles.photo, { maxHeight: screen.width * 0.5 }]}
      />
    )}
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    lineHeight: 16,
    marginVertical: 4,
    color: '#2B2B2B',
  },
  content: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    lineHeight: 14,
    color: '#2B2B2B',
  },
  photo: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
    marginTop: 12,
    resizeMode: 'contain',
  },
});
