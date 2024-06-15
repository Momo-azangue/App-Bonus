import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Box, IconButton, CircularProgress } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import api from '../../config/axiosConfig';

const RulesPage = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentRule, setCurrentRule] = useState({ name: '', description: '', montantMin: '', points: '', createdByName: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await api.get('/api/rules');
        setRules(response.data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, []);

  const handleOpenModal = (rule = { name: '', description: '', montantMin: '', points: '', createdByName: '' }) => {
    setCurrentRule(rule);
    setIsEditMode(Boolean(rule.id));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentRule({ name: '', description: '', montantMin: '', points: '', createdByName: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentRule({ ...currentRule, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/api/rules/${currentRule.id}`, currentRule);
      } else {
        await api.post('/api/rules', currentRule);
      }
      setRules((prevRules) => isEditMode ? prevRules.map((rule) => (rule.id === currentRule.id ? currentRule : rule)) : [...prevRules, currentRule]);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving rule:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/rules/${id}`);
      setRules(rules.filter((rule) => rule.id !== id));
    } catch (error) {
      console.error('Error deleting rule:', error);
    }
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Gestion des Règles
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Ajouter une Règle
        </Button>
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
                  <TableCell>Description</TableCell>
                  <TableCell>Montant Minimum</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Créé par</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell>{rule.id}</TableCell>
                    <TableCell>{rule.description}</TableCell>
                    <TableCell>{rule.montantMin}</TableCell>
                    <TableCell>{rule.points}</TableCell>
                    <TableCell>{rule.createdByName}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenModal(rule)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(rule.id)}>
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
              {isEditMode ? 'Modifier' : 'Ajouter'} une Règle
            </Typography>
            <form onSubmit={handleSubmit}>
            
              <TextField
                label="Description"
                name="description"
                value={currentRule.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Montant Minimum"
                name="montantMin"
                type="number"
                value={currentRule.montantMin}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Points"
                name="points"
                type="number"
                value={currentRule.points}
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

export default RulesPage;
