// src/config/prisma.js
import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";

let prisma;

export function getPrisma() {
  if (!prisma) {
    try {
      // Forzar generación de Prisma en Vercel serverless
      execSync("npx prisma generate", { stdio: "inherit" });
    } catch (e) {
      console.error("Error generando Prisma:", e);
    }
    prisma = new PrismaClient();
    console.log("PrismaClient inicializado ✅");
  }
  return prisma;
}
