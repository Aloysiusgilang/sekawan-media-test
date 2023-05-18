import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "../../../lib/prisma";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (user && credentials.password === user.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/auth/signIn", // Replace with your custom sign-in page path
  },
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.userId = user.id; // Add the user ID to the token
      }
      return token;
    },
    async session(session, token) {
      session.user.id = token.userId; // Add the user ID to the session
      return session;
    },
  },
});
