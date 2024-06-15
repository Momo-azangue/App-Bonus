import React from 'react';
import UNavBar from '../components-user/UNavBar';
import USideBar from '../components-user/USideBar';
import { Box, CssBaseline } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex',  }}>
      <CssBaseline />
      <UNavBar />
      <USideBar />
      <Box component="main" sx={{ marginTop: 7,flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
