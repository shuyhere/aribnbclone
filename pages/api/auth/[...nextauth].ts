import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

import prisma from "@/app/libs/prismadb"


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // network errors：https://github.com/nextauthjs/next-auth/issues/3920
    GithubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string,
        httpOptions: {timeout: 40000},
      }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT__ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        httpOptions: {timeout: 40000}
      }),
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: "email", type: "text" },
          password: { label: "password", type: "password" }
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Wrong user or password');
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });
          if (!user || !user?.hashedPassword) {
            throw new Error('Invalid credentials');
          }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }
        return user;
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}


export default NextAuth(authOptions);

