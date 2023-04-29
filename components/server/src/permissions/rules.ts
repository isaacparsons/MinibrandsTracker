import { rule } from "graphql-shield";
import { Context } from "../context";

export const isAuthenticated = rule()(async (parent, args, ctx: Context) => {
  if (!ctx.user) {
    return new Error("Missing access token");
  }
  return true;
});

export const isGroupAdmin = rule()(async (parent, args, ctx: Context) => {
  // return true or false, if you want to throw an error you should return
  // the error eg: return new Error("Evacuation event does not exist");
  return true;
});
