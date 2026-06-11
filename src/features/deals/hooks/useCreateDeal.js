import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDeal } from '../services/deals.service';
import toast from 'react-hot-toast';

export const useCreateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createDeal(formData),
    onSuccess: () => {
      // Invalidate the deals query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      toast.success('Deal created successfully');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to create deal';
      toast.error(errorMessage);
    }
  });
};
