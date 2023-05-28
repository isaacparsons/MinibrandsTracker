import { useMutation } from '@apollo/client';
import {
  COLLECT_MINIBRAND,
  UPDATE_COLLECTED_MINIBRAND
} from 'graphql/miniBrands';
import useMutationAlert from 'common/hooks/useMutationAlert';
import { MutationCollectMinibrandArgs } from '__generated__/graphql';
import { GET_ME } from 'graphql/user';

const useUpdateCollectedMinibrand = () => {
  const [updateCollectedMinibrand, { data, error, loading }] = useMutation(
    UPDATE_COLLECTED_MINIBRAND,
    {
      refetchQueries: [GET_ME]
    }
  );
  useMutationAlert({
    successMsg: 'Minibrand updated!',
    errorMsg: 'Unable to update collected minibrand',
    data,
    error
  });
  const onUpdateCollectedMinibrand = (
    variables: MutationCollectMinibrandArgs
  ) => {
    updateCollectedMinibrand({
      variables
    });
  };
  return {
    updateCollectedMinibrand: onUpdateCollectedMinibrand,
    loading
  };
};

export default useUpdateCollectedMinibrand;
