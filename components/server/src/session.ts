import session from "express-session";
import RedisStore from "connect-redis";
import { redisCache } from "./server";

const redisStore = new RedisStore({
  client: redisCache.getClient(),
  prefix: "minibrands-tracker:"
});

export const sessionMiddleware = () => {
  return session({
    store: redisStore,
    name: "id",
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  });
};
