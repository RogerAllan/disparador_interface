// src/components/Navbar.jsx
import React from 'react';
import Link from 'next/link';
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ImageIcon from '@mui/icons-material/Image';
import UploadIcon from '@mui/icons-material/Upload';
import PeopleIcon from '@mui/icons-material/People';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import WbSunnyIcon from '@mui/icons-material/WbSunny'; // Ícone solar

const drawerWidth = 240;

const Navbar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Health Status', icon: <HealthAndSafetyIcon />, path: '/health' },
    { text: 'Image Gallery', icon: <ImageIcon />, path: '/images' },
    { text: 'Upload Image', icon: <UploadIcon />, path: '/upload' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/users' },
    { text: 'Broadcast', icon: <AnnouncementIcon />, path: '/broadcast' },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#121212',
          color: '#FFD700',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />

      {/* Logo e Título */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 2,
          borderBottom: '1px solid #FFD70055',
        }}
      >
        <WbSunnyIcon sx={{ color: '#FFD700', mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{ fontWeight: 'bold', color: '#FFD700' }}
        >
          Disparador Solares
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#FFD70033' }} />

      <List>
        {menuItems.map((item) => (
          <Link key={item.text} href={item.path} passHref legacyBehavior>
            <ListItem
              button
              component="a"
              onClick={() => setActiveTab(item.path)}
              sx={{
                backgroundColor:
                  activeTab === item.path ? '#FFD70022' : 'transparent',
                color: activeTab === item.path ? '#FFD700' : '#FFFFFF',
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: '#FFD70033',
                  color: '#FFD700',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: activeTab === item.path ? '#FFD700' : '#FFFFFF',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: activeTab === item.path ? 'bold' : 'normal',
                }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Navbar;
