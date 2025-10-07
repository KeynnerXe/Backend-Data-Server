/*
  Warnings:

  - You are about to drop the `DashboardChange` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DashboardData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DashboardChange" DROP CONSTRAINT "DashboardChange_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "DashboardChange" DROP CONSTRAINT "DashboardChange_dashboardId_fkey";

-- DropForeignKey
ALTER TABLE "DashboardChange" DROP CONSTRAINT "DashboardChange_reviewedBy_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" DROP NOT NULL;

-- DropTable
DROP TABLE "DashboardChange";

-- DropTable
DROP TABLE "DashboardData";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "ventas" (
    "id" SERIAL NOT NULL,
    "producto" VARCHAR(50),
    "cantidad" INTEGER,
    "precio" DECIMAL,
    "fecha" DATE,

    CONSTRAINT "ventas_pkey" PRIMARY KEY ("id")
);
