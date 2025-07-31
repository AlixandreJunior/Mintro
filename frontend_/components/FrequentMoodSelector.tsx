// components/FrequentMoodSelector.tsx
import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MoodType } from '@/types/mental/diary';

const { width, height } = Dimensions.get('window');

// Tipagens (mantidas aqui para auto-suficiência)
const MOOD_COLORS: { [key in MoodType]: string } = {
  Excelente: '#4CAF50',
  Bom: '#8BC34A',
  Neutro: '#FFEB3B',
  Ruim: '#FF9800',
  Péssimo: '#F44336',
};
const MOOD_ICONS: { [key in MoodType]: string } = {
  Excelente: 'robot-happy-outline',
  Bom: 'robot-outline',
  Neutro: 'robot-off-outline',
  Ruim: 'robot-dead',
  Péssimo: 'robot-angry-outline',
};

interface FrequentMoodSelectorProps {
  selectedMood: MoodType;
  onSelect: (mood: MoodType) => void;
  moodCount: number; // Nova prop para a contagem (3x)
}

export default function FrequentMoodSelector({ selectedMood, onSelect, moodCount }: FrequentMoodSelectorProps): React.JSX.Element {
  return (
    <TouchableOpacity 
        style={styles.selectorButton} 
        onPress={() => onSelect(selectedMood)} // Ação de seleção
    >
      <MaterialCommunityIcons
      //@ts-ignore
        name={MOOD_ICONS[selectedMood]}
        size={width * 0.055} // Ajustado para o tamanho do ícone (21.51px do CSS)
        color="#B2B2B1" // Cor do ícone robô no Figma (base)
        style={styles.robotIcon}
      />
      <Text style={styles.moodText}>
        {selectedMood} ({moodCount}x)
      </Text>
      <MaterialCommunityIcons
        name="chevron-down"
        size={width * 0.05}
        color="rgba(0, 0, 0, 0.7)" // Cor da seta (preto com 70% de opacidade)
        style={styles.dropdownIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  selectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)', // Cor da borda
    borderRadius: 20, // Raio da borda
    width: width * 0.55, // Largura responsiva (~209px do CSS)
    height: height * 0.045, // Altura responsiva (~38px do CSS)
    justifyContent: 'center', // Centraliza o conteúdo
    alignSelf: 'center', // Centraliza o botão dentro do pai
    marginBottom: height * 0.02, // Espaçamento abaixo do botão
    paddingHorizontal: width * 0.02, // Padding interno
  },
  robotIcon: {
    marginRight: width * 0.02, // Espaçamento à direita do ícone robô
  },
  moodText: {
    fontSize: width * 0.03, // Tamanho da fonte (11px do CSS)
    fontFamily: 'Poppins_500Medium', // Poppins Medium
    color: '#000000',
  },
  dropdownIcon: {
    marginLeft: width * 0.02, // Espaçamento à esquerda da seta
  },
});