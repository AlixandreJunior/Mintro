// src/context/DiaryFormContext.tsx
import React, { createContext, useContext } from 'react';
import { useDiaryForm } from '@/hooks/forms/useDiaryForm';

const DiaryFormContext = createContext<ReturnType<typeof useDiaryForm> | null>(
  null
);

export const DiaryFormProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const diaryForm = useDiaryForm();
  return (
    <DiaryFormContext.Provider value={diaryForm}>
      {children}
    </DiaryFormContext.Provider>
  );
};

export const useDiaryFormContext = () => {
  const ctx = useContext(DiaryFormContext);
  if (!ctx)
    throw new Error(
      'useDiaryFormContext deve ser usado dentro de DiaryFormProvider'
    );
  return ctx;
};
