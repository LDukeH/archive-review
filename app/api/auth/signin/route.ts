import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { saltAndHashPassword } from "@/utils/password";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: "User already exists with this email." },
      { status: 400 }
    );
  }

  const hashedPassword = await saltAndHashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  if (newUser) {
    return NextResponse.json(
      {
        message: "User signed in successfully",
        user: { id: newUser.id, email: newUser.email, name: newUser.name },
      },
      { status: 200 }
    );
  }
  return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
}
