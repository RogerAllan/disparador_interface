import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Box } from '@mui/material';
import { sendBroadcast } from '../services/api';

const Broadcast = () => {
  const [message, setMessage] = useState('');
  const [level, setLevel] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setSendStatus({ success: false, message: 'Please enter a message' });
      return;
    }

    try {
      setIsSending(true);
      await sendBroadcast(message, level);
      setSendStatus({ success: true, message: 'Broadcast sent successfully!' });
      setMessage('');
    } catch (error) {
      setSendStatus({ success: false, message: error.response?.data?.error || 'Failed to send broadcast' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Send Broadcast Message
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="broadcast-level-label">Target Level</InputLabel>
              <Select
                labelId="broadcast-level-label"
                value={level}
                label="Target Level"
                onChange={(e) => setLevel(e.target.value)}
              >
                <MenuItem value={1}>Level 1</MenuItem>
                <MenuItem value={2}>Level 2</MenuItem>
                <MenuItem value={3}>Level 3</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            label="Message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSending || !message.trim()}
            fullWidth
            size="large"
          >
            {isSending ? 'Sending...' : 'Send Broadcast'}
          </Button>

          {sendStatus && (
            <Typography
              variant="body1"
              color={sendStatus.success ? 'success.main' : 'error.main'}
              sx={{ textAlign: 'center', mt: 2 }}
            >
              {sendStatus.message}
            </Typography>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default Broadcast;