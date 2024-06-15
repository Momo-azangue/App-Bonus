// components/NavBar.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Link from 'next/link';
import api from '../config/axiosConfig';

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

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token found');
      return;
    }
  
    try {
      await api.delete('/api/auth/signout', { data: { refreshToken } });
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      console.log('Logout successful');
      router.push('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      handleClose();
    }
  };
  
  

  return (
    <>
      <AppBar position="fixed" sx={{ height: 0.08, backgroundColor: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link href="/admin/utilisateurs" passHref legacyBehavior>
              <a style={{ color: 'white', textDecoration: 'none' }}>Administration</a>
            </Link>
          </Typography>
          <Button color="inherit" onClick={handleOpen}>Déconnexion</Button>
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-title" variant="h6" component="h2">
            Déconnexion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Êtes-vous sûr de vouloir vous déconnecter ?
          </Typography>
          <Box mt={3} display="flex" justifyContent="space-around">
            <Button variant="contained" color="primary" onClick={handleLogout} sx={{ backgroundColor: "black" }}>Oui</Button>
            <Button variant="contained" color="secondary" onClick={handleClose} sx={{ backgroundColor: "purple" }}>Non</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default NavBar;
