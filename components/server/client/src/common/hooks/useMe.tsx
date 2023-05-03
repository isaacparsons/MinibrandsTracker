import { useQuery } from '@apollo/client';
import { GET_ME } from '../../graphql/user';

const useMe = () => {
  const { data, loading, error, refetch } = useQuery(GET_ME);

  return {
    data: data?.getMe,
    loading,
    error,
    refetch
  };
};

export default useMe;
