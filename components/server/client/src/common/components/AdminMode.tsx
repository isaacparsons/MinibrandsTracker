import { ReactElement } from 'react';
import { Box } from '@mui/material';
import { useAdminModeContext } from 'context/AdminModeContext';

interface Props {
  children: ReactElement[] | ReactElement;
}

const AdminMode = (props: Props) => {
  const { children } = props;

  const { adminMode } = useAdminModeContext();

  return adminMode ? <Box>{children}</Box> : null;
};

export default AdminMode;
