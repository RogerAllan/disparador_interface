import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Box, CircularProgress, Chip } from '@mui/material';
import { checkHealth } from '../services/api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
 
const HealthStatus = () => {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthStatus = async () => {
      try {
        setLoading(true);
        const response = await checkHealth();
        setHealthStatus(response.data);
      } catch (error) {
        setHealthStatus({ status: 'unhealthy' });
      } finally {
        setLoading(false);
      }
    };

    fetchHealthStatus();
    const interval = setInterval(fetchHealthStatus, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        System Health Status
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Overall Status
              </Typography>
              <Chip
                label={healthStatus.status === 'healthy' ? 'Healthy' : 'Unhealthy'}
                color={healthStatus.status === 'healthy' ? 'success' : 'error'}
                icon={healthStatus.status === 'healthy' ? <CheckCircleIcon /> : <ErrorIcon />}
              />
            </Box>

            {healthStatus.database && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Database Connection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {healthStatus.database === 'connected' ? 'Connected' : 'Disconnected'}
                </Typography>
              </Box>
            )}

            {healthStatus.pool_stats && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Connection Pool Statistics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Max Connections: {healthStatus.pool_stats.max_connections}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Available Connections: {healthStatus.pool_stats.available}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default HealthStatus;