import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../services/profile.service';
import { useDispatch } from 'react-redux';
import { setCredentials, clearCredentials } from '@/features/auth/store/authSlice';
import { store } from '@/store';
import toast from 'react-hot-toast';

const PROFILE_QUERY_KEY = ['userProfile'];

export const useGetProfile = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: async () => {
      const response = await profileService.getUserDetails();
      return response.data.data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await profileService.updateUserDetails(formData);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      toast.success('Profile updated successfully');
      
      // Keep existing tokens from store but update the user object
      const state = store.getState();
      const accessToken = state.auth?.accessToken;
      
      // Only dispatch if we have updated user info from the server.
      // Usually the API might return the updated user object or we refetch it via invalidation.
      // To be safe, if the API doesn't return user, the invalidation will trigger a refetch,
      // but Redux might be momentarily stale. Assuming the invalidation handles the UI, we could update Redux when query fetches.
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await profileService.changePassword(data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Password updated successfully. Please log in again.');
      store.dispatch(clearCredentials());
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to change password');
    },
  });
};
