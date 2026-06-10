import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../services/settings.service';

export const usePrivacyPolicy = () => {
  return useQuery({
    queryKey: ['privacyPolicy'],
    queryFn: settingsService.getPrivacyPolicy,
  });
};

export const useUpdatePrivacyPolicy = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: settingsService.updatePrivacyPolicy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['privacyPolicy'] });
    },
  });
};

export const useTerms = () => {
  return useQuery({
    queryKey: ['terms'],
    queryFn: settingsService.getTerms,
  });
};

export const useUpdateTerms = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: settingsService.updateTerms,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['terms'] });
    },
  });
};
