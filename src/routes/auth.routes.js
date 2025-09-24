import { Router } from "express";
import { register, login, profile } from "../controllers/auth.controller.js";

// Middleware opcional de autenticación (ej. JWT / Passport)
import { ensureAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Registro
router.post("/register", register);

// Login
router.post("/login", login);

// Perfil (requiere estar autenticado)
router.get("/profile", ensureAuth, profile);

export default router;
