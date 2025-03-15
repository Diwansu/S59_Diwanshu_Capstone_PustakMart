import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
} from '@mui/material';
import { fetchRecentBooks } from '../features/books/bookSlice';
import BookCard from '../components/books/BookCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const { recentBooks, loading } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchRecentBooks());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            color: 'white',
            mb: 4
          }}
        >
          <Typography variant="h3" gutterBottom>
            Welcome to PustakMart
          </Typography>
          <Typography variant="h6">
            Your One-Stop Destination for Books
          </Typography>
        </Paper>

        <Typography variant="h4" gutterBottom>
          Recent Additions
        </Typography>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Grid container spacing={3}>
            {recentBooks.map((book) => (
              <Grid item xs={12} sm={6} md={3} key={book._id}>
                <BookCard book={book} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Home;
