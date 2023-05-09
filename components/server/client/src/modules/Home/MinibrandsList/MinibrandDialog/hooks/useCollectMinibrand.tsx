import { useMutation } from '@apollo/client';
import { COLLECT_MINIBRAND } from 'graphql/miniBrands';
import useMutationAlert from 'common/hooks/useMutationAlert';
import { MutationCollectMinibrandArgs } from '__generated__/graphql';
import { GET_ACHIEVEMENTS, GET_ME } from 'graphql/user';

const useCollectMinibrand = (onMinibrandCollected: () => void) => {
  const [collectMinibrand, { data, error, loading }] = useMutation(
    COLLECT_MINIBRAND,
    {
      onCompleted: () => onMinibrandCollected(),
      refetchQueries: [GET_ME, GET_ACHIEVEMENTS]
    }
  );
  useMutationAlert({
    successMsg: 'Minibrand collected!',
    errorMsg: 'Unable to collect minibrand',
    data,
    error
  });
  const onCollectMinibrand = (variables: MutationCollectMinibrandArgs) => {
    collectMinibrand({
      variables
    });
  };
  return {
    collectMinibrand: onCollectMinibrand,
    loading
  };
};

export default useCollectMinibrand;
