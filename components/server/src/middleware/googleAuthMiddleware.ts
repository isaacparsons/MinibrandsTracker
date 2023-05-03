import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express, Request, Response, NextFunction } from "express";
import GoogleAuthRepository from "../db/googleAuth";
import UserRepository, { UserWithAuth } from "../db/user";

const SERVER_URL = "http://localhost:4000";

const googleAuthMiddleware = (app: Express) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: `${SERVER_URL}/auth/google/callback`
        },
        async function (accessToken, refreshToken, profile, cb) {
          const email = profile.emails![0].value;
          const id = profile.id;

          if (!email) {
            return cb(new Error("Invalid email address"));
          }
          const googleAuthRepository = new GoogleAuthRepository(req.prisma);
          const userRepository = new UserRepository(req.prisma);
          const exisitingGoogleAuth = await googleAuthRepository.getById(id);
          let user: UserWithAuth;
          if (!exisitingGoogleAuth) {
            user = await userRepository.create();
            await googleAuthRepository.create({
              id,
              email,
              userId: user.id
            });
          }
          if (exisitingGoogleAuth) {
            const existingUser = await userRepository.getAuthInfoById(exisitingGoogleAuth.userId);
            if (!existingUser) {
              return cb(new Error("User does not exist"));
            }
            user = existingUser;
          }

          return cb(null, user!);
        }
      )
    );
    app.get(
      "/auth/google",
      passport.authenticate("google", {
        failureRedirect: "/login",
        scope: ["profile", "email"]
      })
    );

    app.get(
      "/auth/google/callback",
      passport.authenticate("google", { failureRedirect: "/login" }),
      function (req, res) {
        res.redirect("http://localhost:3000/login_success");
      }
    );
    next();
  };
};

export default googleAuthMiddleware;