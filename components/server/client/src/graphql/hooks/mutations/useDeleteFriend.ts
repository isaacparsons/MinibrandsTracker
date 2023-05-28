import { useMutation } from '@apollo/client';
import useMutationAlert from 'common/hooks/useMutationAlert';
import { MutationDeleteFriendArgs } from '__generated__/graphql';
import { DELETE_FRIEND, GET_FRIENDS } from 'graphql/friends';

const useDeleteFriend = () => {
  const [deleteFriend, { data, error, loading }] = useMutation(DELETE_FRIEND, {
    refetchQueries: [GET_FRIENDS]
  });
  useMutationAlert({
    successMsg: 'Friend removed!',
    errorMsg: 'Unable to remove fried',
    data,
    error
  });
  const onDeleteFriend = (variables: MutationDeleteFriendArgs) => {
    deleteFriend({
      variables
    });
  };
  return {
    deleteFriend: onDeleteFriend,
    loading
  };
};

export default useDeleteFriend;
