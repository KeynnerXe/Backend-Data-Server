import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller.js";
import { ensureAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Crear nueva tarea (usuario autenticado)
router.post("/tasks", ensureAuth, createTask);

// Obtener todas las tareas del usuario autenticado
router.get("/tasks", ensureAuth, getTasks);

export default router;
