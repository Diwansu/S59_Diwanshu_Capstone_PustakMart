import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@mui/material';
import { fetchUserOrders } from '../../features/orders/orderSlice';
import OrderItem from './OrderItem';
import LoadingSpinner from '../common/LoadingSpinner';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>No orders yet</Typography>
      ) : (
        orders.map(order => (
          <OrderItem key={order._id} order={order} />
        ))
      )}
    </Container>
  );
};

export default OrderList;
