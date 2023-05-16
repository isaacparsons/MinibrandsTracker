import session from "express-session";
import RedisStore from "connect-redis";

export const sessionMiddleware = (redisStore: RedisStore) => {
  return session({
    store: redisStore,
    name: "id",
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  });
};
