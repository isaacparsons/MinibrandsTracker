import { useMutation } from '@apollo/client';
import { UpdateFriendRequestMutationVariables } from '__generated__/graphql';
import useMutationAlert from 'common/hooks/useMutationAlert';
import { GET_FRIENDS, UPDATE_FRIEND_REQUEST } from 'graphql/friends';

const useUpdateFriendRequest = () => {
  const [updateFriendRequest, { data, loading, error }] = useMutation(
    UPDATE_FRIEND_REQUEST,
    {
      refetchQueries: [GET_FRIENDS]
    }
  );

  const onUpdateFriendRequest = (
    variables: UpdateFriendRequestMutationVariables
  ) => {
    updateFriendRequest({ variables });
  };

  useMutationAlert({
    successMsg: 'Friend request updated!',
    errorMsg: 'Unable to update friend request',
    data,
    error
  });

  return {
    updateFriendRequest: onUpdateFriendRequest,
    data,
    loading,
    error
  };
};

export default useUpdateFriendRequest;
