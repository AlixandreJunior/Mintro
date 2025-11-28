import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Dimensions,
  ViewStyle,
} from 'react-native';

const { width } = Dimensions.get('window');

interface SwitchItem<T extends string> {
  key: T;
  label: string;
  value: boolean;
}

interface Props<T extends string> {
  containerLabel: string;
  items: SwitchItem<T>[];
  onToggle: (key: T) => void;
  errors?: string[];
}

export default function SwitchInputGroup<T extends string>({
  containerLabel,
  items,
  onToggle,
  errors,
}: Props<T>) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{containerLabel}</Text>

      <View style={[styles.container, errors && styles.containerError]}>
        {items.map((item, index) => (
          <View key={item.key}>
            <View style={styles.row}>
              <Text style={styles.itemText}>{item.label}</Text>

              <Switch
                value={item.value}
                onValueChange={() => onToggle(item.key)}
                trackColor={{ false: '#E5E7EB', true: '#A7C6FF' }}
                thumbColor={item.value ? '#3B82F6' : '#FFFFFF'}
              />
            </View>

            {index < items.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>

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
  label: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#000000ff',
    marginBottom: 2,
  },

  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  } as ViewStyle,

  containerError: {
    borderColor: '#EF4444',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  separator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    opacity: 0.7,
  },

  itemText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#1F2937',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Poppins_400Regular',
  },
});
