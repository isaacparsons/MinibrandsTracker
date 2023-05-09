import UserService from "../services/UserService";
import UserRepository from "../db/user";
import { Resolvers } from "../generated/graphql";
import MiniBrandsRepository from "../db/minibrands";

const UserResolver: Resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      const userRepository = new UserRepository(context.db);
      const minibrandsRepository = new MiniBrandsRepository(context.db);
      const userService = new UserService(userRepository, minibrandsRepository);
      if (!context.user) {
        throw new Error("User does not exist");
      }
      const basicUserInfo = await userService.getBasicInfoById(context.user.id);
      if (!basicUserInfo) {
        throw new Error("User does not exist");
      }
      return basicUserInfo;
    },
    getAchievements: async (parent, args, context) => {
      const userRepository = new UserRepository(context.db);
      const minibrandsRepository = new MiniBrandsRepository(context.db);
      const userService = new UserService(userRepository, minibrandsRepository);
      if (!context.user) {
        throw new Error("User does not exist");
      }
      return await userService.getAchievementsByUserId(context.user.id);
    }
  }
};

export default UserResolver;
