import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import {
  Book as BookIcon,
  ShoppingCart as CartIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const StatCard = ({ title, value, icon, color }) => (
  <Paper sx={{ p: 3 }}>
    <Box display="flex" alignItems="center">
      <Box sx={{ color: color, mr: 2 }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const { stats } = useSelector(state => state.admin);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Books"
            value={stats?.totalBooks || 0}
            icon={<BookIcon fontSize="large" />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Orders"
            value={stats?.totalOrders || 0}
            icon={<CartIcon fontSize="large" />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={<PersonIcon fontSize="large" />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Button
            component={RouterLink}
            to="/admin/books"
            variant="contained"
            fullWidth
            size="large"
          >
            Manage Books
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            component={RouterLink}
            to="/admin/orders"
            variant="contained"
            fullWidth
            size="large"
          >
            Manage Orders
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
