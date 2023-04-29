import { useQuery } from '@apollo/client';
import { GET_MINIBRANDS } from '../../../graphql/miniBrands';

const useMiniBrands = () => {
  const { data, loading, error, refetch } = useQuery(GET_MINIBRANDS);

  return {
    data: data?.getMiniBrands,
    loading,
    error,
    refetch
  };
};

export default useMiniBrands;
