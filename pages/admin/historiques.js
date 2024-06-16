import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box, TextField } from '@mui/material';
import api from '../../config/axiosConfig';
import { format } from 'date-fns';

const HistoriquePage = () => {
  const [historiques, setHistoriques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchHistoriques = async () => {
      try {
        const response = await api.get('/api/historiques');
        setHistoriques(response.data);
      } catch (error) {
        console.error('Error fetching historiques:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoriques();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredHistoriques = historiques.filter(historique => 
    (historique.description || '').toLowerCase().includes(search.toLowerCase()) ||
    (historique.type || '').toLowerCase().includes(search.toLowerCase())
  );

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };


  return (
    <Layout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Historique des Transactions
        </Typography>
        <TextField
          label="Rechercher dans l'historique..."
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={handleSearchChange}
        />
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
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
                {filteredHistoriques.map((historique) => (
                  <TableRow key={historique.id}>
                    <TableCell>{historique.id}</TableCell>
                    <TableCell>{historique.user?.nom}</TableCell>
                    <TableCell>{formatDateTime(historique.date)}</TableCell>
                    <TableCell>{historique.type}</TableCell>
                    <TableCell>{historique.points}</TableCell>
                    <TableCell>{historique.montantTransaction}</TableCell>
                    <TableCell>{historique.description}</TableCell>
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

export default HistoriquePage;
