import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookService from '../../services/bookService';

export const fetchAllBooks = createAsyncThunk(
  'books/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookService.getAllBooks();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchRecentBooks = createAsyncThunk(
  'books/fetchRecent',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookService.getRecentBooks();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const addBook = createAsyncThunk(
  'books/add',
  async (bookData, { rejectWithValue }) => {
    try {
      const response = await bookService.addBook(bookData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateBook = createAsyncThunk(
  'books/update',
  async ({ id, bookData }, { rejectWithValue }) => {
    try {
      const response = await bookService.updateBook(id, bookData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  'books/delete',
  async (id, { rejectWithValue }) => {
    try {
      await bookService.deleteBook(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const searchBooks = createAsyncThunk(
  'books/search',
  async ({ searchTerm, language, sortBy }, { rejectWithValue }) => {
    try {
      const response = await bookService.searchBooks(searchTerm, language, sortBy);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    recentBooks: [],
    selectedBook: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
    clearBookError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all books
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // Fetch recent books
      .addCase(fetchRecentBooks.fulfilled, (state, action) => {
        state.recentBooks = action.payload;
      })
      // Add book
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.unshift(action.payload);
      })
      // Update book
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(book => book._id === action.payload._id);
        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })
      // Delete book
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book._id !== action.payload);
      })
      // Search books
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { setSelectedBook, clearBookError } = bookSlice.actions;
export default bookSlice.reducer;
