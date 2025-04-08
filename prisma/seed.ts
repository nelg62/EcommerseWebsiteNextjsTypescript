import { PrismaClient } from "@prisma/client";
import products from "./products";

const prisma = new PrismaClient();

async function main() {
  for (const product of products) {
    await prisma.product.createMany({
      data: [
        {
          title: product.title,
          price: product.price,
          rating: product.rating,
          description: product.description,
          category: product.category,
          brand: product.brand,
          availabilityStatus: product.availabilityStatus,
          thumbnail: product.thumbnail,
        },
      ],
    });
  }

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
