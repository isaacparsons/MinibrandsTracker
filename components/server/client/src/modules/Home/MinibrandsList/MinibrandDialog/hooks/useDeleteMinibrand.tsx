import { useMutation } from '@apollo/client';
import { DELETE_MINIBRAND } from 'graphql/miniBrands';
import { GET_MINIBRANDS } from 'graphql/miniBrands';
import useMutationAlert from 'common/hooks/useMutationAlert';
import { MutationDeleteMiniBrandArgs } from '__generated__/graphql';

const useDeleteMinibrand = () => {
  const [deleteMiniBrand, { data, error, loading }] = useMutation(
    DELETE_MINIBRAND,
    {
      refetchQueries: [GET_MINIBRANDS]
    }
  );
  useMutationAlert({
    successMsg: 'Delete minibrand!',
    errorMsg: 'Unable to delete minibrand',
    data,
    error
  });
  const onDeleteMiniBrand = (variables: MutationDeleteMiniBrandArgs) => {
    deleteMiniBrand({
      variables
    });
  };
  return {
    deleteMiniBrand: onDeleteMiniBrand,
    loading
  };
};

export default useDeleteMinibrand;
