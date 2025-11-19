import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface PhotoPickerProps {
  selectedImageUri?: string | null;
  onImageSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const PhotoPicker: React.FC<PhotoPickerProps> = ({
  selectedImageUri,
  onImageSelected,
}) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão Negada',
        'Desculpe, precisamos de permissões da galeria para isso funcionar!'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'], // CORRETO
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log('URI correta:', uri);
      onImageSelected(uri);
    } else {
      onImageSelected(undefined);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Foto</Text>
      <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
        {selectedImageUri ? (
          <Image
            source={{ uri: selectedImageUri }}
            style={styles.selectedPhoto}
          />
        ) : (
          <>
            <MaterialCommunityIcons
              name="image-outline"
              size={60}
              color="#BDC3C7"
            />
            <Text style={styles.photoChooseText}>Escolher Foto</Text>
            <Text style={styles.photoHintText}>
              Clique para adicionar uma foto
            </Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#4B5563',
    marginBottom: 15,
    textAlign: 'left',
  },
  photoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2, // borda mais espessa
    borderColor: '#989898', // verde suave, mais visível que o cinza claro
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    overflow: 'hidden',
    shadowColor: '#A3BE8C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPhoto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10, // suavizado para combinar com o container
  },
  photoChooseText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6DA544', // tom de verde mais consistente com a borda
    marginTop: 12,
  },
  photoHintText: {
    fontSize: 13,
    color: '#6B7280', // cinza médio para boa leitura
    marginTop: 6,
  },
});

export default PhotoPicker;
