import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from '../../services/cartService';

export const fetchCart = createAsyncThunk(
  'cart/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getUserCart();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/add',
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(bookId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (bookId, { rejectWithValue }) => {
    try {
      await cartService.removeFromCart(bookId);
      return bookId;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Add to cart
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
      });
  },
});

export const { clearCartError } = cartSlice.actions;
export default cartSlice.reducer;
