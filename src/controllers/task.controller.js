import { getPrisma } from "../config/prisma.js";

export const createTask = async (req, res) => {
  const prisma = getPrisma(); // inicializa Prisma en runtime
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

export const getTasks = async (req, res) => {
  const prisma = getPrisma();
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user?.id },
    });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
