import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
// Servir archivos estáticos de la carpeta public/icons para los iconos PNG
import path from "path";
app.use("/icons", express.static(path.resolve(process.cwd(), "public/icons")));
// Configuración CORS universal (desarrollo y producción)
const allowedOrigins = [
	"http://localhost:3000", // Desarrollo
	process.env.FRONTEND_URL // Producción (define esta variable en tu entorno)
];

app.use(cors({
	origin: function (origin, callback) {
		// Permite peticiones sin origen (por ejemplo, desde Postman)
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("No permitido por CORS"));
		}
	},
	credentials: true // Permite cookies/autenticación
}));

app.use(express.json());
// Rutas
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import dataRoutes from "./routes/data.routes.js";
import userRoutes from "./routes/user.routes.js";
import providerRoutes from "./routes/provider.routes.js";

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/api/data", dataRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api", userRoutes);
app.use("/api", providerRoutes);

app.get("/", (req, res) => {
	res.json({ status: "ok", message: "Servidor funcionando 🚀" });
});

// Middleware global para manejar errores y asegurar respuesta JSON
app.use((err, req, res, next) => {
	if (res.headersSent) return next(err);
	// Si el error es de CORS
	if (err.message && err.message.includes("CORS")) {
		return res.status(403).json({ error: "CORS no permitido" });
	}
	// Otros errores
	res.status(500).json({ error: err.message || "Error interno del servidor" });
});

// ✅ Export para Vercel y uso local
export default app;
export const handler = (req, res) => app(req, res);

// ✅ Solo escucha localmente si no estamos en producción
if (process.env.NODE_ENV !== "production") {
	const PORT = process.env.PORT || 4000;
	const HOST = "localhost";
	app.listen(PORT, HOST, () => {
		console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
	});
}