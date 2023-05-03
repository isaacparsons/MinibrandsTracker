import { CircularProgress } from '@mui/material';
import { HOME_PATH } from 'App';
import { useSessionContext } from 'context/SessionContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const session = useSessionContext();

  useEffect(() => {
    session.login();
    navigate(HOME_PATH);
  }, [navigate, session]);

  return <CircularProgress />;
};

export default Success;
