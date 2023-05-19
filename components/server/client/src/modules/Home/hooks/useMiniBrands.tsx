import { useQuery } from '@apollo/client';
import { GET_MINIBRANDS } from '../../../graphql/miniBrands';
import { QueryGetMiniBrandsArgs } from '__generated__/graphql';

const useMiniBrands = (variables: QueryGetMiniBrandsArgs) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_MINIBRANDS,
    {
      variables
    }
  );

  return {
    data: data?.getMiniBrands.data,
    cursor: data?.getMiniBrands.cursor,
    refetch,
    fetchMore,
    loading,
    error
  };
};

export default useMiniBrands;
