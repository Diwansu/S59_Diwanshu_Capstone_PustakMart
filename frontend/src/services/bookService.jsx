import api from './api';

const bookService = {
  getAllBooks: async () => {
    const response = await api.get('/books/get-all-books');
    return response.data;
  },

  getRecentBooks: async () => {
    const response = await api.get('/books/get-recent-books');
    return response.data;
  },

  getBookById: async (id) => {
    const response = await api.get(`/books/get-book-by-id/${id}`);
    return response.data;
  },

  addBook: async (bookData) => {
    const response = await api.post('/books/add-book', bookData);
    return response.data;
  },

  updateBook: async (id, bookData) => {
    const response = await api.put(`/books/update-book/${id}`, bookData);
    return response.data;
  },

  deleteBook: async (id) => {
    const response = await api.delete(`/books/delete-book/${id}`);
    return response.data;
  },

  searchBooks: async (searchTerm, language, sortBy) => {
    const response = await api.get('/books/get-all-books', {
      params: { searchTerm, language, sortBy }
    });
    return response.data;
  }
};

export default bookService;
