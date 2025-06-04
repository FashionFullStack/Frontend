import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  isCartOpen: boolean;
  isSearchOpen: boolean;
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  };
}

const initialState: UIState = {
  isDarkMode: false,
  isSidebarOpen: false,
  isCartOpen: false,
  isSearchOpen: false,
  toast: {
    show: false,
    message: '',
    type: 'info',
  },
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'success' | 'error' | 'info';
      }>
    ) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },
  },
});

export const {
  toggleDarkMode,
  toggleSidebar,
  toggleCart,
  toggleSearch,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer; 