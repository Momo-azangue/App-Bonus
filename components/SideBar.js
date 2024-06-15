import React, { useState, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import RuleIcon from '@mui/icons-material/Rule';
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
    { text: 'Utilisateurs', icon: <PeopleIcon />, path: '/admin/utilisateurs' },
    { text: 'Règles', icon: <RuleIcon />, path: '/admin/regles' },
    { text: 'Recompenses', icon: <EmojiEventsIcon />, path: '/admin/reward' },
    { text: 'Points', icon: <PointOfSaleIcon />, path: '/admin/points' },
    { text: 'Historiques', icon: <HistoryIcon />, path: '/admin/historiques' },
    { text: 'Transactions', icon: <MonetizationOnIcon />, path: '/admin/transaction' },
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
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
