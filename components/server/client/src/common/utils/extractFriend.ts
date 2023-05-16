import { FriendRequest, User } from '__generated__/graphql';

const extractFriend = (me: User, friendRequest: FriendRequest) => {
  const meId = me?.id;
  if (!meId) {
    return null;
  }
  return friendRequest.receiverId === meId
    ? friendRequest.sender
    : friendRequest.receiver;
};

export default extractFriend;
