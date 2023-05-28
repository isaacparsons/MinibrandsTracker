import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserRepository from "../db/user";
import * as bcrypt from "bcryptjs";
import LocalAuthRepository from "../db/localAuth";
import { RequestError } from "../util/errors";
import { Express } from "express";

const initializePassport = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(
    new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async function (
      req,
      username,
      password,
      done
    ) {
      const userRepository = new UserRepository(req.prisma);
      const localAuthRepository = new LocalAuthRepository(req.prisma);
      const existingLocalAuth = await localAuthRepository.getByEmail(username);

      if (!existingLocalAuth) {
        return done(new Error("User does not exist with this email"));
      }
      const valid = await bcrypt.compare(password, existingLocalAuth.passwordHash);
      if (!valid) {
        return done(new RequestError("Incorrect password"));
      }
      const existingUser = await userRepository.getAuthInfoById(existingLocalAuth.userId);
      if (!existingUser) {
        return done(new Error("User does not exist"));
      }
      return done(null, existingUser);
    })
  );
  return passport;
};
export default initializePassport;
