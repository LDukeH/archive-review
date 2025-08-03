"use server";

import { signIn, signOut } from "@/auth";

import { cookies } from "next/headers";

const page = process.env.PAGE || "http://localhost:3000";

export async function signInWith(provider: string) {
  await signIn(provider, { redirectTo: page });
  return;
}

export async function logOutToken() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    path: "/",
    maxAge: 0, // This deletes the cookie
  });
}
