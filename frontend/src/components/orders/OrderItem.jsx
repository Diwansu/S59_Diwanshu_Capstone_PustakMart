import {
  Paper,
  Typography,
  Grid,
  Chip,
  Box,
} from '@mui/material';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

const ORDER_STATUS = {
  ORDER_PLACED: 'Order Placed',
  OUT_FOR_DELIVERY: 'Out for delivery',
  DELIVERED: 'Delivered',
  CANCELED: 'Canceled'
};

const getStatusColor = (status) => {
  switch (status) {
    case ORDER_STATUS.ORDER_PLACED:
      return 'primary';
    case ORDER_STATUS.OUT_FOR_DELIVERY:
      return 'warning';
    case ORDER_STATUS.DELIVERED:
      return 'success';
    case ORDER_STATUS.CANCELED:
      return 'error';
    default:
      return 'default';
  }
};

const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), 'PPP');
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};

const OrderItem = ({ order }) => {
  if (!order || !order.book) {
    return (
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography color="error">Invalid order data</Typography>
      </Paper>
    );
  }

  return (
    <Paper 
      sx={{ 
        p: 2, 
        mb: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3
        }
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Box
            component="img"
            src={order.book.url}
            alt={order.book.title}
            sx={{
              width: '100%',
              maxHeight: '150px',
              objectFit: 'contain',
              borderRadius: 1
            }}
            onError={(e) => {
              e.target.src = '/placeholder-book.png'; // Add a placeholder image
              e.target.onerror = null;
            }}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 500,
                  mb: 1
                }}
              >
                {order.book.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Order ID: {order._id}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                Ordered on: {formatDate(order.createdAt)}
              </Typography>
              <Typography 
                variant="h6" 
                color="primary" 
                sx={{ 
                  fontWeight: 600,
                  mt: 1 
                }}
              >
                ₹{order.book.price.toLocaleString('en-IN')}
              </Typography>
            </Box>
            <Chip
              label={order.status}
              color={getStatusColor(order.status)}
              variant="outlined"
              sx={{ 
                fontWeight: 500,
                '& .MuiChip-label': {
                  px: 2
                }
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

OrderItem.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(ORDER_STATUS)).isRequired,
    createdAt: PropTypes.string.isRequired,
    book: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default OrderItem;
