import prisma from "@/lib/prisma";
// import { CartItem } from "@prisma/client";

export async function getCart(userId: number) {
  return await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });
}

export async function addToCart(
  userId: number,
  productId: number,
  quantity: number
) {
  const existingItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (existingItem) {
    return await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    return await prisma.cartItem.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
  }
}

export async function removeFromCart(userId: number, productId: number) {
  return await prisma.cartItem.deleteMany({
    where: { userId, productId },
  });
}

export async function clearCart(userId: number) {
  return await prisma.cartItem.deleteMany({
    where: { userId },
  });
}
