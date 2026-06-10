import { useMutation } from '@tanstack/react-query';
import { authService } from '../services/auth.service';

export const useVerifyOtp = () =>
  useMutation({ mutationFn: authService.verifyOtp });
