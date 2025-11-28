import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

interface PhotoPickerProps {
  selectedImageUri?: string | null;
  onImageSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
  errors?: string[]; // ✅ adicionando suporte a erros
}

const PhotoPicker: React.FC<PhotoPickerProps> = ({
  selectedImageUri,
  onImageSelected,
  errors,
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
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      onImageSelected(uri);
    } else {
      onImageSelected(undefined);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Foto</Text>
      <TouchableOpacity
        style={[
          styles.photoContainer,
          errors ? { borderColor: '#EF4444' } : null, // ✅ borda vermelha se houver erro
        ]}
        onPress={pickImage}
      >
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

      {errors &&
        errors.map((errMsg, index) => (
          <Text key={index} style={styles.errorText}>
            {errMsg}
          </Text>
        ))}
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
    borderWidth: 2,
    borderColor: '#989898',
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
    borderRadius: 10,
  },
  photoChooseText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6DA544',
    marginTop: 12,
  },
  photoHintText: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 6,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});

export default PhotoPicker;
