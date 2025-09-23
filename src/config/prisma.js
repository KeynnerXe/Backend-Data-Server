import { PrismaClient } from "@prisma/client";

let prisma; // instancia global para reutilizar en desarrollo/serverless

export function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}
