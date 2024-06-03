import Layout from '../../components/Layout';
import { Typography, TextField, Button, Box } from '@mui/material';

const Utilisateurs = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Utilisateurs
      </Typography>
      <TextField
        label="Rechercher des utilisateurs..."
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Box>
        {/* Ici vous ajouterez votre logique pour afficher les utilisateurs */}
        <Button variant="contained"  sx={{ mt: 2 ,bgcolor: 'black', '&:hover': { bgcolor:'#333533'}}}>Ajouter un utilisateur</Button>
      </Box>
    </Layout>
  );
};

export default Utilisateurs;
