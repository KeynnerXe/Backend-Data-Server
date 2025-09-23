const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

// Config y rutas
const dashboardRoutes = require("./routes/dashboard.routes");
const configurePassport = require("./config/passport");
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const dataRoutes = require("./routes/data.routes");
const prisma = require("./config/prisma");

const app = express();

// Middleware CORS
app.use(cors({ origin: true, credentials: true }));

// Middleware JSON
app.use(express.json());

// Middleware sesión
app.use(
  session({
    secret: "mi_secreto",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// 👇 Middleware para evitar errores Range
app.use((req, res, next) => {
  res.setHeader("Accept-Ranges", "none");
  next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/api/data", dataRoutes);
app.use("/dashboard", dashboardRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("Servidor funcionando.");
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Error interno del servidor", details: err.message });
});
// Exportar app y handler para Vercel
module.exports = app;
module.exports.handler = (req, res) => app(req, res);