import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SelectInputProps {
  label: string
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: {label: string, value: string}[];
}

export default function SelectInput({
  label,
  selectedValue,
  onValueChange,
  options,
}: SelectInputProps) {
  return (
    <SafeAreaView>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.pickerContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(String(itemValue))}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  label: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#4B5563',
        marginBottom: 2
    },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: width * 0.03,
  },
  picker: {
    flex: 1,
    height: height * 0.065,
    color: '#333',
  },
  pickerItem: {
    fontSize: width * 0.04,
  },
  pickerIcon: {},
});
