import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import { Delete, ShoppingCart } from '@mui/icons-material';
import { removeFromFavorites } from '../../features/favorites/favoriteSlice';
import { addToCart } from '../../features/cart/cartSlice';

const FavoriteItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image={item.book.url}
        alt={item.book.title}
        sx={{ objectFit: 'contain', p: 1 }}
        onClick={() => navigate(`/books/${item.book._id}`)}
        style={{ cursor: 'pointer' }}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {item.book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          By {item.book.author}
        </Typography>
        <Typography variant="h6" color="primary">
          ₹{item.book.price}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          color="primary"
          onClick={() => dispatch(addToCart(item.book._id))}
        >
          <ShoppingCart />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => dispatch(removeFromFavorites(item.book._id))}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default FavoriteItem;
