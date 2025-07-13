import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

interface ObjectiveProgressCardProps{

}

const ObjectiveProgressCard: React.FC<ObjectiveProgressCardProps> = ({

}) => {
    const objectiveProgress = {
        current: 1,
        total: 3,
        description: 'para alcançar a meta',
        periodStart: '6 de jul.',
        periodEnd: '12 de jul.',
        daysRemaining: 4,
    };

    return(
        <SafeAreaView>
            <View style={styles.card}>
                <View style={styles.objectiveHeader}>
                    <MaterialCommunityIcons name="check-circle-outline" size={width * 0.06} color="#4CAF50" />
                    <View style={styles.objectiveTitleWrapper}>
                    <MaterialCommunityIcons name="clipboard-text-outline" size={width * 0.05} color="#666" />
                    <Text style={styles.objectiveDate}>Hoje, 3 de jul.</Text>
                    </View>
                </View>
                <View style={styles.progressCirclesContainer}>
                    <Text style={styles.currentProgressText}>{objectiveProgress.current}</Text>
                    <Text style={styles.totalProgressText}> de {objectiveProgress.total}</Text>
                    <View style={styles.progressIcons}>
                    {[...Array(objectiveProgress.total)].map((_, index) => (
                        <MaterialCommunityIcons
                        key={index}
                        name={index < objectiveProgress.current ? 'checkbox-marked-circle' : 'circle-outline'}
                        size={width * 0.045}
                        color={index < objectiveProgress.current ? '#4CAF50' : '#E0E0E0'}
                        style={styles.progressIcon}
                        />
                    ))}
                    </View>
                </View>

                <Text style={styles.progressDescription}>{objectiveProgress.description}</Text>
                <View style={styles.objectiveFooter}>
                    <Text style={styles.objectivePeriod}>{objectiveProgress.periodStart} - {objectiveProgress.periodEnd}</Text>
                    <Text style={styles.objectiveDaysRemaining}>{objectiveProgress.daysRemaining} dias restantes</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: width * 0.05,
    marginBottom: height * 0.02,
    padding: width * 0.04,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  objectiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  objectiveTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: width * 0.02,
  },
  objectiveDate: {
    fontSize: width * 0.038,
    color: '#666',
    marginLeft: width * 0.01,
  },
  progressCirclesContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: height * 0.01,
  },
  currentProgressText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#333',
  },
  totalProgressText: {
    fontSize: width * 0.05,
    color: '#666',
  },
  progressIcons: {
    flexDirection: 'row',
    marginLeft: width * 0.03,
  },
  progressIcon: {
    marginHorizontal: 2,
  },
  progressDescription: {
    fontSize: width * 0.04,
    color: '#666',
    marginBottom: height * 0.02,
  },
  objectiveFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: height * 0.01,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  objectivePeriod: {
    fontSize: width * 0.035,
    color: '#666',
  },
  objectiveDaysRemaining: {
    fontSize: width * 0.035,
    color: '#666',
  },
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  calendarMonth: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: height * 0.01,
  },
  weekDayText: {
    fontSize: width * 0.035,
    color: '#999',
    width: (width * 0.9 / 7) - 10,
    textAlign: 'center',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

export default ObjectiveProgressCard