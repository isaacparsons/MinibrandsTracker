import { useMutation } from '@apollo/client';
import { MutationUpdateMiniBrandArgs } from '__generated__/graphql';
import useMutationAlert from 'common/hooks/useMutationAlert';
import { GET_MINIBRANDS, UPDATE_MINIBRAND } from 'graphql/miniBrands';

const useUpdateMinibrand = (onMinibrandUpdated: () => void) => {
  const [updateMinibrand, { data, error, loading }] = useMutation(
    UPDATE_MINIBRAND,
    {
      onCompleted: () => onMinibrandUpdated(),
      refetchQueries: [GET_MINIBRANDS]
    }
  );

  useMutationAlert({
    successMsg: 'Minibrand updated!',
    errorMsg: 'Unable to update minibrand',
    data,
    error
  });

  const onUpdateMinibrand = (variables: MutationUpdateMiniBrandArgs) => {
    updateMinibrand({
      variables
    });
  };
  return {
    updateMinibrand: onUpdateMinibrand,
    loading
  };
};

export default useUpdateMinibrand;
