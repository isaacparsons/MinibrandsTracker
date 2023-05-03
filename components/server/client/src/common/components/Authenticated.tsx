import { ReactElement } from 'react';
import { Box } from '@mui/material';
import { useSessionContext } from 'context/SessionContext';

interface Props {
  children: ReactElement[] | ReactElement;
}

const Authenticated = (props: Props) => {
  const { children } = props;
  const session = useSessionContext();

  return session.authenticated ? <Box>{children}</Box> : null;
};

export default Authenticated;
