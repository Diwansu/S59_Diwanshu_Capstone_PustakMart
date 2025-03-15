import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
} from '@mui/material';
import { fetchBookById } from '../../features/books/bookSlice';
import { addToCart } from '../../features/cart/cartSlice';
import LoadingSpinner from '../common/LoadingSpinner';

const BookDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedBook: book, loading, error } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!book) return null;

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <img
              src={book.url}
              alt={book.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              {book.title}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              By {book.author}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ₹{book.price}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" paragraph>
              {book.desc}
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Language: {book.language}
              </Typography>
            </Box>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(addToCart(book._id))}
                sx={{ mr: 2 }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookDetails;
