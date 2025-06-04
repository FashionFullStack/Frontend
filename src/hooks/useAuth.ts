import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import { setCredentials, logout } from '../store/slices/authSlice';
import type { User } from '../types';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const login = (userData: { user: User; token: string }) => {
    dispatch(setCredentials(userData));
    Cookies.set('token', userData.token, { expires: 7 });
    Cookies.set('user', JSON.stringify(userData.user), { expires: 7 });
  };

  const logoutUser = () => {
    dispatch(logout());
    Cookies.remove('token');
    Cookies.remove('user');
  };

  const isAuthenticated = !!auth.token;

  return {
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
    error: auth.error,
    login,
    logout: logoutUser,
    isAuthenticated,
  };
};

export default useAuth; 