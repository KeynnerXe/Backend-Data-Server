// src/routes/dashboard.routes.js
const express = require("express");
const router = express.Router();
const dctrl = require("../controllers/dashboard.controller");
const { isAuthenticated, hasRole } = require("../middlewares/auth");
const requireApiKey = require("../middlewares/apikey");

// Lectura pública del dashboard
router.get("/", dctrl.getDashboardData);

// Proponer cambio: acepta sesión OR x-api-key (permite la extensión de Qlik)
// middleware allow: si viene API key -> pasa; si no -> requiere autenticación
function allowApiKeyOrAuth(req, res, next) {
  const key = req.headers["x-api-key"] || req.query.api_key;
  if (process.env.WRITEBACK_API_KEY && key === process.env.WRITEBACK_API_KEY) return next();
  return isAuthenticated(req, res, next);
}

router.post("/change", allowApiKeyOrAuth, dctrl.createChange);

// Obtener cambios pendientes (solo APPROVER)
router.get("/changes/pending", isAuthenticated, hasRole("APPROVER"), dctrl.getPendingChanges);

// Aprobar / Rechazar (solo APPROVER)
router.post("/approve/:id", isAuthenticated, hasRole("APPROVER"), dctrl.approveChange);
router.post("/reject/:id", isAuthenticated, hasRole("APPROVER"), dctrl.rejectChange);

module.exports = router;
