import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import logger, { mockLogger } from "./config/logger";
import TokenService from "./services/TokenService";
import { AuthenticationError, NotFoundError } from "./util/errors";
import { UserWithAuth } from "./db/user";

export interface Context {
  db: PrismaClient;
  user?: UserWithAuth;
  // log: any;
}

export type MockContext = {
  db: DeepMockProxy<PrismaClient>;
  log: any;
  user?: User;
};

export const createMockContext = (): MockContext => {
  return {
    db: mockDeep<PrismaClient>(),
    log: mockLogger
  };
};

export const auth = async ({ req }) => {
  // let log = logger("Minibrand tracker App");
  // const result: Context = { db: req.prisma, log };
  // if (req?.headers?.authorization) {
  //   const token = req.headers.authorization.replace("Bearer ", "");
  //   try {
  //     const { userId } = tokenService.verifyAccessToken(token);
  //     const user = await result.db.user.findUnique({
  //       where: { id: userId }
  //     });
  //     if (!user) {
  //       throw NotFoundError("User does not exist");
  //     }
  //     log = logger("Minibrand tracker App", { userId: user.id });
  //     result.user = user;
  //   } catch (error) {
  //     throw AuthenticationError("Invalid access token");
  //   }
  //   result.log = log;
  // }
  // return result;
};
