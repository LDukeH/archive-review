import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.ReviewCreateInput[] = [];

export async function main() {
  await prisma.user.update({
    where: { id: "cmdsv1hbu0000fqkklcl0n7i8" },
    data: {
      favoriteReviews: {
        connect: { id: "cmdei1m66000fjs0wngbtc7k8" },
      },
    },
  });
}

main();
