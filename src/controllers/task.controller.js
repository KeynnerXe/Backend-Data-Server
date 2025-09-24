import prisma from "../config/prisma.js";

// Crear tarea
export const createTask = async (req, res) => {
  const { title } = req.body;

  try {
    const task = await prisma.task.create({
      data: { title, userId: req.user?.id || null },
    });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener tareas (todas las del usuario autenticado)
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user?.id || null },
      orderBy: { createdAt: "desc" },
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};
