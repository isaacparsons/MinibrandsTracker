import { useQuery } from '@apollo/client';
import { GET_MINIBRANDS } from '../../../graphql/miniBrands';

const useMiniBrands = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_MINIBRANDS);

  return {
    data: data?.getMiniBrands.data,
    cursor: data?.getMiniBrands.cursor,
    fetchMore,
    loading,
    error
  };
};

export default useMiniBrands;
