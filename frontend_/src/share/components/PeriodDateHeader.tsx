import React from 'react';
import DateNavigator from '@/share/components/DateNavigator';
import PeriodSelector from '@/share/components/PeriodSelector';

interface PeriodDateHeaderProps<T> {
  periods: { key: T; label: string }[];
  selectedPeriod: T;
  selectedDate: Date;
  setSelectedPeriod: React.Dispatch<React.SetStateAction<T>>;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const PeriodDateHeader = <T extends string>({
  periods,
  selectedPeriod,
  selectedDate,
  setSelectedPeriod,
  setSelectedDate,
}: PeriodDateHeaderProps<T>) => {
  return (
    <>
      <PeriodSelector
        periods={periods}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      <DateNavigator
        currentDate={selectedDate}
        mode={selectedPeriod as any} // caso DateNavigator aceite apenas strings
        onDateChange={setSelectedDate}
      />
    </>
  );
};

export default PeriodDateHeader;
