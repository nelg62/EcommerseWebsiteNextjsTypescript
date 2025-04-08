import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        title: "Test Product 1",
        price: 19.99,
        description: "This is a test product",
      },
      {
        title: "Test Product 2",
        price: 29.99,
        description: "Another test product",
      },
    ],
  });

  console.log("✅ Seeded basic products!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
