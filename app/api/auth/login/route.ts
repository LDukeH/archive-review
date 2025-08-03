import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword } from "@/utils/password";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser || !existingUser.password) {
    return NextResponse.json({ error: "User not found." }, { status: 400 });
  }

  const isValidated = await verifyPassword(password, existingUser.password);

  if (!isValidated) {
    return NextResponse.json({ error: "Invalid password." }, { status: 400 });
  }

  const token = jwt.sign(
    { id: existingUser.id, email: existingUser.email, name: existingUser.name },
    JWT_SECRET!,
    {
      expiresIn: "7d", // Token expiration time
    }
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  return res;
}
