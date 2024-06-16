
import ULayout from '../../components/components-user/ULayout';
import { Typography } from '@mui/material';
import withAuth from '../auth/withAuth';

const UserDashboard = () => {
    return (
        <ULayout>
          <Typography variant="h4" gutterBottom>
            Dashboard User
          </Typography>
          <Typography>
            Bienvenue dans le tableau de bord de l'utilisateur.
          </Typography>
        </ULayout>
      );
    };
    

export default  withAuth(UserDashboard, ['USER']);
