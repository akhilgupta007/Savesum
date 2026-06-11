import { useQuery } from '@tanstack/react-query';
import { fetchStores } from '../services/stores.service';

export const useStores = () => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: fetchStores,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
