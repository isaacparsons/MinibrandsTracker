import session from "express-session";
import { createClient } from "redis";
import RedisStore from "connect-redis";

const redisClient = createClient({
  url: process.env.REDIS_URL
});
redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
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
