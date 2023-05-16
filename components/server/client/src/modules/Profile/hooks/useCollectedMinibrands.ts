import { useQuery } from '@apollo/client';
import { GetCollectedMinibrandsQueryVariables } from '__generated__/graphql';
import { GET_COLLECTED_MINIBRANDS } from 'graphql/miniBrands';

const useCollectedMinibrands = (
  variables: GetCollectedMinibrandsQueryVariables
) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_COLLECTED_MINIBRANDS,
    {
      variables
    }
  );

  return {
    data: data?.getCollectedMinibrands.data,
    cursor: data?.getCollectedMinibrands.cursor,
    fetchMore,
    loading,
    error
  };
};

export default useCollectedMinibrands;
