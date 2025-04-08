import React, { useState } from 'react';
import { Button, Container, Typography, Box, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import { uploadImage } from '../services/api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handleSubmit = async () => {
    if (!file) {
      setUploadStatus({ success: false, message: 'Please select a file' });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('level', level);

    try {
      setIsUploading(true);
      const response = await uploadImage(formData);
      setUploadStatus({ success: true, message: 'Image uploaded successfully!' });
      setFile(null);
    } catch (error) {
      setUploadStatus({ success: false, message: error.response?.data?.error || 'Upload failed' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Image
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="level-select-label">Level</InputLabel>
            <Select
              labelId="level-select-label"
              value={level}
              label="Level"
              onChange={handleLevelChange}
            >
              <MenuItem value={1}>Level 1</MenuItem>
              <MenuItem value={2}>Level 2</MenuItem>
              <MenuItem value={3}>Level 3</MenuItem>
              <MenuItem value={4}>Level 4</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          fullWidth
          sx={{ mb: 2 }}
        >
          Select Image
          <VisuallyHiddenInput type="file" onChange={handleFileChange} accept="image/*" />
        </Button>

        {file && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Selected file: {file.name}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!file || isUploading}
          fullWidth
          sx={{ mb: 2 }}
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </Button>

        {uploadStatus && (
          <Typography
            variant="body1"
            color={uploadStatus.success ? 'success.main' : 'error.main'}
            sx={{ textAlign: 'center' }}
          >
            {uploadStatus.message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ImageUpload;