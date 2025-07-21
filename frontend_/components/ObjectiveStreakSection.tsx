import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FireIcon } from "./Icons/FireIcon";

const { width, height } = Dimensions.get("window");

interface ObjectiveStreakSectionProps {}

const ObjectiveStreakSection: React.FC<ObjectiveStreakSectionProps> = () => {
  const streakData = {
    current: 1,
    longest: 2,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Sequência</Text>

        <View style={styles.innerContainer}>
          <View style={styles.streakBox}>
            <View style={styles.iconAndNumber}>
              <Text style={styles.streakNumber}>{streakData.current}</Text>
              <FireIcon size={width * 0.045} color="#DFB300" />
            </View>
            <Text style={styles.streakLabel}>Sequência Atual</Text>
          </View>

          <View style={styles.streakBox}>
            <View style={styles.iconAndNumber}>
              <Text style={styles.streakNumber}>{streakData.longest}</Text>
              <FireIcon size={width * 0.045} color="#008ADF" />
            </View>
            <Text style={styles.streakLabel}>Sequência Mais Longa</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    alignItems: "center",
    marginTop: height * 0.03,
  },
  container: {
    width: width * 0.9,
    height: height * 0.2,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderColor: "#F3F4F6",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    padding: width * 0.05,
    justifyContent: "space-between",
  },
  title: {
    fontSize: width * 0.045,
    fontFamily: "Poppins_500Medium",
    color: "#000",
    lineHeight: width * 0.06,
    marginBottom: height * 0.015, 
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  streakBox: {
    width: width * 0.4,
    height: height * 0.095,
    backgroundColor: "#FFFFFF",
    borderColor: "#F3F4F6",
    borderWidth: 1,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.015,
  },
  iconAndNumber: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.015,
    marginBottom: height * 0.005,
  },
  streakNumber: {
    fontSize: width * 0.05,
    fontFamily: "Poppins_500Medium",
    color: "#000",
  },
  streakLabel: {
    fontSize: width * 0.03,
    fontFamily: "Poppins_300Light",
    color: "#000",
    lineHeight: width * 0.045,
    textAlign: "center",
  },
});

export default ObjectiveStreakSection;
