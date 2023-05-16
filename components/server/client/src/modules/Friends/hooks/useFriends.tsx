import { useQuery } from '@apollo/client';
import { GET_FRIENDS } from 'graphql/friends';

const useFriends = () => {
  const { data, loading, error, refetch } = useQuery(GET_FRIENDS);

  return {
    data: data?.getFriends,
    loading,
    error,
    refetch
  };
};

export default useFriends;
