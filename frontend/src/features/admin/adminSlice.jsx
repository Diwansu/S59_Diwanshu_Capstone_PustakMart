import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';




const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch dashboard statistics';
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
