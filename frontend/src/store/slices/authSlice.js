import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const login = createAsyncThunk('auth/login', async ({ username, password }, thunkAPI) => {
  try {
    const { data } = await axios.post(`${API_URL}/auth/signin/`, { username, password });
    const userInfo = { ...data, username };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return userInfo;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.detail || error.response?.data?.message || error.message || 'Login failed'
    );
  }
});

export const register = createAsyncThunk('auth/register', async ({ username, password }, thunkAPI) => {
  try {
    await axios.post(`${API_URL}/auth/signup/`, { username, password });
    const { data } = await axios.post(`${API_URL}/auth/signin/`, { username, password });
    const userInfo = { ...data, username };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return userInfo;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.detail || error.response?.data?.message || error.message || 'Registration failed'
    );
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: userInfoFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('userInfo');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
