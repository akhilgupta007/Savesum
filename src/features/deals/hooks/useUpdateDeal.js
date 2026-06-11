import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDeal } from '../services/deals.service';
import toast from 'react-hot-toast';

export const useUpdateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => updateDeal(id, formData),
    onSuccess: () => {
      // Invalidate the deals query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      toast.success('Deal updated successfully');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to update deal';
      toast.error(errorMessage);
    }
  });
};
