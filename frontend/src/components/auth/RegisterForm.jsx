import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Alert } from '@mui/material';
import Input from '../common/Input';
import Button from '../common/Button';
import { register } from '../../features/auth/authSlice';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(formData));
    if (!result.error) {
      navigate('/login');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} maxWidth="400px" mx="auto">
      <Typography variant="h5" textAlign="center" mb={3}>
        Create an Account
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
        name="email"
        label="Email"
        type="email"
        value={formData.email}
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

      <Input
        required
        name="address"
        label="Address"
        multiline
        rows={3}
        value={formData.address}
        onChange={handleChange}
      />

      <Button
        type="submit"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Creating Account...' : 'Register'}
      </Button>
    </Box>
  );
};

export default RegisterForm;
