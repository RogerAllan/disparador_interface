import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import HealthStatus from './components/HealthStatus';
import ImageGallery from './components/ImageGallery';
import ImageUpload from './components/ImageUpload';
import UserManagement from './components/UserManagement';
import Broadcast from './components/Broadcast';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', blockSize: '100vh' }}>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/health" element={<HealthStatus />} />
              <Route path="/images" element={<ImageGallery />} />
              <Route path="/upload" element={<ImageUpload />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/broadcast" element={<Broadcast />} />
              
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;