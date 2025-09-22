const { execSync } = require("child_process");

try {
  // Generar Prisma Client al vuelo
  execSync("npx prisma generate", { stdio: "inherit" });
  console.log("✅ Prisma Client generado al vuelo");
} catch (e) {
  console.warn("⚠️ No se pudo ejecutar prisma generate al vuelo:", e.message);
}

const { PrismaClient } = require("@prisma/client");

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

module.exports = prisma;
