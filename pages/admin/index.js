import Layout from '../../components/Layout';
import { Typography } from '@mui/material';
import withAuth from '../auth/withAuth';

const AdminDashboard = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Dashboard Admin
      </Typography>
      <Typography>
        Bienvenue dans le tableau de bord de l'administrateur.
      </Typography>
    </Layout>
  );
};

export default withAuth(AdminDashboard, ['ADMIN']);
