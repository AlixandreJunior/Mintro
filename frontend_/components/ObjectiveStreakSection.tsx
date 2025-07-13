import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

interface ObjectiveStreakSectionProps{

}

const ObjectiveStreakSection: React.FC<ObjectiveStreakSectionProps> = ({

}) => {
    const streakData = {
        current: 1,
        longest: 2,
    };
    
    return(
        <SafeAreaView>
            <Text style={styles.sectionTitle}>Sequência</Text>
            <View style={styles.streakContainer}>
            <View style={styles.streakCard}>
                <View style={styles.streakIconCircle}>
                <MaterialCommunityIcons name="fire" size={width * 0.08} color="#FF9800" />
                </View>
                <Text style={styles.streakNumber}>{streakData.current}</Text>
                <Text style={styles.streakLabel}>sequência atual</Text>
            </View>
            <View style={styles.streakCard}>
                <View style={styles.streakIconCircle}>
                <MaterialCommunityIcons name="water" size={width * 0.08} color="#2196F3" />
                </View>
                <Text style={styles.streakNumber}>{streakData.longest}</Text>
                <Text style={styles.streakLabel}>sequência mais longa</Text>
            </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: width * 0.05,
    marginBottom: height * 0.015,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.02,
  },
  streakCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: height * 0.02,
    width: width * 0.42,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  streakIconCircle: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: (width * 0.15) / 2,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#333',
  },
  streakLabel: {
    fontSize: width * 0.035,
    color: '#666',
    textAlign: 'center',
  },
})

export default ObjectiveStreakSection