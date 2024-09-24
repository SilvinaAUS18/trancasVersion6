import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "../models/User";
import { connectDB } from "../lib/db";
import { signJwtToken } from "../lib/jwt";
import NextAuth from "next-auth";



export  const authOptions = {
    providers: [
      CredentialsProvider({
        type: "credentials",
        credentials: {},
        async authorize(credentials) {
          await connectDB();
  
          const { email, password } = credentials;
  
          try {
            const user = await User.findOne({ email });
  
            if (!user) {
              throw new Error("Invalid input");
            }
  
            const passwordMatch = await bcrypt.compare(password, user.password);
  
            if (!passwordMatch) {
              throw new Error("Passwords do not match");
            } else {
              const { password, ...currentUser } = user._doc;
              const accessToken = signJwtToken(currentUser, { expiresIn: "7d" });
  
              return {
                ...currentUser,
                accessToken,
              };
            }
          } catch (error) {
            console.log(error);
          }
        },
      }),
    ],
    pages: {
      signIn: "/login",
    },
    secret:"sitemas715a2225u-s",
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.accessToken = user.accessToken;
          token._id = user._id;
        }
  
        return token;
      },
  
      async session({ session, token }) {
        if (token) {
          session.user._id = token._id;
          session.user.accessToken = token.accessToken;
        }
  
        return session;
      },
    },
  };
  