import api from './api';

const favoriteService = {
  getFavorites: async () => {
    const response = await api.get('/favorites/get-favourite-books');
    return response.data;
  },

  addToFavorites: async (bookId) => {
    const response = await api.put(`/favorites/add-book-to-favourite/${bookId}`);
    return response.data;
  },

  removeFromFavorites: async (bookId) => {
    const response = await api.put(`/favorites/remove-book-from-favourite/${bookId}`);
    return response.data;
  }
};

export default favoriteService;
