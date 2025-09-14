import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInService } from "@/services/auth-services/signInService";
import { User } from "./app/types/type";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        identifier: {},
        password: {},
      },
     authorize: async (credentials) => {
        try {
          const user = await signInService(credentials as User);
          if (!user) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && token.user) {
        session.user = token.user;
      }
      console.log("Token : ", token);
      console.log("Session token : ", session);
      return session;
    },
  },
});
