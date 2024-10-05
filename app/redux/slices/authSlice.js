import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  user: null,
  token: null, // Set default token to null
  userReferalBy: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // Other reducers...
  },
});

// Export actions
export const { setLoading, setUser, setToken } = authSlice.actions;

// Selector to access token
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
