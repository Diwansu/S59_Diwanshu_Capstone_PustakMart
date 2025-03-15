import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import bookReducer from '../features/books/bookSlice';
import cartReducer from '../features/cart/cartSlice';
import favoriteReducer from '../features/favorites/favoriteSlice';
import orderReducer from '../features/orders/orderSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    cart: cartReducer,
    favorites: favoriteReducer,
    orders: orderReducer,
    ui: uiReducer,
  },
});
