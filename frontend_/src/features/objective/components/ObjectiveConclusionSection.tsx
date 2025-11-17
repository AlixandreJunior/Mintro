import ObjectiveInfoCardSection from './ObjectiveInfoCardSection';

interface ObjectiveConclusionSectionProps {
  total?: number;
  thisMonth?: number;
}

const ObjectiveConclusionSection: React.FC<ObjectiveConclusionSectionProps> = ({
  total = 0,
  thisMonth = 0,
}) => {
  return (
    <ObjectiveInfoCardSection
      title="Conclusões"
      items={[
        {
          value: `${thisMonth}x`,
          label: 'este Mês',
        },
        {
          value: `${total}x`,
          label: 'Total de Conclusões',
        },
      ]}
    />
  );
};

export default ObjectiveConclusionSection;
