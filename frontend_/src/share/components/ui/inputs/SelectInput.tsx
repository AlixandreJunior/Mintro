import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface SelectInputProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  errors?: string[];
}

export default function SelectInputStyled({
  label,
  selectedValue,
  onValueChange,
  options,
  errors,
}: SelectInputProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel =
    options.find((o) => o.value === selectedValue)?.label || 'Selecionar';

  return (
    <View style={styles.inputSection}>
      <Text style={styles.inputLabel}>{label}</Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.selectButton,
          errors ? { borderColor: '#EF4444' } : null,
        ]}
      >
        <Text style={styles.selectButtonText}>{selectedLabel}</Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={24}
          color="#555"
          style={styles.selectIcon}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
          style={styles.modalOverlay}
        >
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.scrollArea}>
              {options.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => {
                    onValueChange(opt.value);
                    setModalVisible(false);
                  }}
                  style={[
                    styles.optionItem,
                    opt.value === selectedValue && styles.optionItemSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.optionText,
                      opt.value === selectedValue && styles.optionTextSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      {errors &&
        errors.map((errMsg, index) => (
          <Text key={index} style={styles.errorText}>
            {errMsg}
          </Text>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 10,
  },

  inputLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000',
    marginBottom: 4,
  },

  selectButton: {
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1.4,
    borderColor: '#D1D5DB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    justifyContent: 'space-between',
  },

  selectButtonText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
  },

  selectIcon: {
    marginLeft: 8,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    maxHeight: height * 0.45,
    paddingVertical: 10,
    paddingHorizontal: 6,
    elevation: 8,
  },

  scrollArea: {
    maxHeight: height * 0.4,
  },

  /* OPTION ITEM */
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  optionItemSelected: {
    backgroundColor: '#F3F4F6',
  },

  optionText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
  },

  optionTextSelected: {
    fontFamily: 'Poppins_600SemiBold',
    color: '#111',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});
