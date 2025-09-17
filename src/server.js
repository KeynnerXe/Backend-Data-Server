const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const dashboardRoutes = require("./routes/dashboard.routes");
const configurePassport = require("./config/passport");


// Importar rutas
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const dataRoutes = require("./routes/data.routes");

// 👇 Corrección aquí
const prisma = require("./config/prisma");

const app = express();

//app.use(cors());
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());
app.use(
  session({
    secret: "mi_secreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
configurePassport(passport);

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "../public")));

// Rutas
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/api/data", dataRoutes);
app.use("/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando. Usa /auth, /tasks o /api/data para probar la API.");
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});

module.exports = app;
module.exports.handler = (req, res) => app(req, res);
