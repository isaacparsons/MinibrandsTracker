import { useQuery } from '@apollo/client';
import { GET_ACHIEVEMENTS } from '../../user';

const useAchievements = () => {
  const { data, loading, error, refetch } = useQuery(GET_ACHIEVEMENTS);

  return {
    data: data?.getMyAchievements,
    loading,
    error,
    refetch
  };
};

export default useAchievements;
