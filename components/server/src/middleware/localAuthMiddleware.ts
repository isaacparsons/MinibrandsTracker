import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import UserRepository from "../db/user";
import * as bcrypt from "bcryptjs";
import LocalAuthRepository from "../db/localAuth";
import { NotFoundError, RequestError } from "../util/errors";
import { SuccessResponse } from "../util/response";

const localAuthMiddleware = (app: Express) => {
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
        return done(new NotFoundError("User does not exist with this email"));
      }
      const valid = await bcrypt.compare(password, existingLocalAuth.passwordHash);
      if (!valid) {
        return done(new RequestError("Incorrect password"));
      }
      const existingUser = await userRepository.getAuthInfoById(existingLocalAuth.userId);
      if (!existingUser) {
        return done(new NotFoundError("User does not exist"));
      }
      return done(null, existingUser);
    })
  );

  app.post(
    "/auth/signup",
    async function (req, res, next) {
      const { email, password } = req.body;
      const userRepository = new UserRepository(req.prisma);
      const localAuthRepository = new LocalAuthRepository(req.prisma);
      const passwordHash = await bcrypt.hash(password, 10);
      const existinglocalAuth = await localAuthRepository.getByEmail(email);
      if (existinglocalAuth) {
        return next(new RequestError("User with this email already exists"));
      }
      const user = await userRepository.create(email);
      await localAuthRepository.create({
        userId: user.id,
        email,
        passwordHash
      });
      next();
    },
    passport.authenticate("local", { failureRedirect: "/auth/login" }),
    async function (req, res) {
      return SuccessResponse(res, "success");
    }
  );

  app.post("/auth/login", async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        return next(err);
      }
      return SuccessResponse(res, "success");
    })(req, res, next);
  });
};

export default localAuthMiddleware;
