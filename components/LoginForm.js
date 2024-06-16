import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import api from '../config/axiosConfig';


const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
          const response = await api.post('auth/signin', { username, password });
  
          // Log the response data to inspect it
          console.log("Response data:", response.data);
  
          // Utilisez la bonne clé pour obtenir le accessToken et refreshToken
          const accessToken = response.data.token;
          const refreshToken = response.data.refreshToken;
  
          if (!accessToken || !refreshToken) {
              throw new Error('Tokens not found in response');
          }
  
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
  
          // Extraire les rôles depuis le token (utilisez une fonction pour décoder le JWT et obtenir les rôles)
          const roles = getRolesFromToken(accessToken);

  
          // Rediriger en fonction du rôle
          if (roles.includes('ROLE_ADMIN')) {
              router.push('/admin/dashboard');
          } else {
              router.push('/user/dashboard');
          }
      } catch (error) {
          setError('Échec de la connexion. Vérifiez vos identifiants.');
          console.error("Login error:", error);
      }
  };
  
 

  const getRolesFromToken = (token) => {
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken); // Debugging line
    return decodedToken.roles.map(role => role.authority) || [];
};
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}

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
