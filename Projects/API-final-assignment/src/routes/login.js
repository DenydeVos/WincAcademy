import express from "express";
import jwt from "jsonwebtoken";
import { findUserForLogin } from "../services/usersService.js";
import { findHostForLogin } from "../services/hostsService.js";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await findUserForLogin(username);
    if (user && user.password === password) {
      const token = jwt.sign({ sub: user.id, role: "user" }, process.env.AUTH_SECRET_KEY, {
        expiresIn: "2h",
      });
      return res.status(200).json({ token });
    }

    const host = await findHostForLogin(username);
    if (host && host.password === password) {
      const token = jwt.sign({ sub: host.id, role: "host" }, process.env.AUTH_SECRET_KEY, {
        expiresIn: "2h",
      });
      return res.status(200).json({ token });
    }

    return res.status(401).json({ message: "Invalid credentials" });
  } catch (e) {
    return next(e);
  }
});
