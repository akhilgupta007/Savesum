import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../services/analytics.service';

export const useAnalyticsStats = () => {
  return useQuery({
    queryKey: ['analyticsStats'],
    queryFn: fetchStats,
  });
};
