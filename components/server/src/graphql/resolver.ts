import { mergeResolvers } from "@graphql-tools/merge";
import { Resolvers } from "../generated/graphql";
import MiniBrandsResolver from "../resolvers/MiniBrands";
import UserResolver from "../resolvers/User";

export const resolvers: Resolvers = mergeResolvers([UserResolver, MiniBrandsResolver]);
