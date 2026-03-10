import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getAuthHeader = (getState) => {
  const { userInfo } = getState().auth;
  return { Authorization: `Bearer ${userInfo.access}` };
};

export const fetchConversations = createAsyncThunk(
  'conversation/fetchConversations',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/conversations/`, {
        headers: getAuthHeader(thunkAPI.getState),
      });
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch({ type: 'auth/logout' });
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || error.message || 'Failed to fetch conversations'
      );
    }
  }
);

export const fetchConversation = createAsyncThunk(
  'conversation/fetchConversation',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`${API_URL}/conversations/${id}/`, {
        headers: getAuthHeader(thunkAPI.getState),
      });
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch({ type: 'auth/logout' });
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || error.message || 'Failed to fetch conversation'
      );
    }
  }
);

export const sendMessage = createAsyncThunk(
  'conversation/sendMessage',
  async ({ conversationId, message }, thunkAPI) => {
    try {
      const payload = { message };
      if (conversationId) payload.conversation_id = conversationId;
      const { data } = await axios.post(`${API_URL}/conversation/`, payload, {
        headers: getAuthHeader(thunkAPI.getState),
      });
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        thunkAPI.dispatch({ type: 'auth/logout' });
      }
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || error.message || 'Failed to send message'
      );
    }
  }
);

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    conversations: [],
    activeConversation: null,
    loading: false,
    error: null,
  },
  reducers: {
    createNewConversation: (state) => {
      state.activeConversation = null;
      state.error = null;
    },
    clearConversationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.activeConversation = action.payload;
      })
      .addCase(fetchConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.activeConversation = action.payload;
        const existingConversation = state.conversations.find((c) => c._id === action.payload._id);
        if (!existingConversation) {
          state.conversations = [action.payload, ...state.conversations];
        } else {
          state.conversations = state.conversations.map((c) =>
            c._id === action.payload._id ? action.payload : c
          );
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { createNewConversation, clearConversationError } = conversationSlice.actions;
export default conversationSlice.reducer;
