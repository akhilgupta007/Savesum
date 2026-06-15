import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../services/dashboard.service';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });
};
