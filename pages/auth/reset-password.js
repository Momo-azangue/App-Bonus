import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/reset-password', { token, password });
      setSuccess('Password reset successfully.');
      setError('');
    } catch (error) {
      setError('Failed to reset password');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" gutterBottom>Reset Password</Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2,  bgcolor: 'black', '&:hover':{ bgcolor: '#333533'} }}>Reset Password</Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
