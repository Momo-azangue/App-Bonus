import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setSuccess('Password reset link sent to your email.');
      setError('');
    } catch (error) {
      setError('Failed to send password reset link');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" gutterBottom>Forgot Password</Typography>
        <form onSubmit={handleForgotPassword}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <Button type="submit" variant="contained"  fullWidth sx={{ mt: 2, bgcolor: 'black', '&:hover':{ bgcolor: '#333533'} }}>Send Reset Link</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
