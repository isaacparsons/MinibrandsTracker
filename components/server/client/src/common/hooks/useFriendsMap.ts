import { FriendRequest, Friends, User } from '__generated__/graphql';
import extractFriend from 'common/utils/extractFriend';
import { useMemo } from 'react';

const useFriendsMap = (me: User | undefined, friends: Friends | undefined) => {
  return useMemo(() => {
    const map = new Map<number, FriendRequest>();
    if (me && friends) {
      const allRequests = [...friends.friends, ...friends.requests];
      for (let request of allRequests) {
        const friend = extractFriend(me, request);
        if (friend?.id) {
          map.set(friend.id, request);
        }
      }
    }
    return map;
  }, [friends, me]);
};

export default useFriendsMap;
