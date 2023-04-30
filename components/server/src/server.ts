import path from "path";
import { readFileSync } from "fs";
import { resolvers } from "./graphql/resolver";
import { permissions } from "./permissions/index";
import { GraphQLErrorsHandler } from "./plugins/error";
import { Context, auth } from "./context";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";

const typeDefs = readFileSync("src/graphql/schema.graphql", {
  encoding: "utf-8"
});

// let schema = makeExecutableSchema<Context>({
//   typeDefs,
//   resolvers
// });
// schema = applyMiddleware(schema, permissions);

const app = express();

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
// });

const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});
export const startServer = async () => {
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    //   {
    //   origin: [
    //     "http://localhost:3000",
    //     "https://minibrands-icon-bucket.s3.us-east-1.amazonaws.com",
    //     "https://studio.apollographql.com"
    //   ]
    // }
    json(),
    expressMiddleware(server, {
      context: auth
    })
  );
  return await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
};
