import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express, Request, Response, NextFunction } from "express";
import UserRepository from "../db/user";
import * as bcrypt from "bcryptjs";
import LocalAuthRepository from "../db/localAuth";

const localAuthMiddleware = (app: Express) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    passport.use(
      new LocalStrategy({ usernameField: "email" }, async function (username, password, done) {
        const userRepository = new UserRepository(req.prisma);
        const localAuthRepository = new LocalAuthRepository(req.prisma);
        const existingLocalAuth = await localAuthRepository.getByEmail(username);

        if (!existingLocalAuth) {
          return done(new Error("User does not exist with this email"));
        }
        const valid = await bcrypt.compare(password, existingLocalAuth.passwordHash);
        if (!valid) {
          return done(new Error("Incorrect password"));
        }
        const existingUser = await userRepository.getAuthInfoById(existingLocalAuth.userId);
        if (!existingUser) {
          return done(new Error("User does not exist"));
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
          // throw new Error("User with this email already exists");
          return res.status(400).json({
            error: "User with this email already exists"
          });
        }
        const user = await userRepository.create();
        await localAuthRepository.create({
          userId: user.id,
          email,
          passwordHash
        });
        next();
      },
      passport.authenticate("local", { failureRedirect: "/auth/login" }),
      async function (req, res) {
        res.send("success");
      }
    );

    app.post(
      "/auth/login",
      passport.authenticate("local", {
        failureRedirect: "/auth/signup"
      }),
      function (req, res) {
        res.send("success");
      }
    );
    next();
  };
};

export default localAuthMiddleware;
