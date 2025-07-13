import { View, StyleSheet, ScrollView } from "react-native";
import Header from "@/components/Layout/Header";
import FormHeader from '@/components/Layout/FormHeader';
import { PeriodsSection } from "@/components/PeriodsSection";
import { ActivitiesSection } from "@/components/ActivitySection";
import { useObjectiveForm } from "@/hooks/forms/useObjectiveForm";

const CreateObjectiveScreen = () => {
  const {
    selectedObjectiveId,
    setSelectedObjectiveId,
    selectedPeriod,
    setSelectedPeriod,
    handleSave,
  } = useObjectiveForm();

  return (
    <View style={{flex: 1}}>
      <Header avatarChar="A" />
      <FormHeader title="Criar Objetivo" onSavePress={handleSave} />
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <ActivitiesSection
          title="Escolha uma atividade"
          selected={selectedObjectiveId ? Number(selectedObjectiveId) : null}
          // @ts-ignore
          setSelected={setSelectedObjectiveId}
          multiple={false}
        />
        <PeriodsSection
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      </ScrollView>
    </View>
  );
};

export default CreateObjectiveScreen;