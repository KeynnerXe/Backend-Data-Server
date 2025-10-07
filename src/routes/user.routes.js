import { Router } from "express";
import { getUsers, getOwnUser, updateOwnUser } from "../controllers/user.controller.js";
import { ensureAuth, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Obtener todos los usuarios (solo ADMIN puede ver todos)
router.get("/users", ensureAuth, authorize("ADMIN"), getUsers);

// Ver propio usuario (USER, VIEWER, ADMIN)
router.get("/me", ensureAuth, authorize(["USER", "VIEWER", "ADMIN"]), getOwnUser);

// Modificar propio usuario (solo USER y ADMIN)
router.put("/me", ensureAuth, authorize(["USER", "ADMIN"]), updateOwnUser);

export default router;
