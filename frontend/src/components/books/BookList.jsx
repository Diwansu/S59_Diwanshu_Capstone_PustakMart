import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Container, Typography } from '@mui/material';
import { fetchAllBooks } from '../../features/books/bookSlice';
import BookCard from './BookCard';
import LoadingSpinner from '../common/LoadingSpinner';
import BookSearch from './BookSearch';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <BookSearch />
      <Grid container spacing={3} mt={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BookList;
