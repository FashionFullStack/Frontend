import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '@/store';

interface StyleSuggestion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  products: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  }[];
}

export interface AIState {
  suggestions: StyleSuggestion[];
  currentChat: {
    role: 'user' | 'assistant';
    content: string;
  }[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AIState = {
  suggestions: [],
  currentChat: [],
  isLoading: false,
  error: null,
};

export const generateStyleSuggestions = createAsyncThunk(
  'ai/generateStyleSuggestions',
  async (preferences: { occasion: string; style: string; budget: number }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/ai/style-suggestions', preferences);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to generate suggestions');
      }
      return rejectWithValue('Failed to generate suggestions');
    }
  }
);

export const chatWithAI = createAsyncThunk(
  'ai/chat',
  async (message: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const currentChat = state.ai.currentChat;

      const response = await axios.post('/api/ai/chat', {
        messages: [...currentChat, { role: 'user', content: message }],
      });

      return {
        userMessage: message,
        aiResponse: response.data.message,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to get AI response');
      }
      return rejectWithValue('Failed to get AI response');
    }
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearChat: (state) => {
      state.currentChat = [];
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateStyleSuggestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateStyleSuggestions.fulfilled, (state, action: PayloadAction<StyleSuggestion[]>) => {
        state.isLoading = false;
        state.suggestions = action.payload;
      })
      .addCase(generateStyleSuggestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(chatWithAI.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(chatWithAI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentChat.push(
          { role: 'user', content: action.payload.userMessage },
          { role: 'assistant', content: action.payload.aiResponse }
        );
      })
      .addCase(chatWithAI.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearChat, clearSuggestions } = aiSlice.actions;

export const selectSuggestions = (state: RootState) => state.ai.suggestions;
export const selectCurrentChat = (state: RootState) => state.ai.currentChat;
export const selectIsAILoading = (state: RootState) => state.ai.isLoading;
export const selectAIError = (state: RootState) => state.ai.error;

export default aiSlice.reducer; 