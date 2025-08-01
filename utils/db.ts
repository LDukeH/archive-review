// utils/db.ts
import prisma from "@/lib/prisma";

export async function getUserFromDb(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      password: true, // Include to verify, but don't return to client
    },
  });

  if (!user) return null;

  return user;
}
