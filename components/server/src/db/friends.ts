import { FriendRequestStatus, PrismaClient } from "@prisma/client";
import doesAlreadyExistError from "../util/doesAlreadyExistError";

export default class FriendsRepository {
  db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  getFriendRequest = async (senderId: number, receiverId: number) => {
    return this.db.friendRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId
        }
      }
    });
  };

  getFriendRequestById = async (id: number) => {
    return this.db.friendRequest.findUnique({
      where: {
        id
      }
    });
  };

  createFriendRequest = async (senderId: number, receiverId: number) => {
    try {
      return await this.db.friendRequest.create({
        data: {
          senderId,
          receiverId,
          status: FriendRequestStatus.Pending
        }
      });
    } catch (error) {
      if (doesAlreadyExistError(error)) {
        throw new Error("A friend request has already been sent!");
      }
      throw error;
    }
  };

  updateFriendRequest = async (
    senderId: number,
    receiverId: number,
    status: FriendRequestStatus
  ) => {
    return this.db.friendRequest.update({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId
        }
      },
      data: {
        status
      }
    });
  };

  deleteFriend = async (friendRequestId: number) => {
    return this.db.friendRequest.delete({
      where: {
        id: friendRequestId
      }
    });
  };

  getAcceptedFriendRequest = async (userId: number, friendId: number) => {
    const existingFriendship = await this.db.friendRequest.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            receiverId: friendId
          },
          {
            senderId: friendId,
            receiverId: userId
          }
        ],
        status: FriendRequestStatus.Accepted
      }
    });
    if (existingFriendship.length === 0) {
      return null;
    }
    return existingFriendship[0];
  };

  getAcceptedFriends = async (userId: number) => {
    return this.db.friendRequest.findMany({
      where: {
        OR: [
          {
            senderId: userId
          },
          {
            receiverId: userId
          }
        ],
        status: FriendRequestStatus.Accepted
      },
      include: {
        receiver: true,
        sender: true
      }
    });
  };

  getFriendRequests = async (userId: number) => {
    return this.db.friendRequest.findMany({
      where: {
        receiverId: userId,
        status: FriendRequestStatus.Pending
      },
      include: {
        receiver: true,
        sender: true
      }
    });
  };
}
