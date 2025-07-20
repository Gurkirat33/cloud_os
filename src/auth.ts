import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";

export const config = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email", label: "Email" },
        password: { type: "password", label: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
        });

        if (!user) return null;

        const isPasswordValid = compareSync(
          password as string,
          user.password as string
        );

        if (!isPasswordValid) return null;

        if (isPasswordValid) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            pin: user.pin || null,
          };
        }

        return user;
      },
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token, trigger }: any) {
      session.user.id = token.sub;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.pin = token.pin;

      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.pin = user.pin || null;
      }

      if (trigger === "update" && session?.pin !== undefined) {
        token.pin = session.pin;
      }

      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
