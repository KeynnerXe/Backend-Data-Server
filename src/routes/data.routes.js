const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const datos = req.body;
  // Aquí puedes procesar o guardar los datos como necesites
  res.json({ mensaje: "Datos recibidos correctamente", datos });
});

module.exports = router;
