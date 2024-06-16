import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField, Box, IconButton, CircularProgress } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import api from '../../config/axiosConfig';
import { format } from 'date-fns';

const PointsPage = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentPoint, setCurrentPoint] = useState({ nombre: '', date: '', user: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await api.get('/api/points');
        setPoints(response.data);
      } catch (error) {
        console.error('Error fetching points:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  const handleOpenModal = (point = { nombre: '', date: '', user: '' }) => {
    setCurrentPoint(point);
    setIsEditMode(Boolean(point.id));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentPoint({ nombre: '', date: '', user: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPoint({ ...currentPoint, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await api.put(`/api/points/${currentPoint.id}`, currentPoint);
      } else {
        await api.post('/api/points', currentPoint);
      }
      setPoints((prevPoints) => isEditMode ? prevPoints.map((point) => (point.id === currentPoint.id ? currentPoint : point)) : [...prevPoints, currentPoint]);
      handleCloseModal();
    } catch (error) {
      console.error('Error saving point:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/points/${id}`);
      setPoints(points.filter((point) => point.id !== id));
    } catch (error) {
      console.error('Error deleting point:', error);
    }
  };

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  return (
    <Layout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Gestion des Points
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenModal()}>
          Ajouter des Points
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
                  <TableCell>Nombre</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Utilisateur</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {points.map((point) => (
                  <TableRow key={point.id}>
                    <TableCell>{point.id}</TableCell>
                    <TableCell>{point.nombre}</TableCell>
                    <TableCell>{formatDateTime(point.date)}</TableCell>
                    <TableCell>{point.user ? `${point.user.nom} ${point.user.prenom}` : 'Utilisateur inconnu'}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpenModal(point)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => handleDelete(point.id)}>
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
              {isEditMode ? 'Modifier' : 'Ajouter'} des Points
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Nombre"
                name="nombre"
                type="number"
                value={currentPoint.nombre}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Date"
                name="date"
                type="date"
                value={currentPoint.date}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
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

export default PointsPage;
