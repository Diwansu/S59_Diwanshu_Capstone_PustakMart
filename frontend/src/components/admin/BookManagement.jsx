import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  fetchAllBooks,
  addBook,
  updateBook,
  deleteBook,
} from '../../features/books/bookSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const BookManagement = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector(state => state.books);
  const [open, setOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    price: '',
    desc: '',
    language: '',
    url: '',
  });

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  const handleOpen = (book = null) => {
    if (book) {
      setEditBook(book);
      setBookData(book);
    } else {
      setEditBook(null);
      setBookData({
        title: '',
        author: '',
        price: '',
        desc: '',
        language: '',
        url: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditBook(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editBook) {
      await dispatch(updateBook({ id: editBook._id, bookData }));
    } else {
      await dispatch(addBook(bookData));
    }
    handleClose();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Manage Books</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Add New Book
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>₹{book.price}</TableCell>
                <TableCell>{book.language}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => handleOpen(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => dispatch(deleteBook(book._id))}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editBook ? 'Edit Book' : 'Add New Book'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              value={bookData.title}
              onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Author"
              value={bookData.author}
              onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Price"
              type="number"
              value={bookData.price}
              onChange={(e) => setBookData({ ...bookData, price: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={bookData.desc}
              onChange={(e) => setBookData({ ...bookData, desc: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Language"
              value={bookData.language}
              onChange={(e) => setBookData({ ...bookData, language: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Image URL"
              value={bookData.url}
              onChange={(e) => setBookData({ ...bookData, url: e.target.value })}
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            {editBook ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookManagement;
