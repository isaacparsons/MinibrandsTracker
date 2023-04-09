import { useMutation } from '@apollo/client';

import { MutationSaveMiniBrandsMetaDataArgs } from '../../../__generated__/graphql';
import useMutationAlert from '../../../common/hooks/useMutationAlert';
import {
  GET_MINIBRANDS_METADATA,
  SAVE_MINIBRANDS_METADATA
} from 'graphql/miniBrands';

const useSaveMinibrandsMetadata = () => {
  const [saveMinibrandsMetadata, { data, error, loading }] = useMutation(
    SAVE_MINIBRANDS_METADATA,
    {
      refetchQueries: [GET_MINIBRANDS_METADATA]
    }
  );
  useMutationAlert({
    successMsg: 'Saved minibrands metadata!',
    errorMsg: 'Unable to save minibrands metadata',
    data,
    error
  });

  const onSaveMinibrandsMetadata = (
    variables: MutationSaveMiniBrandsMetaDataArgs
  ) => {
    saveMinibrandsMetadata({
      variables
    });
  };

  return {
    saveMinibrandsMetadata: onSaveMinibrandsMetadata,
    loading
  };
};

export default useSaveMinibrandsMetadata;
