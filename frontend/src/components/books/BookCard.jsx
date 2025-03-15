import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { 
  FavoriteBorder, 
  Favorite, 
  ShoppingCart,
  RemoveShoppingCart 
} from '@mui/icons-material';
import { addToCart, removeFromCart } from '../../features/cart/cartSlice';
import { 
  addToFavorites, 
  removeFromFavorites 
} from '../../features/favorites/favoriteSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const { items: cartItems } = useSelector(state => state.cart);
  const { items: favoriteItems } = useSelector(state => state.favorites);

  const isInCart = cartItems.some(item => item._id === book._id);
  const isInFavorites = favoriteItems.some(item => item._id === book._id);

  const handleCartToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isInCart) {
      dispatch(removeFromCart(book._id));
    } else {
      dispatch(addToCart(book._id));
    }
  };

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isInFavorites) {
      dispatch(removeFromFavorites(book._id));
    } else {
      dispatch(addToFavorites(book._id));
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={book.url}
        alt={book.title}
        sx={{ objectFit: 'contain', p: 1 }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By {book.author}
        </Typography>
        <Typography variant="h6" color="primary" mt={1}>
          ₹{book.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box>
          <IconButton onClick={handleFavoriteToggle} color="primary">
            {isInFavorites ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
          <IconButton onClick={handleCartToggle} color="primary">
            {isInCart ? <RemoveShoppingCart /> : <ShoppingCart />}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BookCard;
