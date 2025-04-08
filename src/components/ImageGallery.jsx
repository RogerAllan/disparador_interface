import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import ImageCard from './ImageCard';

const API_BASE_URL = 'http://localhost:8080';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/images/list`)
      .then((res) => res.json())
      .then((data) => {
        const preparedImages = data.images.map((url) => ({
          url,
          title: url.split('/').pop(),
          created_at: null,
          level: parseInt(url.match(/level_(\d+)/)?.[1]) || undefined,
        }));
        setImages(preparedImages);
      })
      .catch((err) => {
        console.error('Erro ao buscar imagens:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Galeria de Imagens
      </Typography>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ImageCard image={image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ImageGallery;
