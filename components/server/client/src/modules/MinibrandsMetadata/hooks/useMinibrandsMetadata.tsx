import { useQuery } from '@apollo/client';
import { GET_MINIBRANDS_METADATA } from '../../../graphql/miniBrands';

const useMinibrandsMetadata = () => {
  const { data, loading, error, refetch } = useQuery(GET_MINIBRANDS_METADATA);

  return {
    data: data?.getMiniBrandsMetaData,
    loading,
    error,
    refetch
  };
};

export default useMinibrandsMetadata;
