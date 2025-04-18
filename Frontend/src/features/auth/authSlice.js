import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
 import { jwtDecode } from 'jwt-decode'; // Corrected import for jwt-decode
 import { login, signup } from './authAPI';

 const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,
 };

 export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
  try {
   const res = await login(data);
   // Decode the JWT token to extract user ID
   const decodedToken = jwtDecode(res.data.token); // Use jwtDecode (capital 'D')
   const user = { ...res.data, _id: decodedToken.id }; // Assuming the id is stored in decodedToken
   return user;
  } catch (err) {
   return thunkAPI.rejectWithValue(err.response.data.message);
  }
 });

 export const signupUser = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
  try {
   const res = await signup(data);
   // Decode the JWT token to extract user ID for the new user
   const decodedToken = jwtDecode(res.data.token); // Use jwtDecode (capital 'D')
   const user = { ...res.data, _id: decodedToken.id }; // Assuming the id is stored in decodedToken
   return user;
  } catch (err) {
   return thunkAPI.rejectWithValue(err.response.data.message);
  }
 });

 const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   logout(state) {
    state.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
   }
  },
  extraReducers: (builder) => {
   builder
    .addCase(loginUser.pending, state => { state.loading = true })
    .addCase(loginUser.fulfilled, (state, { payload }) => {
     state.loading = false;
     state.user = payload;
     localStorage.setItem('user', JSON.stringify(payload));
     localStorage.setItem('token', payload.token);
    })
    .addCase(loginUser.rejected, (state, { payload }) => {
     state.loading = false;
     state.error = payload;
    })
    .addCase(signupUser.fulfilled, (state, { payload }) => {
     state.user = payload;
     localStorage.setItem('user', JSON.stringify(payload));
     localStorage.setItem('token', payload.token);
    });
  }
 });

 export const { logout } = authSlice.actions;
 export default authSlice.reducer;