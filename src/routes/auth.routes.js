import { Router } from "express";
import { register, login, profile, promoteToAdmin, getRole } from "../controllers/auth.controller.js";

// Middleware opcional de autenticación (ej. JWT / Passport)
import { ensureAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Registro
router.post("/register", register);

// Login
router.post("/login", login);

// Perfil (requiere estar autenticado)
router.get("/profile", ensureAuth, profile);

// Ascender a administrador (requiere autenticación)
router.post("/promote-admin", ensureAuth, promoteToAdmin);

// Consultar rol actual (requiere autenticación)
router.get("/role", ensureAuth, getRole);

export default router;
