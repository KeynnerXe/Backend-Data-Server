function isAuthenticated(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ message: "No autenticado" });
}

function hasRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "No autenticado" });
    if (roles.includes(req.user.role) || req.user.role === "ADMIN") return next();
    return res.status(403).json({ message: "No autorizado" });
  };
}

module.exports = { isAuthenticated, hasRole };
