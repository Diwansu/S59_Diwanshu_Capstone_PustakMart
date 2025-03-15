import { useDispatch } from 'react-redux';
import {
  Paper,
  Box,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { removeFromCart } from '../../features/cart/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3} sm={2}>
          <img
            src={item.book.url}
            alt={item.book.title}
            style={{
              width: '100%',
              maxHeight: '100px',
              objectFit: 'contain',
            }}
          />
        </Grid>
        <Grid item xs={6} sm={8}>
          <Typography variant="h6">{item.book.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            By {item.book.author}
          </Typography>
          <Typography variant="h6" color="primary">
            ₹{item.book.price}
          </Typography>
        </Grid>
        <Grid item xs={3} sm={2}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              color="error"
              onClick={() => dispatch(removeFromCart(item.book._id))}
            >
              <Delete />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CartItem;
