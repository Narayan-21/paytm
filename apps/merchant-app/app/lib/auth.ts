import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import db from "@repo/db/client";

export const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        console.log("hi signin")
        if (!user || !user.email) {
          return false;
        }
        try {
            await db.merchant.upsert({
              select: {
                id: true
              },
              where: {
                email: user.email
              },
              create: {
                email: user.email,
                name: user.name,
                auth_type: account?.provider === "google" ? "Google" : "Github" // Use a prisma type here
              },
              update: {
                name: user.name,
                auth_type: account?.provider === "google" ? "Google" : "Github" // Use a prisma type here
              }
            });
            return true;
        } catch(err) {
          return false;
        }
      }
    },
    secret: process.env.NEXTAUTH_SECRET || "secret"
  }