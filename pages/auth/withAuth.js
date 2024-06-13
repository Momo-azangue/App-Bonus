import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


const withAuth = (WrappedComponent, requiredRoles) => {
  return (props) => {
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const roles = getRolesFromToken(token);
        if (roles.some((role) => requiredRoles.includes(role))) {
          setAuthorized(true);
        } else {
          router.push('/unauthorized');
        }
      } else {
        router.push('/auth/login');
      }
    }, []);

    const getRolesFromToken = (token) => {
      const decodedToken = jwtDecode(token);
      return decodedToken.roles || [];
    };

    return authorized ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
