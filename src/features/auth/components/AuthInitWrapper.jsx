import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { API_URL } from '@/constants/app.constants';
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
        const response = await axios.post(`${API_URL}/auth/refresh`, {
          refreshToken,
        });
        
        const { accessToken, refreshToken: newRefreshToken, userObject } = response.data.data;
        
        localStorage.setItem('refreshToken', newRefreshToken);
        
        dispatch(setCredentials({
          user: userObject || null,
          accessToken,
        }));
      } catch (error) {
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
