// authSlice.js - Redux slice for handling user authentication (login, signup, and logout).
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode'; // Importing jwt-decode to decode JWT tokens
import { login, signup } from './authAPI';

// Initial state for authentication, pulling user info from localStorage if available
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Retrieve user from localStorage or set to null
  loading: false, // Tracks loading state for async operations
  error: null, // Stores error messages from failed requests
};

// Thunk action to handle user login
export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
    const res = await login(data); // Attempt to log the user in
    const decodedToken = jwtDecode(res.data.token); // Decode JWT token to extract user ID
    const user = { ...res.data, _id: decodedToken.id }; // Append user ID from token to response data
    return user; // Return user data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message); // Return error message on failure
  }
});

// Thunk action to handle user signup
export const signupUser = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
  try {
    const res = await signup(data); // Attempt to sign the user up
    const decodedToken = jwtDecode(res.data.token); // Decode JWT token to extract user ID for new user
    const user = { ...res.data, _id: decodedToken.id }; // Append user ID from token to response data
    return user; // Return user data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message); // Return error message on failure
  }
});

// Reducer slice for handling authentication state changes
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log out the user by clearing localStorage and resetting state
    logout(state) {
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle pending state during login request
      .addCase(loginUser.pending, state => { state.loading = true })
      // Handle successful login response
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload; // Store user data in state
        localStorage.setItem('user', JSON.stringify(payload)); // Store user data in localStorage
        localStorage.setItem('token', payload.token); // Store token in localStorage
      })
      // Handle login failure
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload; // Store error message in state
      })
      // Handle successful signup response
      .addCase(signupUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        localStorage.setItem('user', JSON.stringify(payload));
        localStorage.setItem('token', payload.token);
      });
  }
});

// Export logout action for use in components
export const { logout } = authSlice.actions;
export default authSlice.reducer;
