import { useMemo } from 'react';
import useMe from './useMe';
import { Role } from '__generated__/graphql';

const useIsAdmin = () => {
  const { data } = useMe();
  return useMemo(() => {
    return data?.role === Role.Admin;
  }, [data]);
};

export default useIsAdmin;
