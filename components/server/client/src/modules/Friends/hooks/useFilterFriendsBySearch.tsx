import { doesContainSubstring } from 'common/utils/doesContainSubstring';
import { FriendRequest } from '../../../__generated__/graphql';

const useFilterFriendsBySearch = (
  friends: FriendRequest[] | undefined,
  text: string
) => {
  if (!friends) {
    return [];
  }
  if (!text) {
    return friends;
  }
  return friends.filter((friend) => {
    if (!friend.receiver?.username || !friend.sender?.username) {
      return false;
    }
    return (
      doesContainSubstring(friend.receiver.username, text) ||
      doesContainSubstring(friend.sender.username, text)
    );
  });
};

export default useFilterFriendsBySearch;
