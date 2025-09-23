// src/controllers/dashboard.controller.js
import { getPrisma } from "../config/prisma.js";

// Obtener datos oficiales del dashboard (lectura pública)
export const getDashboardData = async (req, res) => {
  const prisma = getPrisma(); // inicializa Prisma en runtime
  try {
    const data = await prisma.dashboardData.findMany({
      orderBy: { id: "asc" },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener dashboard" });
  }
};

// Proponer un cambio (puede venir de usuario autenticado o de API key)
export const createChange = async (req, res) => {
  const prisma = getPrisma();
  try {
    const { dashboardId, newValue } = req.body;
    const dashboard = await prisma.dashboardData.findUnique({
      where: { id: Number(dashboardId) },
    });
    if (!dashboard) return res.status(404).json({ error: "Dashboard item no encontrado" });

    const data = {
      dashboardId: Number(dashboardId),
      newValue: String(newValue),
      createdBy: req.user?.id ?? undefined,
    };

    const change = await prisma.dashboardChange.create({ data });
    res.json({ message: "Cambio propuesto", change });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al proponer cambio" });
  }
};

// Obtener cambios pendientes (solo APPROVER)
export const getPendingChanges = async (req, res) => {
  const prisma = getPrisma();
  try {
    const changes = await prisma.dashboardChange.findMany({
      where: { status: "pending" },
      include: { dashboard: true, user: true },
      orderBy: { createdAt: "asc" },
    });
    res.json(changes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar cambios pendientes" });
  }
};

// Aprobar cambio (solo APPROVER)
export const approveChange = async (req, res) => {
  const prisma = getPrisma();
  try {
    const id = Number(req.params.id);
    const change = await prisma.dashboardChange.update({
      where: { id },
      data: { status: "approved", reviewedBy: req.user.id },
    });

    await prisma.dashboardData.update({
      where: { id: change.dashboardId },
      data: { value: change.newValue },
    });

    res.json({ message: "Cambio aprobado y aplicado", change });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al aprobar cambio" });
  }
};

// Rechazar cambio (solo APPROVER)
export const rejectChange = async (req, res) => {
  const prisma = getPrisma();
  try {
    const id = Number(req.params.id);
    const change = await prisma.dashboardChange.update({
      where: { id },
      data: { status: "rejected", reviewedBy: req.user.id },
    });
    res.json({ message: "Cambio rechazado", change });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al rechazar cambio" });
  }
};
