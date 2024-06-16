import React, { useEffect, useState } from 'react';
import ULayout from '../../components/components-user/ULayout';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import api from '../../config/axiosConfig';

const RewardPage = () => {
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await api.get('/api/rewards/reward-list');
        setRewards(response.data);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    };

    fetchRewards();
  }, []);

  return (
    <ULayout>
      <Container>
        <Typography variant="h4" gutterBottom>
          Récompenses
        </Typography>
        <Grid container spacing={3}>
          {rewards.map((reward) => (
            <Grid item xs={12} sm={6} md={4} key={reward.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {reward.nom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {reward.description}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    Points: {reward.points}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Réclamer
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ULayout>
  );
};

export default RewardPage;
