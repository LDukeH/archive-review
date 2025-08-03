import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.ReviewCreateInput[] = [];

export async function main() {
  await prisma.session.deleteMany({
    where: {
      userId: "cmdvhi5f50000gpkqmrd51k0a",
    },
  });
}

main();
