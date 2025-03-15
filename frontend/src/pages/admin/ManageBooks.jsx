import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBooks } from '../../features/books/bookSlice'; // Adjust the import based on your book slice

const ManageBooks = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchAllBooks());
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Books
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }}>
        Add New Book
      </Button>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body2">Author: {book.author}</Typography>
            <Typography variant="body2">Price: ${book.price}</Typography>
            <Button variant="outlined" color="secondary" sx={{ mt: 1 }}>
              Edit
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ManageBooks;
