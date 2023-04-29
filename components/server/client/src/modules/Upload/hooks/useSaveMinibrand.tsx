import { useMutation } from '@apollo/client';
import { MutationSaveMiniBrandArgs } from '../../../__generated__/graphql';
import useMutationAlert from '../../../common/hooks/useMutationAlert';
import { GET_MINIBRANDS, SAVE_MINIBRAND } from '../../../graphql/miniBrands';

const useSaveMinibrand = () => {
  const [saveMinibrand, { data, error, loading }] = useMutation(
    SAVE_MINIBRAND,
    {
      refetchQueries: [GET_MINIBRANDS]
    }
  );
  useMutationAlert({
    successMsg: 'Saved minibrand!',
    errorMsg: 'Unable to save minibrand',
    data,
    error
  });
  const onSaveMinibrand = (variables: MutationSaveMiniBrandArgs) => {
    saveMinibrand({
      variables
    });
  };
  return {
    saveMinibrand: onSaveMinibrand,
    loading
  };
};

export default useSaveMinibrand;
