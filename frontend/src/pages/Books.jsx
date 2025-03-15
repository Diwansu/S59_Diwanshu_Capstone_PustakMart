import { Container } from '@mui/material';
import BookList from '../components/books/BookList';
import BookSearch from '../components/books/BookSearch';

const Books = () => {
  return (
    <Container>
      <BookSearch />
      <BookList />
    </Container>
  );
};

export default Books;
