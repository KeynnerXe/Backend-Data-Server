// prisma/seed.js
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);

  // Crear APPROVER
  await prisma.user.upsert({
    where: { email: "approver@example.com" },
    update: {},
    create: {
      email: "approver@example.com",
      password,
      role: "APPROVER",
    },
  });

  // Datos de dashboard ejemplo
  await prisma.dashboardData.createMany({
    data: [
      { title: "KPI - Usuarios activos", value: "42" },
      { title: "KPI - Ingresos", value: "1,234" },
      { title: "KPI - Tasa conversión", value: "2.4%" },
    ],
    skipDuplicates: true,
  });

  console.log("Seed ejecutado.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
