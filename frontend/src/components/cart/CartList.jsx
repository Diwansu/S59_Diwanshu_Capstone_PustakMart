import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Paper,
  Box,
  Button,
} from '@mui/material';
import { fetchCart } from '../../features/cart/cartSlice';
import CartItem from './CartItem';
import LoadingSpinner from '../common/LoadingSpinner';

const CartList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.book.price, 0);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {items.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Your cart is empty</Typography>
        </Paper>
      ) : (
        <>
          {items.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">
                Total: ₹{calculateTotal()}
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default CartList;
