import { FriendRequest, User } from '__generated__/graphql';
import { useMemo } from 'react';

const useFilterByNotFriended = (
  me: User | undefined,
  friends: FriendRequest[] | undefined,
  users: User[] | undefined
) => {
  return useMemo(() => {
    const set = new Set();
    if (!users) {
      return [];
    }
    if (!friends) {
      return users;
    }
    for (let friend of friends) {
      const user =
        friend.sender?.username === me?.username
          ? friend.receiver
          : friend.sender;

      if (user?.username && !set.has(user?.username)) {
        set.add(user.username);
      }
    }
    return users.filter((user) => !set?.has(user.username));
  }, [me?.username, friends, users]);
};

export default useFilterByNotFriended;
