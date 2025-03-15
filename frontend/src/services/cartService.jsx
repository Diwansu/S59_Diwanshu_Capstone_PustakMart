import api from './api';

const cartService = {
  getUserCart: async () => {
    const response = await api.get('/carts/get-user-cart');
    return response.data;
  },

  addToCart: async (bookId) => {
    const response = await api.put('/carts/add-to-cart', { bookId });
    return response.data;
  },

  removeFromCart: async (bookId) => {
    const response = await api.put(`/carts/remove-from-cart/${bookId}`);
    return response.data;
  }
};

export default cartService;
