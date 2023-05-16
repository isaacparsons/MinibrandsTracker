import FriendsService from "../services/FriendsService";
import FriendsRepository from "../db/friends";
import { Resolvers } from "../generated/graphql";

const FriendsResolver: Resolvers = {
  Query: {
    getFriends: async (parent, args, context) => {
      if (!context.user) {
        throw new Error("User does not exist");
      }
      const friendsRepository = new FriendsRepository(context.db);
      const friendsService = new FriendsService(friendsRepository);
      return friendsService.getFriends(context.user.id);
    }
  },
  Mutation: {
    createFriendRequest: async (parent, args, context) => {
      const { userId } = args;
      if (!context.user) {
        throw new Error("User does not exist");
      }
      const friendsRepository = new FriendsRepository(context.db);
      const friendsService = new FriendsService(friendsRepository);
      return friendsService.createFriendRequest(context.user.id, userId);
    },
    updateFriendRequest: async (parent, args, context) => {
      const { senderId, status } = args;
      if (!context.user) {
        throw new Error("User does not exist");
      }
      const friendsRepository = new FriendsRepository(context.db);
      const friendsService = new FriendsService(friendsRepository);
      return friendsService.updateFriendRequest(senderId, context.user.id, status);
    },
    deleteFriend: async (parent, args, context) => {
      const { friendRequestId } = args;
      if (!context.user) {
        throw new Error("User does not exist");
      }
      const friendsRepository = new FriendsRepository(context.db);
      const friendsService = new FriendsService(friendsRepository);
      return friendsService.deleteFriend(friendRequestId, context.user.id);
    }
  }
};

export default FriendsResolver;
