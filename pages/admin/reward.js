import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Box, IconButton, CircularProgress } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import api from '../../config/axiosConfig';

const RewardsPage = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentReward, setCurrentReward] = useState({ name: '', description: '', points: '', createdByName: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await api.get('/api/rewards/reward-list');
        setRewards(response.data);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  const handleOpenModal = (reward = { name: '', description: '', points: '', createdByName: '' }) => {
    setCurrentReward(reward);
    setIsEditMode(Boolean(reward.id));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentReward({ name: '', description: '', points: '', createdByName: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentReward({ ...currentReward, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/api/rewards/${currentReward.id}`, currentReward);
      } else {
        await api.post('/api/rewards', currentReward);
      }
      setRewards((prevRewards) => isEditMode ? prevRewards.map((reward) => (reward.id === currentReward.id ? currentReward : reward)) : [...prevRewards, currentReward]);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving reward:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/rewards/${id}`);
      setRewards(rewards.filter((reward) => reward.id !== id));
    } catch (error) {
      console.error('Error deleting reward:', error);
    }
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Gestion des Récompenses
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Ajouter une Récompense
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
                  <TableCell>Nom</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Points</TableCell>
                  <TableCell>Créé par</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rewards.map((reward) => (
                  <TableRow key={reward.id}>
                    <TableCell>{reward.id}</TableCell>
                    <TableCell>{reward.nom}</TableCell>
                    <TableCell>{reward.description}</TableCell>
                    <TableCell>{reward.points}</TableCell>
                    <TableCell>{reward.createdByName}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenModal(reward)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(reward.id)}>
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
              {isEditMode ? 'Modifier' : 'Ajouter'} une Récompense
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nom"
                name="name"
                value={currentReward.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Description"
                name="description"
                value={currentReward.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Points"
                name="points"
                type="number"
                value={currentReward.points}
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

export default RewardsPage;
