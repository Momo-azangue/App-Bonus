import React, { useState } from 'react';
import ULayout from '../../components/components-user/ULayout';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import api from '../../config/axiosConfig';
import jwtDecode from 'jwt-decode';

const TransactionPage = () => {
  const [montant, setMontant] = useState('');
  const [type, setType] = useState('');
  const [statut, setStatut] = useState('pending');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/api/transactions/create-me', { montant, type, statut });
      setMessage('Transaction créée avec succès');
      setMontant('');
      setType('');
      setStatut('pending');
    } catch (error) {
      setMessage('Erreur lors de la création de la transaction');
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <ULayout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Créer une Transaction
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Montant"
            variant="outlined"
            fullWidth
            margin="normal"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
          <TextField
            label="Type"
            variant="outlined"
            fullWidth
            margin="normal"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <TextField
            select
            label="Statut"
            variant="outlined"
            fullWidth
            margin="normal"
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
          >
            <MenuItem value="pending">En attente</MenuItem>
            <MenuItem value="completed">Complétée</MenuItem>
            <MenuItem value="failed">Échouée</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary">
            Créer
          </Button>
        </Box>
        {message && <Typography variant="body1">{message}</Typography>}
      </Container>
    </ULayout>
  );
};

export default TransactionPage;
