import withAuth from '../path/to/withAuth';
import Layout from '../../components/Layout';
import { Typography } from '@mui/material';

const UserDashboard = () => {
    return (
        <Layout>
          <Typography variant="h4" gutterBottom>
            Dashboard Admin
          </Typography>
          <Typography>
            Bienvenue dans le tableau de bord de l'utilisateur.
          </Typography>
        </Layout>
      );
    };
    

export default withAuth(UserDashboard, ['USER']);
