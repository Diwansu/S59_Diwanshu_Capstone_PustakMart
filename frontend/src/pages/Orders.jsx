import React, { useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../features/orders/orderSlice'; // Adjust the import based on your order slice

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography variant="body2">Total: ${order.total}</Typography>
                <Typography variant="body2">Status: {order.status}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders;
