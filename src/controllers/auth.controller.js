const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.profile = (req, res) => {
  if (!req.user) return res.status(401).json({ error: "No autenticado" });
  res.json({ user: req.user });
};
