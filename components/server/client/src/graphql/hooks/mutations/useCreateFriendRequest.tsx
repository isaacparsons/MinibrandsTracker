import { useMutation } from '@apollo/client';
import { CreateFriendRequestMutationVariables } from '__generated__/graphql';
import useMutationAlert from 'common/hooks/useMutationAlert';
import { CREATE_FRIEND_REQUEST, GET_FRIENDS } from 'graphql/friends';
import { SEARCH_USERS } from 'graphql/user';

const useCreateFriendRequest = (onCompleted: () => void) => {
  const [createFriendRequest, { data, loading, error }] = useMutation(
    CREATE_FRIEND_REQUEST,
    {
      refetchQueries: [GET_FRIENDS, SEARCH_USERS],
      onCompleted: () => onCompleted()
    }
  );

  const onCreateFriendRequest = (
    variables: CreateFriendRequestMutationVariables
  ) => {
    createFriendRequest({ variables });
  };

  useMutationAlert({
    successMsg: 'Friend request sent!',
    errorMsg: error?.message ?? 'unable to send friend request',
    data,
    error
  });

  return {
    createFriendRequest: onCreateFriendRequest,
    data,
    loading,
    error
  };
};
export default useCreateFriendRequest;
