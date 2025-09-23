import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

// Registro de usuario
export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    res.json({ message: "Usuario registrado", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Login (opcional si no usas passport directamente)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al hacer login" });
  }
};
