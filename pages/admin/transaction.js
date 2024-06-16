import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Box, Typography, Table, TableBody, TextField, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button, IconButton, Modal } from '@mui/material';
import axios from 'axios';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import api from '../../config/axiosConfig';
import { format } from 'date-fns';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({ montant: '', type: '', statut: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/api/transactions/all-transaction');
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleOpenModal = (transaction = { montant: '', type: '', statut: '' }) => {
    setCurrentTransaction(transaction);
    setIsEditMode(Boolean(transaction.id));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentTransaction({ montant: '', type: '', statut: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTransaction({ ...currentTransaction, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/api/transactions/${currentTransaction.id}`, currentTransaction);
      } else {
        await api.post('/api/transactions/create-transcation', currentTransaction);
      }
      setTransactions((prevTransactions) =>
        isEditMode
          ? prevTransactions.map((transaction) =>
              transaction.id === currentTransaction.id ? currentTransaction : transaction
            )
          : [...prevTransactions, currentTransaction]
      );
      handleCloseModal();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/transactions/${id}`);
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };


  return (
    <Layout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Transactions
        </Typography>

        <Button variant="contained" color="primary" sx={{ backgroundColor: 'black' }} onClick={() => handleOpenModal()}>
          Ajouter une Transaction
        </Button>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Montant</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Utilisateur</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.montant}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.statut}</TableCell>
                    <TableCell>{formatDateTime(transaction.date)}</TableCell>
                    <TableCell>{transaction.user ? `${transaction.user.nom} ${transaction.user.prenom}` : ''}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenModal(transaction)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(transaction.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2">
              {isEditMode ? 'Modifier' : 'Ajouter'} une Transaction
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Montant"
                name="montant"
                type="number"
                value={currentTransaction.montant}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Type"
                name="type"
                value={currentTransaction.type}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Statut"
                name="statut"
                value={currentTransaction.statut}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                  {isEditMode ? 'Modifier' : 'Ajouter'}
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </Container>
    </Layout>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default Transactions;
