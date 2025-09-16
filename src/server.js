const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const configurePassport = require("./config/passport");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const dataRoutes = require("./routes/data.routes");

const app = express();

app.use(cors());
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

// Rutas
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/api/data", dataRoutes);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando. Usa /auth, /tasks o /api/data para probar la API.");
});

module.exports = app;
module.exports.handler = (req, res) => app(req, res);
