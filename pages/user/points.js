import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import api from '../../config/axiosConfig';

const Points = () => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await api.get('/api/points');
        setPoints(response.data.points);
      } catch (error) {
        console.error('Error fetching points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  return (
    <Box>
      <Typography variant="h5">Nombre de Points</Typography>
      {loading ? <CircularProgress /> : <Typography variant="h4">{points}</Typography>}
    </Box>
  );
};

export default Points;
