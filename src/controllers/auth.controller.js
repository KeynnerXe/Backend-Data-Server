import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email y password son requeridos" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    // No mandar password de vuelta
    const { password: _p, ...safeUser } = user;
    res.json({ message: "Usuario registrado", user: safeUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Login y emisión de JWT simple
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "email y password son requeridos" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Contraseña incorrecta" });

    // generar JWT (ajusta expiración y secret en .env)
    const payload = { id: user.id, email: user.email, role: user.role || "USER" };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "changeme", { expiresIn: "7d" });

    res.json({ message: "Login exitoso", token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al hacer login" });
  }
};

// Perfil del usuario autenticado (usa middleware que llena req.user)
export const profile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "No autenticado" });

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, createdAt: true, role: true },
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};
