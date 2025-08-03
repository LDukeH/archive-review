"use server";

import { signIn, signOut } from "@/auth";

import { cookies } from "next/headers";

import { auth } from "@/auth";

export async function signInWith(provider: string) {
  await signIn(provider, { redirectTo: "http://localhost:3000" });
  return;
}

export async function logOutToken() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  return;
}
