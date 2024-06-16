import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import api from '../../config/axiosConfig';
import ULayout from '../../components/components-user/ULayout';

const Points = () => {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await api.get('/api/points/me');
        setPoints(response.data);
      } catch (error) {
        console.error('Error fetching points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  return (
    <ULayout>
      <Box>
        <Typography variant="h5">Nombre de Points</Typography>
        {loading ? <CircularProgress /> : <Typography variant="h4">{points}</Typography>}
      </Box>
    </ULayout>
  );
};

export default Points;
