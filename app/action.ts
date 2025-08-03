"use server";

import { signIn, signOut } from "@/auth";

import { cookies } from "next/headers";

const page = process.env.PAGE || "http://localhost:3000";

export async function signInWith(provider: string) {
  await signIn(provider, { redirectTo: page });
  return;
}
