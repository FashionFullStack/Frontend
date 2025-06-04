import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '@/features/profile/profileSlice';
import aiReducer from '@/features/ai/aiSlice';
import uiReducer from '@/features/ui/uiSlice';
import cartReducer from '@/features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    ai: aiReducer,
    ui: uiReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 