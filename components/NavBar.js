import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';




const NavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Ajouter la logique de déconnexion ici
    router.push('/auth/login');
  };

  return (
    <AppBar position="fixed" sx={{ height: 0.08, backgroundColor: 'black', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
         Administration
        </Typography>
       
        <Button color="inherit" onClick={handleLogout}>Déconnexion</Button>
      </Toolbar>
    </AppBar>
  );
};

const styles = {

    linkNoDecoration: {
        color: 'white',
        textDecoration: 'none',
      },
}


export default NavBar;
