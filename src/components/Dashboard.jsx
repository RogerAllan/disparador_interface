import React from 'react';
import { useRouter } from 'next/router';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ImageIcon from '@mui/icons-material/Image';
import PeopleIcon from '@mui/icons-material/People';
import AnnouncementIcon from '@mui/icons-material/Announcement';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '16px',
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[8],
    backgroundColor: '#e3f2fd',
  },
}));

const Dashboard = () => {
  const router = useRouter();

  const stats = [
    {
      icon: <ImageIcon fontSize="large" color="primary" />,
      title: 'Image Gallery',
      description: 'Browse and manage all images',
      path: '/images',
    },
    {
      icon: <PeopleIcon fontSize="large" color="primary" />,
      title: 'User Management',
      description: 'View and manage users',
      path: '/users',
    },
    {
      icon: <AnnouncementIcon fontSize="large" color="primary" />,
      title: 'Broadcast',
      description: 'Send messages to users',
      path: '/broadcast',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <DashboardIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Item onClick={() => router.push(stat.path)}>
              <Box sx={{ mb: 1 }}>{stat.icon}</Box>
              <Typography variant="h6" component="h2">
                {stat.title}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {stat.description}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
