import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

interface ObjectiveConclusionSectionProps{

}

const ObjectiveConclusionSection: React.FC<ObjectiveConclusionSectionProps> =({

}) => {
    const conclusionData = {
        total: 1,
        thisMonth: 1,
    };

    return(
        <SafeAreaView>
            <Text style={styles.sectionTitle}>Conclusões</Text>
                <View style={styles.conclusionsContainer}>
                    <View style={styles.conclusionCard}>
                    <Text style={styles.conclusionNumber}>{conclusionData.total}</Text>
                    <Text style={styles.conclusionLabel}>Total de Conclusões</Text>
                    </View>
                    <View style={styles.conclusionCard}>
                    <Text style={styles.conclusionNumber}>{conclusionData.thisMonth}</Text>
                    <Text style={styles.conclusionLabel}>Mês Atual</Text>
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
    conclusionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: width * 0.05,
        marginBottom: height * 0.03,
    },
    conclusionCard: {
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
    conclusionNumber: {
        fontSize: width * 0.07,
        fontWeight: 'bold',
        color: '#333',
    },
    conclusionLabel: {
        fontSize: width * 0.035,
        color: '#666',
        textAlign: 'center',
    },
})

export default ObjectiveConclusionSection