import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import profileReducer from '@/features/profile/profileSlice';
import aiReducer from '@/features/ai/aiSlice';

// Create the store with all reducers
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    auth: authReducer,
    profile: profileReducer,
    ai: aiReducer,
  },
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` type from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Export the store's dispatch type
export type AppDispatch = typeof store.dispatch; 