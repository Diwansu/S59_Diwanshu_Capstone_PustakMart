import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import Input from '../common/Input';
import Button from '../common/Button';
import { login } from '../../features/auth/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(formData));
    if (!result.error) {
      navigate('/');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} maxWidth="400px" mx="auto">
      <Typography variant="h5" textAlign="center" mb={3}>
        Login to PustakMart
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Input
        required
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
      />

      <Input
        required
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />

      <Button
        type="submit"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;
