import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';

const BookDetails = () => {
  const { id } = useParams(); // Assuming the book ID is passed in the URL

  // Placeholder data; replace with actual data fetching logic
  const book = {
    title: 'Sample Book Title',
    author: 'Author Name',
    description: 'This is a sample description of the book.',
    price: 19.99,
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4">{book.title}</Typography>
        <Typography variant="h6">by {book.author}</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {book.description}
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          Price: ${book.price.toFixed(2)}
        </Typography>
        <Button variant="contained" sx={{ mt: 3 }}>
          Add to Cart
        </Button>
      </Box>
    </Container>
  );
};

export default BookDetails;
