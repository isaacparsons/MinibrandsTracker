import { useQuery } from '@apollo/client';
import { GET_ACHIEVEMENTS } from '../../graphql/user';

const useAchievements = () => {
  const { data, loading, error, refetch } = useQuery(GET_ACHIEVEMENTS);

  return {
    data: data?.getAchievements,
    loading,
    error,
    refetch
  };
};

export default useAchievements;
