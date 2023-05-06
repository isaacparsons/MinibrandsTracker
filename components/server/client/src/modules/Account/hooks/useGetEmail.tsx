import { User } from '__generated__/graphql';
import { useMemo } from 'react';

const useGetEmail = (user?: User | null) => {
  return useMemo(() => {
    if (!user) {
      return;
    }
    if (user.googleAuth) {
      return user.googleAuth.email;
    }
    if (user.localAuth) {
      return user.localAuth.email;
    }
  }, [user]);
};

export default useGetEmail;
