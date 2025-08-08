import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  session: {
    maxAge: 1 * 24 * 60 * 60, // 30 days
    updateAge: 12 * 60 * 60, // 12 hours
    strategy: "database",
  },
});
