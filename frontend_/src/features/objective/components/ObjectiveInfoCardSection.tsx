import React from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import InfoCard from '../../../share/components/InfoCard';
import MainCard from '../../../share/components/MainCard';

const { width, height } = Dimensions.get('window');

export interface InfoCardItem {
  value: number | string;
  label: string;
  icon?: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
}

interface ObjectiveInfoCardSectionProps {
  title: string;
  items: InfoCardItem[];
}

const ObjectiveInfoCardSection: React.FC<ObjectiveInfoCardSectionProps> = ({
  title,
  items,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <MainCard>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.innerContainer}>
          {items.map((item, index) => (
            <InfoCard
              key={index}
              value={item.value}
              label={item.label}
              icon={item.icon}
              backgroundColor={item.backgroundColor}
              borderColor={item.borderColor}
            />
          ))}
        </View>
      </MainCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    marginVertical: height * 0.01,
    marginHorizontal: width * 0.05,
  },
  title: {
    fontSize: width * 0.045,
    fontFamily: 'Poppins_500Medium',
    color: '#000',
    lineHeight: width * 0.06,
    marginBottom: height * 0.015,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    gap: width * 0.03,
  },
});

export default ObjectiveInfoCardSection;
