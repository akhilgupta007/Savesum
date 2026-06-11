import { useQuery } from '@tanstack/react-query';
import { fetchDeals } from '../services/deals.service';

export const useDeals = (params) => {
  return useQuery({
    queryKey: ['deals', params],
    queryFn: () => fetchDeals(params),
    keepPreviousData: true,
  });
};
