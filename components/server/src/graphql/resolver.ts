import AuthResolver from "../resolvers/Auth";

import { mergeResolvers } from "@graphql-tools/merge";
import { Resolvers } from "../generated/graphql";
import MiniBrandsResolver from "../resolvers/MiniBrands";

export const resolvers: Resolvers = mergeResolvers([AuthResolver, MiniBrandsResolver]);
