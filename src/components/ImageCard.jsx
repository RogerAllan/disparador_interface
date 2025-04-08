import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const ImageCard = ({ image }) => {
  if (!image || !image.url) {
    return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box height="200" display="flex" alignItems="center" justifyContent="center">
          <Typography variant="body2" color="text.secondary">
            Imagem não disponível
          </Typography>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Sem dados
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const imageUrl = new URL(image.url, 'http://localhost:8080').toString();


  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={image.title || 'Imagem'}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {image.created_at
              ? new Date(image.created_at).toLocaleDateString()
              : 'Data desconhecida'}
          </Typography>
          <Typography variant="body2" color="text.primary">
            {image.level !== undefined ? `Level ${image.level}` : 'Sem nível'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImageCard;