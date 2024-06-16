import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Paper, CircularProgress } from '@mui/material';
import api from '../../config/axiosConfig';
import ULayout from '../../components/components-user/ULayout';
import { format } from 'date-fns';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/api/historiques/me');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <ULayout>
      <Box>
        <Typography variant="h5">Historique des Transactions</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Utilisateur</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Montant</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((historique) => (
                    <TableRow key={historique.id}>
                      <TableCell>{historique.id}</TableCell>
                      <TableCell>{historique.user?.nom}</TableCell>
                      <TableCell>{format(new Date(historique.date), 'yyyy-MM-dd ')}</TableCell>
                      <TableCell>{historique.type}</TableCell>
                      <TableCell>{historique.points}</TableCell>
                      <TableCell>{historique.montantTransaction}</TableCell>
                      <TableCell>{historique.description}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">Aucune transaction effectuée</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </ULayout>
  );
};

export default TransactionHistory;
