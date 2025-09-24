import jwt from "jsonwebtoken";

export const ensureAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1] ?? authHeader; // aceptar "Bearer <token>" o token solo
  if (!token) return res.status(401).json({ error: "Token inválido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "changeme");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token no válido o expirado" });
  }
};
