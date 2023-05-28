import { useQuery } from '@apollo/client';
import { GET_MINIBRANDS } from '../../miniBrands';
import { QueryGetMiniBrandsArgs } from '__generated__/graphql';
import { useMemo } from 'react';

const useMiniBrands = (variables: QueryGetMiniBrandsArgs) => {
  const variablesMemo = useMemo(() => {
    return variables;
  }, [JSON.stringify(variables)]);

  const { data, loading, error, fetchMore, refetch } = useQuery(
    GET_MINIBRANDS,
    {
      variables: variablesMemo
    }
  );

  return {
    data: data?.getMiniBrands.data,
    cursor: data?.getMiniBrands.cursor,
    hasNextPage: data?.getMiniBrands.hasNextPage,
    refetch,
    fetchMore,
    loading,
    error
  };
};

export default useMiniBrands;
