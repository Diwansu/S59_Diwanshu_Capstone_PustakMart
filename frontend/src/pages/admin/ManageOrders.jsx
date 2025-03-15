import React, { useEffect } from 'react';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus, cancelOrder } from '../../features/orders/orderSlice'; // Adjust the import based on your order slice

const ManageOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleUpdateStatus = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Manage Orders
      </Typography>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography variant="body2">Total: ${order.total}</Typography>
                <Typography variant="body2">Status: {order.status}</Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleUpdateStatus(order._id, "Out for delivery")}
                  sx={{ mt: 1 }}
                >
                  Mark as Out for Delivery
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleCancelOrder(order._id)}
                  sx={{ mt: 1, ml: 1 }}
                >
                  Cancel Order
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ManageOrders;
