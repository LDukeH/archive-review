// app/api/logout/route.ts
import { NextResponse } from "next/server";

import { cookies } from "next/headers";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });

  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    secure: true,
  });

  return res;
}
