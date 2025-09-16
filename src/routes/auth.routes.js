const express = require("express");
const passport = require("passport");
const { register, profile } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", register);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login exitoso", user: req.user });
});

router.get("/profile", profile);

module.exports = router;
