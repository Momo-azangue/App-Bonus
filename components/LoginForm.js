import React from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Link from 'next/link';

const LoginForm = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 22,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Se connecter
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Link href="/auth/forgot-password" passHref>
            <Typography variant="body2" color="primary" component="span">
              Mot de passe oublié?
            </Typography>
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
          >
            Se connecter
          </Button>
          <Box display="flex" justifyContent="center">
            <Link href="/auth/register" passHref>
              <Typography variant="body2" color="primary" component="span">
                {"Vous n'avez pas de compte ? S'inscrire"}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
