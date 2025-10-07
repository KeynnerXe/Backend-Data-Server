import prisma from "../config/prisma.js";

export const getProviders = async (req, res) => {
  try {
    const proveedores = await prisma.proveedor.findMany();
    res.json({ proveedores });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener proveedores", details: error.message });
  }
};
