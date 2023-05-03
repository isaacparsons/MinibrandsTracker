import UserService from "../services/UserService";
import UserRepository from "../db/user";
import { Resolvers } from "../generated/graphql";

const UserResolver: Resolvers = {
  Query: {
    getMe: async (parent, args, context) => {
      const userRepository = new UserRepository(context.db);
      const userService = new UserService(userRepository);
      if (!context.user) {
        throw new Error("User does not exist");
      }
      const basicUserInfo = await userService.getBasicInfoById(context.user.id);
      if (!basicUserInfo) {
        throw new Error("User does not exist");
      }
      return basicUserInfo;
    }
  }
};

export default UserResolver;
