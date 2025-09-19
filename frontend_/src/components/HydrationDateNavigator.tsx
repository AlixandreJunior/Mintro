import DateNavigator from '@/components/DateNavigator';

interface HydrationDateNavigatorProps {
  selectedDate: Date;
  selectedPeriod: 'day' | 'week' | 'month' | 'year';
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const HydrationDateNavigator: React.FC<HydrationDateNavigatorProps> = ({
  selectedDate,
  selectedPeriod,
  setSelectedDate,
}) => {
  return (
    <DateNavigator
      currentDate={selectedDate}
      mode={selectedPeriod}
      onDateChange={setSelectedDate}
    />
  );
};

export default HydrationDateNavigator;
