import authMiddleware from "./authMiddleware";
import { Express } from "express";
import UserRepository from "../db/user";
import TokenService from "../services/TokenService";
import EmailService, { EmailPayload } from "../services/EmailService";
import * as bcrypt from "bcryptjs";

const tokenService = new TokenService();
const emailService = new EmailService();

const authRoutes = (app: Express) => {
  app.get("/auth/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        throw err;
      }
      req.session.destroy(function (err) {
        if (err) {
          throw err;
        }
        res.send("success");
      });
    });
  });

  app.get("/auth/reset_password", async (req, res) => {
    const { email } = req.query;
    const userRepository = new UserRepository(req.prisma);

    if (!email) {
      return res.status(400).json({ error: "No email provided" });
    }
    const user = await userRepository.getLocalAuthByEmail(email as string);
    if (!user) {
      return res.status(404).json({ error: "No account exists with this email" });
    }
    const emailLink = `${
      process.env.CLIENT_URL
    }/change_password?token=${tokenService.createAccessToken(user.userId)}`;
    const emailPayload: EmailPayload = {
      subject: "Reset Password",
      message: "Click the link below to reset your password ",
      link: emailLink
    };
    await emailService.sendEmail({ email: user.email, payload: emailPayload });
    res.status(200).send({ response: "Password reset link sent" });
  });

  app.put("/auth/change_password", async (req, res) => {
    const { password, token } = req.body;
    const userRepository = new UserRepository(req.prisma);
    const { userId } = tokenService.verifyAccessToken(token);
    if (!token || !userId) {
      return res.status(400).json({ error: "invalid link" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const updatedUser = await userRepository.updateLocalPassword(userId, passwordHash);
    res.status(200).send({ response: "password updated" });
  });

  app.get("/session/authenticated", authMiddleware, function (req, res) {
    res.status(200).json({
      status: "session is valid"
    });
  });
};

export default authRoutes;
