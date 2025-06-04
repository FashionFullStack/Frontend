import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/store';

interface Measurements {
  height: number;
  weight: number;
  chest: number;
  waist: number;
  hips: number;
  inseam: number;
}

interface AvatarCustomization {
  skinTone: string;
  hairStyle: string;
  bodyType: string;
  height: number;
}

export interface ProfileState {
  measurements: Measurements | null;
  avatarUrl: string | null;
  avatarCustomization: AvatarCustomization | null;
  isLoading: boolean;
  error: string | null;
  isProfileComplete: boolean;
}

const initialState: ProfileState = {
  measurements: null,
  avatarUrl: null,
  avatarCustomization: null,
  isLoading: false,
  error: null,
  isProfileComplete: false,
};

export const updateMeasurements = createAsyncThunk(
  'profile/updateMeasurements',
  async (measurements: Measurements, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/profile/measurements', measurements);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to update measurements');
      }
      return rejectWithValue('Failed to update measurements');
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  'profile/uploadAvatar',
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await axios.post('/api/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.avatarUrl;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to upload avatar');
      }
      return rejectWithValue('Failed to upload avatar');
    }
  }
);

export const saveAvatarCustomization = createAsyncThunk(
  'profile/saveAvatarCustomization',
  async (customization: AvatarCustomization, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/profile/avatar/customization', customization);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to save avatar customization');
      }
      return rejectWithValue('Failed to save avatar customization');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfileState: (state) => {
      state.measurements = null;
      state.avatarUrl = null;
      state.avatarCustomization = null;
      state.isLoading = false;
      state.error = null;
      state.isProfileComplete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Update measurements
      .addCase(updateMeasurements.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMeasurements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.measurements = action.payload;
        state.isProfileComplete = true;
      })
      .addCase(updateMeasurements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Upload avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatarUrl = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Save avatar customization
      .addCase(saveAvatarCustomization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveAvatarCustomization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.avatarCustomization = action.payload;
      })
      .addCase(saveAvatarCustomization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProfileState } = profileSlice.actions;

export const selectMeasurements = (state: RootState) => state.profile.measurements;
export const selectAvatarUrl = (state: RootState) => state.profile.avatarUrl;
export const selectAvatarCustomization = (state: RootState) => state.profile.avatarCustomization;
export const selectIsProfileLoading = (state: RootState) => state.profile.isLoading;
export const selectProfileError = (state: RootState) => state.profile.error;
export const selectIsProfileComplete = (state: RootState) => state.profile.isProfileComplete;

export default profileSlice.reducer; 