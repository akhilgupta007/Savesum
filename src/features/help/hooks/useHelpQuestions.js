import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api/axios.instance';

// GET all help questions
export const useHelpQuestions = () => {
  return useQuery({
    queryKey: ['helpQuestions'],
    queryFn: async () => {
      const response = await api.get('/settings/help/all');
      return response.data;
    },
  });
};

// CREATE a help question
export const useCreateHelpQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post('/settings/help/create', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['helpQuestions'] });
    },
  });
};

// UPDATE a help question
export const useUpdateHelpQuestion = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.put('/settings/help/update', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['helpQuestions'] });
    },
  });
};
