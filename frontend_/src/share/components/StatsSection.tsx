import { User } from '@/share/types/user/user';
import { StatsHeader } from './StatsHeader';
import { StatsError } from './StatsError';
import { StatsLoading } from './StatsLoading';
import { StatsCardSection } from './StatsCardSection';

interface StatsSectionProps {
  fetchedUser: User | null;
  loadingUser: boolean;
  errorUser: string | null;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  fetchedUser,
  loadingUser,
  errorUser,
}) => {
  return (
    <>
      <StatsHeader />
      <StatsLoading loadingUser={loadingUser} />
      <StatsError errorUser={errorUser} />
      <StatsCardSection fetchedUser={fetchedUser} />
    </>
  );
};
