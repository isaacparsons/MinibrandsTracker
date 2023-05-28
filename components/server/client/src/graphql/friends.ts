import { gql } from '../__generated__/gql';

export const GET_FRIENDS = gql(/* GraphQL */ `
  query GetFriends {
    getFriends {
      requests {
        id
        receiverId
        senderId
        status
        sender {
          username
          role
          id
        }
        receiver {
          id
          role
          username
        }
      }
      friends {
        id
        receiver {
          username
          id
          role
        }
        receiverId
        sender {
          username
          id
          role
        }
        senderId
        status
      }
    }
  }
`);

export const CREATE_FRIEND_REQUEST = gql(/* GraphQL */ `
  mutation CreateFriendRequest($userId: Int!) {
    createFriendRequest(userId: $userId) {
      receiverId
      senderId
      status
    }
  }
`);

export const UPDATE_FRIEND_REQUEST = gql(/* GraphQL */ `
  mutation UpdateFriendRequest($senderId: Int!, $status: FriendRequestStatus!) {
    updateFriendRequest(senderId: $senderId, status: $status) {
      receiverId
      senderId
      status
    }
  }
`);

export const DELETE_FRIEND = gql(/* GraphQL */ `
  mutation DeleteFriend($friendRequestId: Int!) {
    deleteFriend(friendRequestId: $friendRequestId) {
      receiverId
      senderId
    }
  }
`);
