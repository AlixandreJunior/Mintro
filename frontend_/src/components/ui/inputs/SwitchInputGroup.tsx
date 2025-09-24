import React from 'react';
import { View, Text, StyleSheet, Switch, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface SwitchItem<T extends string> {
  key: T;
  label: string;
  value: boolean;
}

interface Props<T extends string> {
  containerLabel: string;
  items: SwitchItem<T>[];
  onToggle: (key: T) => void;
}

export default function SwitchInputGroup<T extends string>({
    containerLabel,
    items,
    onToggle,
}: Props<T>) {
  return (
    <>
    <Text style={styles.label}>{containerLabel}</Text>
    <View style={styles.container}>      
      {items.map((item) => (
        <View key={item.key} style={styles.itemItem}>
          <Text style={styles.itemText}>{item.label}</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={item.value ? '#4CAF50' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => onToggle(item.key)}
            value={item.value}
          />
        </View>
      ))}
    </View>
        </>
  );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#4B5563',
        marginBottom: 2
    },
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: height * 0.01,
    paddingHorizontal: width * 0.04,
  },
  itemItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.015,
  },
  itemText: {
    fontSize: width * 0.04,
    color: '#333',
  },
});
