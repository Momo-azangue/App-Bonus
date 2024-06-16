import React from 'react';
import ULayout from '../../components/components-user/ULayout';
import { Typography, Box, Paper } from '@mui/material';

const UserDashboard = () => {
  return (
    <ULayout>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord
      </Typography>
      <Box display="flex" flexDirection="row" justifyContent="space-around" mt={4}>
        <Paper elevation={3} sx={{ padding: 2, width: '30%' }}>
          <Typography variant="h6">Statistiques Utilisateurs</Typography>
          {/* Add user statistics here */}
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, width: '30%' }}>
          <Typography variant="h6">Statistiques Transactions</Typography>
          {/* Add transaction statistics here */}
        </Paper>
        <Paper elevation={3} sx={{ padding: 2, width: '30%' }}>
          <Typography variant="h6">Statistiques Règles</Typography>
          {/* Add rules statistics here */}
        </Paper>
      </Box>
    </ULayout>
  );
};

export default UserDashboard;
