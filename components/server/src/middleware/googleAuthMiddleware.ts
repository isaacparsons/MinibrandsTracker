import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Express } from "express";
import GoogleAuthRepository from "../db/googleAuth";
import UserRepository, { UserWithAuth } from "../db/user";
import { NotFoundError, RequestError } from "../util/errors";

const SERVER_URL = process.env.BACKEND_URL;

const googleAuthMiddleware = (app: Express) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: `${SERVER_URL}/auth/google/callback`,
        passReqToCallback: true
      },
      async function (req, accessToken, refreshToken, profile, done) {
        const email = profile.emails![0].value;
        const id = profile.id;

        if (!email) {
          return done(new RequestError("Invalid email address"));
        }
        const googleAuthRepository = new GoogleAuthRepository(req.prisma);
        const userRepository = new UserRepository(req.prisma);
        const exisitingGoogleAuth = await googleAuthRepository.getById(id);
        let user: UserWithAuth;
        if (!exisitingGoogleAuth) {
          user = await userRepository.create(email);
          await googleAuthRepository.create({
            id,
            email,
            userId: user.id
          });
        }
        if (exisitingGoogleAuth) {
          const existingUser = await userRepository.getAuthInfoById(exisitingGoogleAuth.userId);
          if (!existingUser) {
            return done(new NotFoundError("User does not exist"));
          }
          user = existingUser;
        }

        return done(null, user!);
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
      res.redirect(`${process.env.CLIENT_URL}/login_success`);
    }
  );
};

export default googleAuthMiddleware;
