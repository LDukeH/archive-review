import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET!);
    return NextResponse.json(decoded, { status: 200 });
  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
