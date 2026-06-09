import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';

export const useResetPassword = () =>
  useMutation({ mutationFn: authService.resetPassword });
