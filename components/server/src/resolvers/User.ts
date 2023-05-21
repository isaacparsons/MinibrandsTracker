import UserService from "../services/UserService";
import UserRepository from "../db/user";
import { Resolvers } from "../generated/graphql";
import MiniBrandsRepository from "../db/minibrands";
import FriendsRepository from "../db/friends";

const UserResolver: Resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      const userRepository = new UserRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const minibrandsRepository = new MiniBrandsRepository(context.db);
      const userService = new UserService(userRepository, minibrandsRepository, friendsRepository);
      if (!context.user) {
        throw new Error("User does not exist");
      }
      const basicUserInfo = await userService.getBasicInfoById(context.user.id);
      if (!basicUserInfo) {
        throw new Error("User does not exist");
      }
      return basicUserInfo;
    },
    getMyAchievements: async (parent, args, context) => {
      const userRepository = new UserRepository(context.db);
      const minibrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const userService = new UserService(userRepository, minibrandsRepository, friendsRepository);
      if (!context.user) {
        throw new Error("User does not exist");
      }
      return userService.getAchievementsByUserId(context.user.id);
    },
    getAchievements: async (parent, args, context) => {
      const { userId } = args;
      const userRepository = new UserRepository(context.db);
      const minibrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const userService = new UserService(userRepository, minibrandsRepository, friendsRepository);
      if (!context.user) {
        throw new Error("User does not exist");
      }
      return userService.getAchievementsForUser(context.user.id, userId);
    },
    searchUsers: async (parent, args, context) => {
      const { query, cursor } = args;
      const userRepository = new UserRepository(context.db);
      const minibrandsRepository = new MiniBrandsRepository(context.db);
      const friendsRepository = new FriendsRepository(context.db);
      const userService = new UserService(userRepository, minibrandsRepository, friendsRepository);
      return userService.searchUsers(query, cursor);
    }
  }
};

export default UserResolver;
