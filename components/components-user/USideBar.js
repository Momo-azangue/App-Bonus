import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';


import { useRouter } from 'next/router';

const drawerWidth = 240;

const SideBar = () => {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState('');

  useEffect(() => {
    setSelectedPath(router.pathname);
  }, [router.pathname]);

  const menuItems = [

    { text: 'Transactions', icon: <MonetizationOnIcon />, path: '/user/transaction' },
    { text: 'Recompenses', icon: <EmojiEventsIcon />, path: '/user/reward' },
    { text: 'Points', icon: <PointOfSaleIcon />, path: '/user/points' },
    { text: 'Historiques', icon: <HistoryIcon />, path: '/user/transactionhistory' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/user/dashboard' },
  ];

  const handleItemClick = (path) => {
    setSelectedPath(path);
    router.push(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar
        sx={{
          paddingTop: 15,
        }}
      />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleItemClick(item.path)}
            sx={{
              marginBottom: 3,
              backgroundColor: selectedPath === item.path ? 'black' : 'inherit',
              color: selectedPath === item.path ? '#fff' : 'inherit',
              '&:hover': { backgroundColor: 'black', color: '#fff' },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;
