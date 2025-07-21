import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";

const { width, height } = Dimensions.get('window');

interface ObjectiveConclusionSectionProps {}

const ObjectiveConclusionSection: React.FC<ObjectiveConclusionSectionProps> = () => {
    const conclusionData = {
        total: 1,
        thisMonth: 1,
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.card}>
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
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        alignItems: 'center',
        marginVertical: height * 0.01,
    },
    card: {
        width: width * 0.9,
        height: height * 0.2,
        backgroundColor: '#FFFFFF',
        borderColor: '#F3F4F6',
        borderWidth: 1,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        paddingHorizontal: 21,
        paddingVertical: 13,
    },
    sectionTitle: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 18,
        lineHeight: 20,
        color: '#000000',
        marginBottom: height * 0.015, 
    },
    conclusionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    conclusionCard: {
        width: width * 0.4,
        height: height * 0.1,
        backgroundColor: '#FFFFFF',
        borderColor: '#F3F4F6',
        borderWidth: 1,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    conclusionNumber: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 20,
        lineHeight: 20,
        color: '#000000',
        marginBottom: 7, // espaço entre número e label
    },
    conclusionLabel: {
        fontFamily: 'Poppins_300Light',
        fontSize: 10,
        lineHeight: 20,
        color: '#000000',
        textAlign: 'center',
    },
});

export default ObjectiveConclusionSection;
