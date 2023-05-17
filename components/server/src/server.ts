import { readFileSync } from "fs";
import { resolvers } from "./graphql/resolver";
import passport from "passport";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import responseCachePlugin from "@apollo/server-plugin-response-cache";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import RedisStore from "connect-redis";
import type { RedisClientType } from "redis";
import { createClient } from "redis";
import Keyv from "keyv";
import { KeyvAdapter } from "@apollo/utils.keyvadapter";

import { dbMiddleware } from "./middleware/dbMiddleware";
import googleAuthMiddleware from "./middleware/googleAuthMiddleware";
import { UserWithAuth } from "./db/user";
import localAuthMiddleware from "./middleware/localAuthMiddleware";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import authRoutes from "./middleware/authRoutes";
import { sessionMiddleware } from "./session";
import { loggingMiddleware } from "./middleware/loggingMiddleware";

const typeDefs = readFileSync("src/graphql/schema.graphql", {
  encoding: "utf-8"
});

const app = express();

export const cacheClient: RedisClientType = createClient({
  url: process.env.REDIS_URL
});

export const startServer = async () => {
  await cacheClient.connect();
  const redisStore = new RedisStore({
    client: cacheClient,
    prefix: "minibrands-tracker"
  });
  app.use(
    cors<cors.CorsRequest>({
      origin: [
        process.env.CLIENT_URL as string,
        "https://api.minibrandstracker.com",
        "https://minibrandstracker.com",
        "https://studio.apollographql.com",
        "https://accounts.google.com",
        "http://localhost:4000"
      ],
      credentials: true
    })
  );

  app.get("/", (req, res) => {
    res.send("Success");
  });
  app.use(express.json());
  app.use(cookieParser());
  app.use(sessionMiddleware(redisStore));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(dbMiddleware);
  app.use(loggingMiddleware);
  app.use(googleAuthMiddleware(app));
  app.use(localAuthMiddleware(app));
  authRoutes(app);

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // cache: new KeyvAdapter(new Keyv(process.env.REDIS_URL)),
    plugins: [
      // ApolloServerPluginCacheControl({
      //   defaultMaxAge: 1,
      //   calculateHttpHeaders: false
      // }),
      // responseCachePlugin({
      //   sessionId: (requestContext) => {
      //     const context = requestContext.contextValue as any;
      //     return context.sessionId;
      //   }
      // }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({
        embed: true,
        includeCookies: true
      })
    ]
  });
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        return {
          sessionId: req.sessionID,
          db: req.prisma,
          user: req.user as UserWithAuth,
          logger: req.logger
        };
      }
    })
  );
  return await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
};

passport.serializeUser(function (user: UserWithAuth, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user: UserWithAuth, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
