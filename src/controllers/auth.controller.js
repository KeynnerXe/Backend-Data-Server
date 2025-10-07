import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registro de usuario
export const register = async (req, res) => {
  try {
    const { email, password, role, adminKey } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email y password son requeridos" });
    }

    // Verificar si ya existe el usuario
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Validaciones para el registro de roles
    let safeRole = "USER";
    const allowedRoles = ["USER", "ADMIN", "VIEWER"];
    let roleMessage = "Usuario registrado como USER";
    if (role === "ADMIN") {
      if (adminKey === "admin-2025") {
        safeRole = "ADMIN";
        roleMessage = "Usuario registrado como ADMIN";
      } else {
        safeRole = "USER";
        roleMessage = "Clave de administrador incorrecta, usuario creado como USER";
      }
    } else if (allowedRoles.includes(role)) {
      safeRole = role;
      roleMessage = `Usuario registrado como ${safeRole}`;
    }

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role: safeRole },
    });

    // No mandar password de vuelta
    const { password: _p, ...safeUser } = user;
    res.json({ message: roleMessage, user: safeUser });
  } catch (error) {
    console.error("❌ Error en register:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// Login y emisión de JWT
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "email y password son requeridos" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Forzar el valor del rol a "ADMIN" si corresponde
    let role = user.role;
    if (role && role.toUpperCase() === "ADMIN") {
      role = "ADMIN";
    } else if (role && role.toUpperCase() === "USER") {
      role = "USER";
    } else if (role && role.toUpperCase() === "VIEWER") {
      role = "VIEWER";
    } else {
      role = "USER";
    }
    const payload = { id: user.id, email: user.email, role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "changeme", { expiresIn: "7d" });

    res.json({
      message: "Login exitoso",
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ error: "Error al hacer login" });
  }
};

// Perfil del usuario autenticado
export const profile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "No autenticado" });

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, createdAt: true, role: true },
    });

    res.json({ user });
  } catch (error) {
    console.error("❌ Error en profile:", error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};

export const promoteToAdmin = async (req, res) => {
  try {
    const { adminKey } = req.body;
    if (!req.user) return res.status(401).json({ error: "No autenticado" });
    if (adminKey !== "admin-2025") {
      return res.status(403).json({ error: "Clave de administrador incorrecta" });
    }
    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: { role: "ADMIN" },
      select: { id: true, email: true, role: true }
    });
    res.json({ message: "Usuario ascendido a administrador", user });
  } catch (error) {
    console.error("❌ Error en promoteToAdmin:", error);
    res.status(500).json({ error: "Error al ascender a administrador" });
  }
};

export const getRole = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "No autenticado" });
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { role: true }
    });
    res.json({ role: user?.role || "USER" });
  } catch (error) {
    console.error("❌ Error en getRole:", error);
    res.status(500).json({ error: "Error al consultar el rol" });
  }
};
