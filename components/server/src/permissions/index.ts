import { chain, race, shield } from "graphql-shield";
import { isAuthenticated } from "./rules";

export const permissions = shield(
  {
    // Query: {
    //   getOrganizations: isAuthenticated
    // },
    // Mutation: {
    //   deleteUser: isAuthenticated
    // }
  },
  { allowExternalErrors: true }
);
