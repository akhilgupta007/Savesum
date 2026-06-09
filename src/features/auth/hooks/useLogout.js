import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authService } from '../services/auth.service';
import { clearCredentials } from '../store/authSlice';
import { ROUTES } from '@/constants/routes.constants';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      const refreshToken = localStorage.getItem('refreshToken');
      return authService.logout({ refreshToken });
    },
    onSettled: () => {
      // Regardless of success or failure of the API call, we log the user out locally
      dispatch(clearCredentials());
      localStorage.removeItem('refreshToken');
      toast.success('Logged out successfully');
      navigate(ROUTES.LOGIN, { replace: true });
    },
  });
};
