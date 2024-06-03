import React from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Link from 'next/link';

const RegisterForm = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 21,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          S'inscrire
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="firstName"
            label="Prénom"
            id="firstName"
            autoComplete="given-name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Nom de famille"
            id="lastName"
            autoComplete="family-name"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'black' }}
          >
            S'inscrire
          </Button>
          <Box display="flex" justifyContent="center">
            <Link href="/auth/login" passHref>
              <Typography variant="body2" color="primary" >
                {"Vous avez déjà un compte ? Se connecter"}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
