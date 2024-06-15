import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Typography, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Modal, IconButton } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import api from '../../config/axiosConfig';

const rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedReward, setSelectedReward] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleOpenView = (reward) => {
    setSelectedReward(reward);
    setOpenView(true);
  };

  const handleOpenEdit = (reward) => {
    setSelectedReward(reward);
    setOpenEdit(true);
  };

  const handleOpenDelete = (reward) => {
    setSelectedReward(reward);
    setOpenDelete(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedReward(null);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedReward(null);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedReward(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/rewards/${selectedReward.id}`);
      setRewards(rewards.filter(reward => reward.id !== selectedReward.id));
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting reward:', error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/api/rewards/${selectedReward.id}`, selectedReward);
      setRewards(rewards.map(reward => (reward.id === selectedReward.id ? selectedReward : reward)));
      handleCloseEdit();
    } catch (error) {
      console.error('Error updating reward:', error);
    }
  };

  const handleChange = (event) => {
    setSelectedReward({ ...selectedReward, [event.target.name]: event.target.value });
  };

  const filteredRewards = rewards.filter(reward => 
    (reward.nom || '').toLowerCase().includes(search.toLowerCase()) || 
    (reward.description || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Récompenses
      </Typography>
      <TextField
        label="Rechercher des récompenses..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
      />
      <Box>
        <Button variant="contained" sx={{ mt: 2, bgcolor: 'black', '&:hover': { bgcolor: '#333533' } }}>
          Ajouter une récompense
        </Button>
      </Box>
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRewards.map((reward) => (
                <TableRow key={reward.id}>
                  <TableCell>{reward.id}</TableCell>
                  <TableCell>{reward.nom}</TableCell>
                  <TableCell>{reward.description}</TableCell>
                  <TableCell>{reward.points}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenView(reward)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleOpenEdit(reward)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleOpenDelete(reward)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Modal
        open={openView}
        onClose={handleCloseView}
        aria-labelledby="modal-title-view"
        aria-describedby="modal-description-view"
      >
        <Box sx={style}>
          <Typography id="modal-title-view" variant="h6" component="h2">
            Voir Récompense
          </Typography>
          {selectedReward && (
            <Box>
              <Typography variant="body1">Nom: {selectedReward.nom}</Typography>
              <Typography variant="body1">Description: {selectedReward.description}</Typography>
              <Typography variant="body1">Points: {selectedReward.points}</Typography>
              <Button variant="contained" color="primary" onClick={handleCloseView}>Fermer</Button>
            </Box>
          )}
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-title-edit"
        aria-describedby="modal-description-edit"
      >
        <Box sx={style}>
          <Typography id="modal-title-edit" variant="h6" component="h2">
            Modifier Récompense
          </Typography>
          {selectedReward && (
            <Box component="form" onSubmit={handleEditSubmit}>
              <TextField
                label="Nom"
                variant="outlined"
                fullWidth
                margin="normal"
                name="nom"
                value={selectedReward.nom}
                onChange={handleChange}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                name="description"
                value={selectedReward.description}
                onChange={handleChange}
              />
              <TextField
                label="Points"
                variant="outlined"
                fullWidth
                margin="normal"
                name="points"
                value={selectedReward.points}
                onChange={handleChange}
              />
              <Button type="submit" variant="contained" color="primary">Enregistrer</Button>
            </Box>
          )}
        </Box>
      </Modal>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-title-delete"
        aria-describedby="modal-description-delete"
      >
        <Box sx={style}>
          <Typography id="modal-title-delete" variant="h6" component="h2">
            Supprimer Récompense
          </Typography>
          {selectedReward && (
            <Box>
              <Typography variant="body1">Voulez-vous vraiment supprimer la récompense {selectedReward.nom} ?</Typography>
              <Box mt={3} display="flex" justifyContent="space-around">
                <Button variant="contained" color="primary" onClick={handleDelete}>Oui</Button>
                <Button variant="contained" color="secondary" onClick={handleCloseDelete}>Non</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Layout>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default rewards;
