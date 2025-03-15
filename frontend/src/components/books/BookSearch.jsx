import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { searchBooks } from '../../features/books/bookSlice';

const BookSearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [language, setLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchBooks({ searchTerm, language, sortBy }));
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <InputBase
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <IconButton type="submit">
          <Search />
        </IconButton>
      </Box>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          label="Language"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="english">English</MenuItem>
          <MenuItem value="hindi">Hindi</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          label="Sort By"
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="price_low">Price: Low to High</MenuItem>
          <MenuItem value="price_high">Price: High to Low</MenuItem>
          <MenuItem value="newest">Newest First</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default BookSearch;
