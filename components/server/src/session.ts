import session from "express-session";
import RedisStore from "connect-redis";

export const sessionMiddleware = () => {
  return session({
    name: "id",
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  });
};
