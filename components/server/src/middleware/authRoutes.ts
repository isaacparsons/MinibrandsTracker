import authMiddleware from "./authMiddleware";
import { Express } from "express";

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

  app.get("/session/authenticated", authMiddleware, function (req, res) {
    res.status(200).json({
      status: "session is valid"
    });
  });
};

export default authRoutes;
