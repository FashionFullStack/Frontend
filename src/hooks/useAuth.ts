import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import type { RootState } from '../store';
import { setCredentials, logout } from '../store/slices/authSlice';
import type { User } from '../store/slices/authSlice';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  // Debug: Log the entire state to see what's available
  const entireState = useSelector((state: RootState) => state);
  console.log('Entire Redux State:', entireState);
  
  // Safe access to auth state with fallback
  const auth = useSelector((state: RootState) => {
    console.log('Accessing state.auth:', state?.auth);
    return state?.auth || {
      user: null,
      token: null,
      loading: false,
      error: null,
    };
  });

  // Initialize auth state from cookies on app load
  useEffect(() => {
    const token = Cookies.get('token');
    const userCookie = Cookies.get('user');
    
    console.log('Initializing auth from cookies:', { token: !!token, user: !!userCookie });
    
    if (token && userCookie) {
      try {
        const user = JSON.parse(userCookie);
        dispatch(setCredentials({ user, token }));
      } catch (error) {
        console.error('Failed to parse user from cookies:', error);
        Cookies.remove('token');
        Cookies.remove('user');
      }
    }
  }, [dispatch]);

  const login = (userData: { user: User; token: string }) => {
    console.log('Logging in user:', userData.user.email);
    dispatch(setCredentials(userData));
    Cookies.set('token', userData.token, { expires: 7 });
    Cookies.set('user', JSON.stringify(userData.user), { expires: 7 });
  };

  const logoutUser = () => {
    console.log('Logging out user');
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
