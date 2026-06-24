import { useQuery } from '@tanstack/react-query';
import { fetchDeals } from '../services/deals.service';

export const useDeals = (params, queryOptions = {}) => {
  return useQuery({
    queryKey: ['deals', params],
    queryFn: () => fetchDeals(params),
    keepPreviousData: true,
    ...queryOptions
  });
};
