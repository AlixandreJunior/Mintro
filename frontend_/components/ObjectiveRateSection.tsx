import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

interface ObjectiveRateSectionProps{

}

const ObjectiveRateSection: React.FC<ObjectiveRateSectionProps> = ({

}) => {
    const successRate = {
        currentWeek: '33%',
        previousWeeks: '0%',
    };

    return(
        <SafeAreaView>
            <Text style={styles.sectionTitle}>Taxa de sucesso</Text>
            <View style={styles.successRateContainer}>
                <View style={styles.successRateCard}>
                <Text style={styles.successRatePercentage}>{successRate.currentWeek}</Text>
                <Text style={styles.successRateLabel}>Esta Semana</Text>
                </View>
                <View style={styles.successRateCard}>
                <Text style={styles.successRatePercentage}>{successRate.previousWeeks}</Text>
                <Text style={styles.successRateLabel}>Semanas anteriores</Text>
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
    successRateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: width * 0.05,
        marginBottom: height * 0.02,
        },
    successRateCard: {
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
    successRatePercentage: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    successRateLabel: {
        fontSize: width * 0.035,
        color: '#666',
        textAlign: 'center',
    },
})

export default ObjectiveRateSection