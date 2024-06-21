import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithhubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import { getUserByEmail } from "./data/users"
import User from "./models/User"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(
        credentials: Partial<Record<string, unknown>>,
        request: Request
      ) {
        if (credentials === null) return null
        try {
          const user = await User.findOne({ email: credentials?.email })

          if (!user) {
            throw new Error("invalid credentials")
          }

          const isMatchPassword = await bcrypt.compare(
            credentials?.password as string,
            user.password
          )
          if (!isMatchPassword) {
            throw new Error("invalid credentials")
          }

          return user
        } catch (error) {
          throw new Error("User not found")
        }
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GithhubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
})
