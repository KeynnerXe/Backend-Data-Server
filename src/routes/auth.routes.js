import express from "express";
import passport from "passport";
import { register, profile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login exitoso", user: req.user });
});

router.get("/profile", profile);

export default router;
