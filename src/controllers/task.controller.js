const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createTask = async (req, res) => {
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

exports.getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.user?.id } });
  res.json(tasks);
};
