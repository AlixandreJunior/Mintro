import PeriodSelector from '@/share/components/PeriodSelector';

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
    { key: 'day' as const, label: 'Dia' },
    { key: 'week' as const, label: 'Semana' },
    { key: 'month' as const, label: 'Mês' },
    { key: 'year' as const, label: 'Ano' },
  ];

  const handlePeriodChange = (period: typeof selectedPeriod) => {
    setSelectedPeriod(period);
  };

  return (
    <PeriodSelector
      periods={periods}
      selectedPeriod={selectedPeriod}
      onPeriodChange={handlePeriodChange}
    />
  );
};

export default HydrationPeriodSelector;
