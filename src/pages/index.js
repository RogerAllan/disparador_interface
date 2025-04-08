// src/pages/index.jsx
import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ImageIcon from '@mui/icons-material/Image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';

import Navbar from '../components/Navbar';
import Dashboard from '../components/Dashboard';
import HealthStatus from '../components/HealthStatus';
import ImageUpload from '../components/ImageUpload';
import ImageGallery from '../components/ImageGallery';
import UserManagement from '../components/UserManagement';
import Broadcast from '../components/Broadcast';

export default function Home() {
  const [activeTab, setActiveTab] = useState('/');
  const [showNavbar, setShowNavbar] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:100%)');

  return (
    <Box display="flex">
      {/* Sidebar */}
      {showNavbar && !isSmallScreen && (
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      {/* Toggle */}
      <Box
        sx={{
          position: 'fixed',
          top: 16,
          left: showNavbar && !isSmallScreen ? 260 : 16,
          zIndex: 1300,
          left: '0px',

          backgroundColor: '#1f1f1f',
          borderRadius: '50%',
          boxShadow: '0px 0px 10px rgba(255, 215, 0, 0.5)',
        }}
      >
        <IconButton
          onClick={() => setShowNavbar((prev) => !prev)}
          sx={{ color: 'gold', '&:hover': { backgroundColor: '#333' } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          ml: showNavbar && !isSmallScreen ? '-10px' : '0px',
          transition: 'margin-left 0.3s ease-in-out',
          backgroundColor: '#121212',
          minHeight: '300vh',
          hight: '100%',
          width: '100%',
          padding: '50px 50px', 
          color: '#f1f1f1',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Header com Logo e Branding */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={5}
          mb={6}
          flexDirection="column"
        >
          <Typography
            variant="h3"
            sx={{
              color: 'gold',
              textShadow: '2px 2px 8px black',
              fontWeight: 700,
            }}
          >
            Sistema Administrativo
          </Typography>
          <Typography variant="subtitle1" color="#aaa">
            em caso de emergência, entre em contato com o suporte técnico
          </Typography>
        </Box>

        

        <Section
          title="Status de Saúde"
          icon={<HealthAndSafetyIcon />}
          subtitle="Monitore a integridade do sistema em tempo real"
        >
          <HealthStatus />
        </Section>

        <Section title="Galeria de Imagens" icon={<ImageIcon />}>
          <ImageGallery />
        </Section>

        <Section title="Upload de Imagens" icon={<CloudUploadIcon />}>
          <ImageUpload />
        </Section>
            
        <Section title="Gestão de Usuários" icon={<PeopleIcon />}>
          <UserManagement />
        </Section>

        <Section title="Broadcast" icon={<CampaignIcon />}>
          <Broadcast />
        </Section>
      </Box>
    </Box>
  );
}

// Componente reutilizável para cada seção
const Section = ({ title, icon, subtitle, children }) => (
  <Box mb={6}>
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      {icon}
      <Typography variant="h5" color="gold">
        {title}
      </Typography>
    </Box>
    {subtitle && (
      <Typography variant="subtitle2" color="#ccc" mb={2}>
        {subtitle}
      </Typography>
    )}
    <Box>{children}</Box>
  </Box>
);
