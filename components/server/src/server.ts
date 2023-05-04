import { readFileSync } from "fs";
import { resolvers } from "./graphql/resolver";
import passport from "passport";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";

import { dbMiddleware } from "./middleware/dbMiddleware";
import googleAuthMiddleware from "./middleware/googleAuthMiddleware";
import { UserWithAuth } from "./db/user";
import localAuthMiddleware from "./middleware/localAuthMiddleware";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import authRoutes from "./middleware/authRoutes";

const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? (process.env.CLIENT_URL as string)
    : "http://localhost:3000";

const typeDefs = readFileSync("src/graphql/schema.graphql", {
  encoding: "utf-8"
});

const app = express();
app.use(
  cors<cors.CorsRequest>({
    origin: [
      CLIENT_URL,
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
app.use(
  session({
    name: "id",
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(dbMiddleware);
app.use(googleAuthMiddleware(app));
app.use(localAuthMiddleware(app));
authRoutes(app);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({
      embed: true,
      includeCookies: true // very important
    })
  ]
});
export const startServer = async () => {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        return { db: req.prisma, user: req.user as UserWithAuth };
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
