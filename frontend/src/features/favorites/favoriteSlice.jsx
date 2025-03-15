import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import favoriteService from '../../services/favoriteService';

// Async thunks
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await favoriteService.getFavorites();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await favoriteService.addToFavorites(bookId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async (bookId, { rejectWithValue }) => {
    try {
      await favoriteService.removeFromFavorites(bookId);
      return bookId;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    clearFavoriteError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch favorites';
      })
      // Add to favorites
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to add to favorites';
      })
      // Remove from favorites
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.error = action.payload?.message || 'Failed to remove from favorites';
      });
  }
});

export const { clearFavoriteError } = favoriteSlice.actions;
export default favoriteSlice.reducer;
