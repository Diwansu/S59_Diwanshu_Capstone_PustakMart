import api from './api';

const orderService = {
  getAllOrders: async () => {
    const response = await api.get('/orders/all-orders');
    return response.data;
  },

  getUserOrders: async () => {
    const response = await api.get('/orders/my-orders');
    return response.data;
  },

  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/order/${orderId}`);
    return response.data;
  },

  placeOrder: async (bookId) => {
    const response = await api.post('/orders/place-order', { bookId });
    return response.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await api.put(`/orders/update-status/${orderId}`, { status });
    return response.data;
  },

  cancelOrder: async (orderId) => {
    const response = await api.put(`/orders/cancel-order/${orderId}`);
    return response.data;
  }
};

export default orderService;
