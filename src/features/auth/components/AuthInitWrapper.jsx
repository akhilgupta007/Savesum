import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../services/auth.service';
import { setCredentials, clearCredentials, setLoading } from '../store/authSlice';
import UniversalLoader from '@/components/shared/UniversalLoader/UniversalLoader';

const AuthInitWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    const initAuth = async () => {
      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        dispatch(setLoading(false));
        return;
      }

      try {
        // Use authService so the call goes through the configured axios instance
        // (interceptors, base URL, timeout, etc.)
        const response = await authService.refresh({ refreshToken });

        const { accessToken, refreshToken: newRefreshToken, userObject } = response.data.data;

        localStorage.setItem('refreshToken', newRefreshToken);

        dispatch(setCredentials({
          user: userObject || null,
          accessToken,
        }));
      } catch {
        // Refresh token expired or invalid — clear everything and let the user log in again
        localStorage.removeItem('refreshToken');
        dispatch(clearCredentials());
      } finally {
        dispatch(setLoading(false));
      }
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <UniversalLoader fullScreen={true} />;
  }

  return children;
};

export default AuthInitWrapper;
