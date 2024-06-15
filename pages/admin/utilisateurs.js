import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { Typography, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Modal, IconButton } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import api from '../../config/axiosConfig';

const Utilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/user/list');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleOpenView = (user) => {
    setSelectedUser(user);
    setOpenView(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setOpenDelete(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedUser(null);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUser(null);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/user/${selectedUser.id}`);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      handleCloseDelete();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
        const token = localStorage.getItem('token');
        const updatedUser = {
            ...selectedUser,
            roles: selectedUser.roles.map(role => ({ authority: role.name }))
        };
        await api.put(`/api/user/${selectedUser.id}`, updatedUser, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
        handleCloseEdit();
    } catch (error) {
        console.error('Error updating user:', error);
    }
};

  const handleChange = (event) => {
    setSelectedUser({ ...selectedUser, [event.target.name]: event.target.value });
  };

  const filteredUsers = users.filter(user => 
    (user.nom || '').toLowerCase().includes(search.toLowerCase()) || 
    (user.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Utilisateurs
      </Typography>
      <TextField
        label="Rechercher des utilisateurs..."
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
      />
      <Box>
        <Button variant="contained" sx={{ mt: 2, bgcolor: 'black', '&:hover': { bgcolor: '#333533' } }}>
          Ajouter un utilisateur
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
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.nom}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleOpenView(user)}>
                      <Visibility />
                    </IconButton>
                    <IconButton color="primary" onClick={() => handleOpenEdit(user)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleOpenDelete(user)}>
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
            Voir Utilisateur
          </Typography>
          {selectedUser && (
            <Box>
              <Typography variant="body1">Nom: {selectedUser.nom}</Typography>
              <Typography variant="body1">Email: {selectedUser.email}</Typography>
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
            Modifier Utilisateur
          </Typography>
          {selectedUser && (
            <Box component="form" onSubmit={handleEditSubmit}>
              <TextField
                label="Nom"
                variant="outlined"
                fullWidth
                margin="normal"
                name="nom"
                value={selectedUser.nom}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                name="email"
                value={selectedUser.email}
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
            Supprimer Utilisateur
          </Typography>
          {selectedUser && (
            <Box>
              <Typography variant="body1">Voulez-vous vraiment supprimer l'utilisateur {selectedUser.nom} ?</Typography>
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

export default Utilisateurs;
