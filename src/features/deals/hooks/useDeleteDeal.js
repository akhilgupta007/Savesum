import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDeal } from '../services/deals.service';
import toast from 'react-hot-toast';

export const useDeleteDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteDeal(id),
    onSuccess: () => {
      // Invalidate the deals query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      toast.success('Deal deleted successfully');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to delete deal';
      toast.error(errorMessage);
    }
  });
};
