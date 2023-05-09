import { ReactElement, useEffect } from 'react';
import { Box } from '@mui/material';
import { useSessionContext } from 'context/SessionContext';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactElement[] | ReactElement;
}

const ProtectedRoute = (props: Props) => {
  const { children } = props;
  const { authenticated } = useSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }
  }, [authenticated, navigate]);

  return authenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
