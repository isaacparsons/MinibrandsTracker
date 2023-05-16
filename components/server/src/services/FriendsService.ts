import { FriendRequestStatus } from "@prisma/client";
import FriendsRepository from "../db/friends";

export default class FriendsService {
  friendsRepository: FriendsRepository;

  constructor(friendsRepository: FriendsRepository) {
    this.friendsRepository = friendsRepository;
  }

  getFriends = async (userId: number) => {
    const acceptedFriends = await this.friendsRepository.getAcceptedFriends(userId);
    const friendRequests = await this.friendsRepository.getFriendRequests(userId);
    return {
      requests: friendRequests,
      friends: acceptedFriends
    };
  };

  createFriendRequest = (senderId: number, receiverId: number) => {
    return this.friendsRepository.createFriendRequest(senderId, receiverId);
  };

  updateFriendRequest = async (
    senderId: number,
    receiverId: number,
    status: FriendRequestStatus
  ) => {
    const friendRequest = await this.friendsRepository.getFriendRequest(senderId, receiverId);
    if (!friendRequest) {
      throw new Error(`Friend request does not exist`);
    }
    if (friendRequest.status !== FriendRequestStatus.Pending) {
      throw new Error("Friend request status has already been updated");
    }
    return this.friendsRepository.updateFriendRequest(senderId, receiverId, status);
  };

  deleteFriend = async (friendRequestId: number, userId: number) => {
    const friendRequest = await this.friendsRepository.getFriendRequestById(friendRequestId);
    if (friendRequest?.receiverId !== userId && friendRequest?.senderId !== userId) {
      throw new Error(`user: ${userId} does not have a friendship with id: ${friendRequestId}`);
    }
    return this.friendsRepository.deleteFriend(friendRequestId);
  };
}
