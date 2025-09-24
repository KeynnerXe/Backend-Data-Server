import express from "express";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// Para reemplazar __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Rutas
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import dataRoutes from "./routes/data.routes.js";

const app = express();

// Middleware CORS
app.use(cors({ origin: true, credentials: true }));

// Middleware JSON
app.use(express.json());

// Archivos estáticos
app.use(
  express.static(path.join(__dirname, "../public"), { acceptRanges: false })
);

// Rutas
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/api/data", dataRoutes);
app.use("/dashboard", dashboardRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando 🚀" });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Error interno del servidor",
    details: err.message,
  });
});

// Export para Vercel
export default app;
export const handler = (req, res) => app(req, res);
