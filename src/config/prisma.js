// src/config/prisma.js
import { PrismaClient } from "@prisma/client";

// Instancia global para desarrollo/serverless
let prisma;

export function getPrisma() {
  if (!prisma) {
    // ✅ Inicializa Prisma en runtime
    prisma = new PrismaClient();

    // Opcional: log para saber que Prisma se inicializó
    console.log("PrismaClient inicializado ✅");
  }
  return prisma;
}
  