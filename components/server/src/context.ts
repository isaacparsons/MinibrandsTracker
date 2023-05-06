import { User } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended";
import logger, { mockLogger } from "./config/logger";
import TokenService from "./services/TokenService";
import { AuthenticationError, NotFoundError } from "./util/errors";
import { UserWithAuth } from "./db/user";
import RedisCache from "./redisCache";

export interface Context {
  db: PrismaClient;
  cache: RedisCache;
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
