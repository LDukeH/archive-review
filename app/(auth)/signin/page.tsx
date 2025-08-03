"use server";

import { signIn } from "@/auth";

import SignIn from "@/app/ui/login/Signin";

export default async function SignInPage() {
  return (
    <div>
      <SignIn />
    </div>
  );
}
