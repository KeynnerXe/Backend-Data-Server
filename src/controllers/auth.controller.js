import bcrypt from "bcrypt";
import { getPrisma } from "../config/prisma.js";

export const register = async (req, res) => {
  const prisma = getPrisma(); // inicializa Prisma en runtime
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

export const profile = (req, res) => {
  if (!req.user) return res.status(401).json({ error: "No autenticado" });
  res.json({ user: req.user });
};
