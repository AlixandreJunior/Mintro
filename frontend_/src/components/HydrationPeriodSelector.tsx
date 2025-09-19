import PeriodSelector from '@/components/PeriodSelector';

interface HydrationPeriodSelectorProps {
  selectedPeriod: 'day' | 'week' | 'month' | 'year';
  setSelectedPeriod: React.Dispatch<
    React.SetStateAction<'day' | 'week' | 'month' | 'year'>
  >;
}

const HydrationPeriodSelector: React.FC<HydrationPeriodSelectorProps> = ({
  selectedPeriod,
  setSelectedPeriod,
}) => {
  const periods = [
    { key: 'day', label: 'Dia' },
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mês' },
    { key: 'year', label: 'Ano' },
  ];

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
  };

  return (
    <PeriodSelector
      //@ts-ignore
      periods={periods}
      //@ts-ignore
      selectedPeriod={selectedPeriod}
      onPeriodChange={handlePeriodChange}
    />
  );
};

export default HydrationPeriodSelector;
