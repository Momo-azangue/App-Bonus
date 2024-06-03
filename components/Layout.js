import React from 'react';
import NavBar from './NavBar';
import SideBar from './SideBar';
import { Box, CssBaseline } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex',  }}>
      <CssBaseline />
      <NavBar />
      <SideBar />
      <Box component="main" sx={{ marginTop: 7,flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
