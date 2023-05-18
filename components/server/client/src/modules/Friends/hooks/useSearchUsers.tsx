import { useLazyQuery } from '@apollo/client';
import { SearchUsersQueryVariables } from '__generated__/graphql';
import { SEARCH_USERS } from 'graphql/user';

const useSearchUsers = () => {
  const [searchUsers, { data, loading, error, fetchMore, refetch }] =
    useLazyQuery(SEARCH_USERS);

  const onSearchUsers = (variables: SearchUsersQueryVariables) => {
    searchUsers({ variables });
  };

  return {
    searchUsers: onSearchUsers,
    data: data?.searchUsers.data,
    cursor: data?.searchUsers.cursor,
    loading,
    error,
    fetchMore,
    refetch
  };
};

export default useSearchUsers;
