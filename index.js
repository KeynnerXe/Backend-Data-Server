// index.js - Backend con soporte CORS para Qlik Sense Cloud

const express = require("express");
const cors = require("cors");

const app = express();

// ✅ Habilitar CORS para Qlik Cloud
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization"
}));

// ✅ Middleware para parsear JSON
app.use(express.json());

// Ejemplo de endpoint de prueba
app.get("/api/test", (req, res) => {
  res.json({ ok: true, msg: "Backend funcionando con CORS ✅" });
});

// Aquí puedes mantener o añadir tus otros endpoints
// Ejemplo:
// app.post("/api/save", (req, res) => { ... })

// ✅ Puerto por defecto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
