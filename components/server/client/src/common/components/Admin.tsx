import { ReactElement } from 'react';
import { Box } from '@mui/material';
import useIsAdmin from 'common/hooks/useIsAdmin';

interface Props {
  children: ReactElement[] | ReactElement;
}

const Admin = (props: Props) => {
  const { children } = props;
  const isAdmin = useIsAdmin();

  return isAdmin ? <Box>{children}</Box> : null;
};

export default Admin;
