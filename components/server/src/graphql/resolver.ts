import AuthResolver from "../resolvers/Auth";

import { mergeResolvers } from "@graphql-tools/merge";
import { Resolvers } from "src/generated/graphql";

export const resolvers: Resolvers = mergeResolvers([
  AuthResolver,
]);
