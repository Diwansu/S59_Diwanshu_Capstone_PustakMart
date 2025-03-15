import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import { updateUserProfile } from '../features/auth/authSlice';
import OrderList from '../components/orders/OrderList';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    address: user?.address || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({ address: user.address });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={user?.avatar}
                alt={user?.username}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography variant="h5" gutterBottom>
                {user?.username}
              </Typography>
              <Typography color="textSecondary">
                {user?.email}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={4}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                Update Address
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <OrderList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
