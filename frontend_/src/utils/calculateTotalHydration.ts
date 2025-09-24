import { VOLUMES } from '@/hooks/useHydratationLog';

export const calculateTotalHydration = (
  quantities: Record<number, number>,
  customAmount: string
) => {
  const totalFromQuantities = VOLUMES.reduce(
    (sum, vol) => sum + (quantities[vol] || 0) * vol,
    0
  );
  const custom = parseFloat(customAmount) || 0;
  return totalFromQuantities + custom;
};
