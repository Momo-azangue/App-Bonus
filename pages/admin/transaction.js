import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress ,Button, IconButton} from '@mui/material';
import axios from 'axios';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import api from '../../config/axiosConfig';
const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({ montant: '', type: '', statut: '', date: '', user: '' });
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


  const handleOpenModal = (transaction = { montant: '', type: '', statut: '', date: '', user: '' }) => {
    setCurrentTransaction(transaction);
    setIsEditMode(Boolean(transaction.id));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentTransaction({ montant: '', type: '', statut: '', date: '', user: '' });
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
        await api.post('/api/transactions', currentTransaction);
      }
      setTransactions((prevTransactions) => isEditMode ? prevTransactions.map((transaction) => (transaction.id === currentTransaction.id ? currentTransaction : transaction)) : [...prevTransactions, currentTransaction]);
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


  return (
    <Layout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Transactions
        </Typography>

        <Button variant="contained" color="primary" sx={{ backgroundColor:"black" }} onClick={() => handleOpenModal()}>
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
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.user}</TableCell>
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
      </Container>
    </Layout>
  );
};

export default Transactions;
