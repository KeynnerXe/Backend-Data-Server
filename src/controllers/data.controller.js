// src/controllers/data.controller.js
import { getPrisma } from "../config/prisma.js";

export const receiveData = async (req, res) => {
  const prisma = getPrisma(); // inicializa Prisma en runtime
  const data = req.body;

  try {
    // Ejemplo: guardar los datos en una tabla "dataReceived"
    // await prisma.dataReceived.create({ data });

    res.json({ mensaje: "Datos recibidos correctamente", recibido: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar los datos" });
  }
};
