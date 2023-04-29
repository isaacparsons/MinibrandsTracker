import { Resolvers } from "../generated/graphql";
import UserRepository from "../db/user";
import * as bcrypt from "bcryptjs";

import { exclude } from "../util/db";
import { User, Prisma } from "@prisma/client";
import TokenService from "../services/TokenService";

const tokenService = new TokenService();

const AuthResolver: Resolvers = {
  // Query: {},
  // Mutation: {
  // login: async (parent, args, context) => {
  //   const { password, email } = args;
  //   const userRepository = new UserRepository(context.db);
  //   const user = await userRepository.getUserByEmail({ email });
  //   if (!user) {
  //     throw new Error(`No user found with email: ${email}`);
  //   }
  //   if (!user.accountCreated) {
  //     throw new Error(`Account has not been setup, go to signup to complete`);
  //   }
  //   const valid = await bcrypt.compare(password, user.passwordHash);
  //   if (!valid) {
  //     throw new Error("Password is incorrect");
  //   }
  //   const userWithoutPassword = exclude<User, "passwordHash">(user, "passwordHash");
  //   const token = tokenService.createAccessToken(user.id);
  //   const refreshToken = tokenService.createRefreshToken(user.id);
  //   return {
  //     token,
  //     refreshToken,
  //     user: userWithoutPassword
  //   };
  // }
  // }
};

export default AuthResolver;
