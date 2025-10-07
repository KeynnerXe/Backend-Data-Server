import { Router } from "express";
import { getProviders } from "../controllers/provider.controller.js";
import { ensureAuth, authorize } from "../middlewares/auth.middleware.js";

const router = Router();

// Obtener lista de proveedores (solo ADMIN)
router.get("/providers", ensureAuth, authorize("ADMIN"), getProviders);

export default router;
