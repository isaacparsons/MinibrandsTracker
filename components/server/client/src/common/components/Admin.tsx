import { Role } from '__generated__/graphql';
import useMe from '../hooks/useMe';
import { ReactElement, useMemo } from 'react';
import { Box } from '@mui/material';

interface Props {
  children: ReactElement[] | ReactElement;
}

const Admin = (props: Props) => {
  const { children } = props;
  const { data } = useMe();

  const isAdmin = useMemo(() => {
    return data?.role === Role.Admin;
  }, [data]);

  return isAdmin ? <Box>{children}</Box> : null;
};

export default Admin;
