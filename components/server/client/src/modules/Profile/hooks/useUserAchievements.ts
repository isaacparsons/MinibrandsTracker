import { useQuery } from '@apollo/client';
import { GetAchievementsQueryVariables } from '__generated__/graphql';
import { USER_ACHIEVEMENTS } from 'graphql/user';

const useUserAchievements = (variables: GetAchievementsQueryVariables) => {
  const { data, loading, error } = useQuery(USER_ACHIEVEMENTS, {
    variables
  });

  return {
    data: data?.getAchievements,
    loading,
    error
  };
};

export default useUserAchievements;
